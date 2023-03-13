$(document).ready(function() {
	// Define a URL do arquivo CSV https://drive.google.com/file/d/1pqHt4-sgd52ijrAcSqx-zu_oz2nhkDXT/view?usp=sharing
	var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJoRCDiKcFFH1KKy9aF99ohL-3KsYU8w6-rZzvKj1hHHnF6u8W6M9TNvQ2jovL-7fEa6rgmz6O8O6w/pub?output=csv";

	// Carrega o arquivo CSV com o AJAX
	$.get(url, function(data) {
		// Converte o arquivo CSV em um objeto JSON
		var jsonData = $.csv.toObjects(data);

		// Obtém os cabeçalhos das colunas
		var headers = Object.keys(jsonData[0]);

		// Adiciona os cabeçalhos das colunas na tabela
		var tableHead = $('#table-head');
		var headRow = $('<tr></tr>');
		for (var i = 0; i < headers.length; i++) {
			headRow.append($('<th>' + headers[i] + '</th>'));
		}
		tableHead.append(headRow);

		// Adiciona os dados na tabela
		var tableBody = $('#table-body');
		for (var i = 0; i < jsonData.length; i++) {
			var bodyRow = $('<tr></tr>');
			for (var j = 0; j < headers.length; j++) {
				bodyRow.append($('<td>' + jsonData[i][headers[j]] + '</td>'));
			}
			tableBody.append(bodyRow);
		}

		// Inicializa a tabela com a biblioteca DataTables
		var table = $('#table').DataTable({
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
						select.append($('<option value="' + d + '">' + d + '</option>'));
					});
				});
			}
		});
	});
});
