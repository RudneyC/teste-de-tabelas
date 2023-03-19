$(document).ready(function() {
  $('#tabela').DataTable({
    "ajax": {
      "url": "https://raw.githubusercontent.com/RudneyC/teste-de-tabelas/main/dados.csv",
      "dataType": "csv",
      "success": function(data) {
        var parsedData = Papa.parse(data, {header: true}).data;
        var table = $('#tabela').DataTable();
        table.clear();
        table.rows.add(parsedData);
        table.draw();
      }
    }
  });
});
