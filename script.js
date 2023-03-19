<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tabela Dinâmica</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css">
  </head>
  <body>
    <table id="tabela" class="display"></table>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
    <script>
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
              })
            });
          }
        });
      });
    </script>
  </body>
</html>
