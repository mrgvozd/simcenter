document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector("#schedule-table tbody");
    const filterGroup = document.getElementById('filter-group');

    let data = []; // Для хранения исходных данных

	// Чтение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const groupFilterValue = urlParams.get('group') || '';

    // Установка значений фильтров
    filterGroup.value = groupFilterValue;
	

    // Загрузка данных из JSON
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            renderTable(data);
            mergeCells(); // Объединение ячеек
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
	
    // Функция для отрисовки таблицы
    function renderTable(data) {
        tableBody.innerHTML = ""; // Очистка таблицы

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
				<td>${item['datentime']}</td> 
				<td>${item['Время']}</td>
				<td>${item['каб']}</td>
				<td>${item['№ гр.']}</td>
				<td>${item['Тема']}</td>
            `;
            tableBody.appendChild(row);
        });
    }

	function mergeCells() {
        const rows = tableBody.querySelectorAll("tr");
		    // Объединение ячеек в первом столбце (Время)
		mergeColumn(rows, 0);

		// Объединение ячеек во втором столбце (Название группы)
		mergeColumn(rows, 1);
	}
	
	function mergeColumn(rows, col) {
        let previousValue = null;
        let startRow = null;
		let firstrow = false;
		let swap = false;
		
		rows.forEach((row, index) => {
			if (col){
				let size = row.querySelectorAll("td").length;
				firstrow = size==5?true:false;
			}
			
			const currentCell = row.querySelectorAll("td")[firstrow?1:0];
			const currentValue = currentCell.textContent
			
			if (currentValue === previousValue) {
				currentCell.remove();
				startRow.querySelectorAll("td")[swap?1:0].rowSpan += 1;
			} else {
				previousValue = currentValue;
				startRow = row;
				if (col) swap = !swap;
			}
		});
    }

	
    // Функция для фильтрации данных
    function applyFilters() {
        const groupFilter = filterGroup.value.toLowerCase();

        const filteredData = data.filter(item => {
			// Преобразуем значения в строки, если они не являются строками
			const group = String(item['№ гр.'] || '').toLowerCase();

			return (
				group.includes(groupFilter)
			);
		});

        renderTable(filteredData);
		if (groupFilter === '') mergeCells()
    }

	function updateURL() {
		const params = new URLSearchParams();
		if (filterGroup.value) params.set('group', filterGroup.value);

		// Обновление URL без перезагрузки страницы
		history.replaceState(null, '', `?${params.toString()}`);
	}

	// Слушатели событий для фильтров
	filterGroup.addEventListener('input', () => {
		applyFilters();
		updateURL();
	});
});