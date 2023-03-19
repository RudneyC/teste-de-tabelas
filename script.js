$(document).ready(function() {
  $.ajax({
    url: "https://raw.githubusercontent.com/RudneyC/teste-de-tabelas/main/dados.csv",
    dataType: "text",
    success: function(data) {
      var headers = [];
      var rows = [];

      var allRows = data.split(/\r?\n|\r/);
      headers = allRows[0].split(",");

      for (var i = 1; i < allRows.length; i++) {
        var dataRow = allRows[i].split(",");
        if (dataRow.length == headers.length) {
          rows.push(dataRow);
        }
      }

      var table = $('#tabela').DataTable({
        data: rows,
        columns: headers,
        initComplete: function() {
          var columnFilters = $("#tabela tfoot th").map(function() {
            return this.innerHTML;
          }).get();
          this.api().columns().every(function(index) {
            var column = this;
            if (index < columnFilters.length) {
              var filterType = columnFilters[index];
              var select = $('<select><option value="">'+filterType+'</option></select>')
                .appendTo($(column.footer()).empty())
                .on('change', function() {
                  var val = $.fn.dataTable.util.escapeRegex($(this).val());
                  column.search(val ? '^'+val+'$' : '', true, false).draw();
                });
              column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
              });
            }
          });
        }
      });
    },
    error: function(xhr, error) {
      console.log(xhr);
      console.log(error);
    }
  });
});
