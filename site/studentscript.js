document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector("#schedule-table tbody");
    const filterGroup = document.getElementById('filter-group');

	// Данные для модальных окон
	const modalContent = {
		info: `
			<h3>О расписании</h3>
			<p>Это расписание занятий для учебных групп. Здесь вы можете:</p>
			<ul>
				<li>Просматривать расписание на всю неделю</li>
				<li>Фильтровать занятия по группам, преподавателям* и аудиториям*</li>
				<li>Находить конкретную аудиторию на общем плане</li>
			</ul>
			<p><strong>Обозначения:</strong></p>
			<p>• Объединённые ячейки указывают на параллельные занятия</p>
			<p>• Толстые линии разделяют разные временные блоки</p>
		`,
		help: /*
			<h3>Темы занятий</h3>
			<p><strong>1 Курс</strong></p>
			<ul>
			
				<li><b>Занятие 1:</b> <i>Базовая СЛР, ПП при отсутствии сознания, проходимость ВДП</i></li>
				<li><b>Занятие 2:</b> <i>Первая Помощь при кровотечениях</i></li>
				<li><b>Занятие 3:</b> <i>ПП при травмах, ожогах, отморожениях</i></li>
				<li><b>Занятие 4:</b> <i>Извлечение и транспортировка пострадавших</i></li>
				<li><b>Занятие 5:</b> <i>Зачет</i></li>
			</ul>
			<p><strong>3 Курс</strong></p>
			<ul>
			
				<li><b>Занятие 1:</b> <i>Сердечно-легочная реанимация (СЛР) в стационаре – (BLS / AED)</i></li>
				<li><b>Занятие 2:</b> <i>Контроль и коррекция внешнего дыхания</i></li>
				<li><b>Занятие 3:</b> <i>Коммуникативные навыки</i></li>
				<li><b>Занятие 4:</b> <i>Базовые методы оценки состояния пациента</i></li>
				<li><b>Занятие 5:</b> <i>Обследование пациента на амбулаторном этапе (XR-clinic)</i></li>
				<li><b>Занятие 6:</b> <i>Итоговое занятие</i></li>
			</ul>
			<h3>Темы занятий</h3>
			<p><strong>2 Курс</strong></p>
			<ul>
				<li><b>Занятие 7:</b> <i>Правила обработки операционного поля</i></li>
				<li><b>Занятие 8:</b> <i>Внутривенные инъекции</i></li>
				<li><b>Занятие 9:</b> <i>Внутривенные инфузии</i></li>
				<li><b>Занятие 10:</b> <i>Зондовое промывание</i></li>
				<li><b>Занятие 11:</b> <i>Уход за колостомами и трахеостомами</i></li>				
				<li><b>Занятие 12:</b> <i>Итоговое занятие</i></li>
			</ul>*/
			`
			<h3>Темы занятий</h3>
			<p><strong>3 Курс</strong></p>
			<ul>
				<li><b>Занятие 7:</b> <i>Гидроторакс, Пиоторакс, Пневмоторакс, Михротрахеостомия</i></li>
				<li><b>Занятие 8:</b> <i>Внутрикостный доступ, носовое кровотечение</i></li>
				<li><b>Занятие 9:</b> <i>Базовые хирургические навыки</i></li>
				<li><b>Занятие 10:</b> <i>ITLS</i></li>
				<li><b>Занятие 11:</b> <i>БСЛР в особых условиях</i></li>				
				<li><b>Занятие 12:</b> <i>Итоговое занятие</i></li>
			</ul>
			<p><strong>4 Курс</strong></p>
			<ul>			
				<li><b>Занятие 1:</b> <i>Экстренная медицинская помощь</i></li>
				<li><b>Занятие 2:</b> <i>Коммуникативные навыки (консультирование)</i></li>
				<li><b>Занятие 3:</b> <i>Физикальное обследование пациента (Модуль Амбулаторный прием XR- clinic)</i></li>
				<li><b>Занятие 4:</b> <i>Регистрация и анализ ЭКГ</i></li>
				<li><b>Занятие 5:</b> <i>Физикальное обследование пациента (сердечно-сосудистая система)</i></li>
				<li><b>Занятие 6:</b> <i>Физикальное обследование пациента (дыхательная система)</i></li>
				<li><b>Занятие 7:</b> <i>Физикальное обследование пациента (Пальпация живота, Обследование л/у и молочных желез, Ректальное обследование)</i></li>
				<li><b>Занятие 8,9:</b> <i>Принятие решений в клинической срде BodyInteract</i></li>
				<li><b>Занятие 11:</b> <i>Базовые методы эндохирургии (БЭСТЫ)	</i></li>
				<li><b>Занятие 12:</b> <i>Промежуточная аттестация в форме зачета</i></li>
			</ul>
		`,
		contacts: `
			<h3>Контакты</h3>
			<p><strong>Техническая поддержка:</strong></p>
			<ul>
				<li>📧 Email: asc@almazovcentre.ru</li>
				<li>📞 Телефон: +7 (812) 702-37-49 (002580)</li>
				<li>🕒 Время работы: 10:00 - 16:00</li>
			</ul>
			<p><strong>Ответственные лица:</strong></p>
			<ul>
				<li>Лариса Александровна - методист</li>
				<li>Николай Михайлович - технический администратор</li>
			</ul>
			<p>По всем вопросам обращайтесь в техническую поддержку.</p>
		`,
		asc: `
			<div class="image-guide">
            <h3>План помещений АСЦ (Коломяжский д. 21, 2 этаж)</h3>
            <div class="guide-image-container">
                <img src="../Plan-simcenter.png" class="guide-image">
			</div>
			</div>
		`,
		soln: `
			<div class="image-guide">
            <h3>План помещений п. Солнечное, к. 7, 3 этаж </h3>
            <div class="guide-image-container">
                <img src="../Plan-soln.jpg" class="guide-image">
			</div>
			</div>
		`
	};
    
	initNavigation();
	
	let myData = []; // Для хранения исходных данных
	
	// Чтение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const groupFilterValue = urlParams.get('group') || '';

    // Установка значений фильтров
    filterGroup.value = groupFilterValue;
	

    // Загрузка данных из JSON
    fetch('..//data.json')
        .then(response => response.json())
        .then(jsonData => {
            myData = jsonData;
            renderTable(myData);
            mergeCells(); // Объединение ячеек
			addSmartColumnBorders();
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
				<td>${item['ППС']}</td>
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
	
	function addSmartColumnBorders() {
		const rows = tableBody.querySelectorAll("tr");
		
		rows.forEach(row => {
			const tdCount = row.querySelectorAll("td").length;
			
			// Если в строке меньше td, чем должно быть (из-за объединений)
			if (tdCount == 6) {
				row.classList.add('rowspan-border-top');
			}
			
			if (tdCount == 5) {
				row.classList.add('rowspan-border-top-fancy');
			}
		});
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
	
	
	

	// Инициализация меню
	function initNavigation() {
		const tabs = document.querySelectorAll('.nav-tab');
		const modalOverlay = document.getElementById('modalOverlay');
		const modalBody = document.querySelector('.modal-body');
		const modalClose = document.querySelector('.modal-close');

		// Обработчики для вкладок
		tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				const tabName = tab.dataset.tab;
				
				
				// Показываем модальное окно с соответствующим контентом
				modalBody.innerHTML = modalContent[tabName];
				modalOverlay.classList.add('active');
			});
		});

		// Закрытие модального окна
		modalClose.addEventListener('click', closeModal);
		modalOverlay.addEventListener('click', (e) => {
			if (e.target === modalOverlay) {
				closeModal();
			}
		});

		// Закрытие по ESC
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
				closeModal();
			}
		});
	}

	function closeModal() {
		const modalOverlay = document.getElementById('modalOverlay');
		modalOverlay.classList.remove('active');
	}

});
