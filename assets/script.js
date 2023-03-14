$(document).ready(function() {

  // Define o nome do arquivo CSV
  var url = "https://raw.githubusercontent.com/RudneyC/teste-de-tabelas/main/data/dados.csv";
  
  // Faz a leitura do arquivo CSV
  $.get(url, function (data) {

    // Divide o conteúdo do arquivo CSV em linhas
    var lines = data.split("\n");

    // Extrai os cabeçalhos da tabela
    var tableHead = "<tr>";
    var headers = lines[0].split(",");
    for (var i = 0; i < headers.length; i++) {
      tableHead += "<th>" + headers[i] + "</th>";
    }
    tableHead += "</tr>";
    $("#table-head").append(tableHead);

    // Extrai os dados da tabela
    for (var i = 1; i < lines.length; i++) {
      var tableRow = "<tr>";
      var cells = lines[i].split(",");
      for (var j = 0; j < cells.length; j++) {
        tableRow += "<td>" + cells[j] + "</td>";
      }
      tableRow += "</tr>";
      $("#table-body").append(tableRow);
    }

    // Aplica a funcionalidade DataTables à tabela
    $('#myTable').DataTable();

  });
});
