document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector("#schedule-table tbody");
    const filterGroup = document.getElementById('filter-group');
    const filterTeacher = document.getElementById('filter-teacher');

    let data = []; // Для хранения исходных данных

	// Чтение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const groupFilterValue = urlParams.get('group') || '';
    const teacherFilterValue = urlParams.get('teacher') || '';

    // Установка значений фильтров
    filterGroup.value = groupFilterValue;
    filterTeacher.value = teacherFilterValue;
	

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
				<td>${item['ППС']}</td>
				<td>${item['каб']}</td>
				<td>${item['№ гр.']}</td>
				<td>${item['Тема']}</td>
				<td>${formatMultilineText(item['Дополнительные занятия'])}</td>
            `;
            tableBody.appendChild(row);
        });
    }

	function formatMultilineText(text) {
		if (text.length>1) text = '• '+text.trimEnd();
		return String(text || '').replace(/\n/g, '<br>• ');
	}

	function mergeCells() {
        const rows = tableBody.querySelectorAll("tr");
		// Объединение ячеек в первом столбце (день)
		mergeColumn(rows, 0);
		// Объединение ячеек во втором столбце (время)
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
				firstrow = size==7?true:false;
				swap = firstrow?true:swap;
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
        const teacherFilter = filterTeacher.value.toLowerCase();

        const filteredData = data.filter(item => {
			// Преобразуем значения в строки, если они не являются строками
			const group = String(item['№ гр.'] || '').toLowerCase();
			const teacher = String(item['ППС'] || '').toLowerCase();

			return (
				group.includes(groupFilter) &&
				teacher.includes(teacherFilter)
			);
		});

        renderTable(filteredData);
		if (groupFilter === '' && teacherFilter === '') mergeCells()
    }

	function updateURL() {
		const params = new URLSearchParams();
		if (filterGroup.value) params.set('group', filterGroup.value);
		if (filterTeacher.value) params.set('teacher', filterTeacher.value);

		// Обновление URL без перезагрузки страницы
		history.replaceState(null, '', `?${params.toString()}`);
	}

	// Слушатели событий для фильтров
	filterGroup.addEventListener('input', () => {
		applyFilters();
		updateURL();
	});
	filterTeacher.addEventListener('input', () => {
		applyFilters();
		updateURL();
	});
});
