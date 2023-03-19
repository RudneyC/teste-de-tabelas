$(document).ready(function() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/RudneyC/teste-de-tabelas/main/dados.csv',
        dataType: 'text',
    }).done(successFunction);
});

function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);
    var tableHead = '<tr>';
    var tableBody = '';
    for (var i = 0; i < allRows.length; i++) {
        var rowCells = allRows[i].split(',');
        if (i === 0) {
            for (var j = 0; j < rowCells.length; j++) {
                tableHead += '<th>' + rowCells[j] + '</th>';
            }
            tableHead += '</tr>';
        } else {
            tableBody += '<tr>';
            for (var k = 0; k < rowCells.length; k++) {
                tableBody += '<td>' + rowCells[k] + '</td>';
            }
            tableBody += '</tr>';
        }
    }
    $('#table-head').html(tableHead);
    $('#table-body').html(tableBody);
    $('#myTable').DataTable();
}
