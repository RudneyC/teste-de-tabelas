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
          colunas = valores.map(function(coluna) {
            return { title: coluna, data: coluna };
          });
        } else {
          var linha = {};
          for (var j = 0; j < valores.length; j++) {
            linha[colunas[j].data] = valores[j];
          }
          dados.push(linha);
        }
      }

      var tabela = $('#tabela').DataTable({
        data: dados,
        columns: colunas,
        paging: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        initComplete: function () {
          this.api().columns().every(function () {
            var column = this;
            var select = $('<select><option value=""></option></select>')
              .appendTo($(column.header()).empty())
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
    }
  });
});
