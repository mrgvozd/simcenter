document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector("#schedule-table tbody");
    const filterGroup = document.getElementById('filter-group');

    let myData = []; // Для хранения исходных данных

	// Чтение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const groupFilterValue = urlParams.get('group') || '';

    // Установка значений фильтров
    filterGroup.value = groupFilterValue;
	

    // Загрузка данных из JSON
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            myData = jsonData;
            renderTable(myData);
            mergeCells(); // Объединение ячеек
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
	
    // Функция для отрисовки таблицы
    function renderTable(myData) {
        tableBody.innerHTML = ""; // Очистка таблицы

        myData.forEach(item => {
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
		const table = document.querySelector('table');
		const rows = Array.from(table.rows);
		
		// Создаем виртуальное представление таблицы
		const tableData = rows.map(row => {
			return Array.from(row.cells).map(cell => ({
				text: cell.textContent.trim(),
				element: cell,
				rowspan: 1
			}));
		});
		
		const cols = tableData[0].length;
		
		// Проходим по каждому столбцу слева направо
		for (let col = 0; col < cols; col++) {
			// Проходим по строкам снизу вверх
			for (let row = rows.length - 1; row > 0; row--) {
				// Пропускаем если строки разной длины
				if (tableData[row].length <= col || tableData[row-1].length <= col) continue;
				
				// Проверяем, что все предыдущие столбцы совпадают
				let previousColumnsMatch = true;
				for (let prevCol = 0; prevCol < col; prevCol++) {
					if (tableData[row][prevCol] && tableData[row-1][prevCol]) {
						if (tableData[row][prevCol].text !== tableData[row-1][prevCol].text) {
							previousColumnsMatch = false;
							break;
						}
					}
				}
				
				// Если предыдущие столбцы совпадают и текущие значения равны
				if (previousColumnsMatch && 
					tableData[row][col] && 
					tableData[row-1][col] &&
					tableData[row][col].text === tableData[row-1][col].text) {
					
					// Увеличиваем rowspan у ячейки выше
					tableData[row-1][col].rowspan += tableData[row][col].rowspan;
					
					// Помечаем текущую ячейку для удаления
					tableData[row][col].shouldRemove = true;
				}
			}
		}
		
		// Применяем изменения к DOM
		for (let row = 0; row < tableData.length; row++) {
			for (let col = 0; col < tableData[row].length; col++) {
				const cellData = tableData[row][col];
				
				if (cellData.shouldRemove) {
					// Удаляем ячейку из DOM
					cellData.element.parentNode.removeChild(cellData.element);
				} else if (cellData.rowspan > 1) {
					// Устанавливаем rowspan
					cellData.element.setAttribute('rowspan', cellData.rowspan);
				}
			}
		}
	}
	
	
    // Функция для фильтрации данных
    function applyFilters() {
        const groupFilter = filterGroup.value.toLowerCase();

        const filteredData = myData.filter(item => {
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



