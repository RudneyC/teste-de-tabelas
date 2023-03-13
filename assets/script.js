$(document).ready(function() {
  // Define a URL do arquivo CSV
  var url = "https://drive.google.com/file/d/1pqHt4-sgd52ijrAcSqx-zu_oz2nhkDXT/view?usp=share_link";

  // Carrega o arquivo CSV com o AJAX
  $.get(url, function(data) {
    // Converte o arquivo CSV em um objeto JSON
    var jsonData = $.csv.toObjects(data);
    // Extrai as chaves dos dados
    var keys = Object.keys(jsonData[0]);

    // Adiciona os cabeçalhos da tabela
    var tableHead = "<tr>";
    for (var i = 0; i < keys.length; i++) {
      tableHead += "<th>" + keys[i] + "</th>";
    }
    tableHead += "</tr>";
    $("#table-head").append(tableHead);

    // Adiciona os dados na tabela
    var tableBody = "";
    for (var i = 0; i < jsonData.length; i++) {
      tableBody += "<tr>";
      for (var j = 0; j < keys.length; j++) {
        tableBody += "<td>" + jsonData[i][keys[j]] + "</td>";
      }
      tableBody += "</tr>";
    }
    $("#table-body").append(tableBody);

    // Cria a tabela com DataTables
    $('#myTable').DataTable({
      order: [[0, 'asc']],
      initComplete: function () {
        // Adiciona filtros dinâmicos
        this.api().columns().every(function () {
          var column = this;
          var select = $('<select><option value=""></option></select>')
            .appendTo($(column.header()))
            .on('change', function () {
              var val = $.fn.dataTable.util.escapeRegex(
                $(this).val()
              );

              column
                .search(val ? '^' + val + '$' : '', true, false)
                .draw();
            });

          column.data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>')
          });
        });
      }
    });
  });
});
