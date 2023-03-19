$(document).ready(function() {
  $.ajax({
    url: "https://raw.githubusercontent.com/RudneyC/teste-de-tabelas/main/dados.csv",
    dataType: "text",
    success: function(data) {
      var colunas = [];
      var dados = [];

      var linhas = data.split("\n");
      for (var i = 0; i < linhas.length; i++) {
        var valores = linhas[i].split(",");
        if (i === 0) {
          colunas = valores;
        } else {
          var linha = {};
          for (var j = 0; j < valores.length; j++) {
            linha[colunas[j]] = valores[j];
          }
          dados.push(linha);
        }
      }

      $('#tabela').DataTable({
        data: dados,
        columns: Object.keys(dados[0]).map(function(coluna) {
          return { title: coluna, data: coluna };
        }),
        paging: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
      });
    }
  });
});
