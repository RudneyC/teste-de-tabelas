$(document).ready(function() {
  $('#tabela').DataTable( {
      "ajax": {
          "url": "https://raw.githubusercontent.com/RudneyC/teste-de-tabelas/main/dados.csv",
          "dataSrc": ""
      },
      "columns": [
          { "data": "Nome" },
          { "data": "Sobrenome" },
          { "data": "Idade" },
          { "data": "Cidade" }
      ]
  } );
});
