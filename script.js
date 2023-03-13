$(document).ready(function() {
    // Define a URL do arquivo CSV
    var url = "https://drive.google.com/uc?export=download&id=1VSTWJ_yrZLJcqNmt11bJPRTPNjOgBZCp";

    // Carrega o arquivo CSV com o AJAX
    $.get(url, function(data) {
        // Converte o arquivo CSV em um objeto JSON
        var jsonData = $.csv.toObjects(data);

        // Cria o cabeçalho da tabela com base nos nomes das colunas do JSON
        var tableHead = '<tr>';
        $.each(jsonData[0], function(key, value) {
            tableHead += '<th>' + key + '</th>';
        });
        tableHead += '</tr>';
        $('#table-head').append(tableHead);

        // Cria o corpo da tabela com base nos dados do JSON
        var tableBody = '';
        $.each(jsonData, function(index, value) {
            tableBody += '<tr>';
            $.each(value, function(key, value) {
                tableBody += '<td>' + value + '</td>';
            });
            tableBody += '</tr>';
        });
        $('#table-body').append(tableBody);

        // Inicializa o plugin DataTables
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
                        select.append('<option value="' + d + '">' +
