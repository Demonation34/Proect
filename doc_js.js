// Переменные для PDF документов и страниц
var pdfDoc1 = null, pdfDoc2 = null, pdfDoc3 = null, pdfDoc4 = null, pdfDoc5 = null, pdfDoc6 = null, pdfDoc7 = null, pdfDoc8 = null;
var pageNum1 = 1, pageNum2 = 1, pageNum3 = 1, pageNum4 = 1, pageNum5 = 1, pageNum6 = 1, pageNum7 = 1, pageNum8 = 1;
var scale = 1.5;

// Функция для рендеринга страницы
function renderPage(num, pdfDoc, canvas) {
    var ctx = canvas.getContext('2d');
    pdfDoc.getPage(num).then((page) => {
        var viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderCtx = {
            canvasContext: ctx,
            viewport: viewport
        };

        var renderTask = page.render(renderCtx);
        renderTask.promise.then(() => {
            console.log('Page rendered: ' + num);
        });
    });
}

// Функция для инициализации PDF документа и привязки событий
function initPdf(docUrl, pdfVar, canvasId, pageNumVar) {
    pdfjsLib.getDocument(docUrl).promise.then((doc) => {
        pdfVar = doc;
        var canvas = document.getElementById(canvasId);

        // Рендер первой страницы
        renderPage(pageNumVar, pdfVar, canvas);

        // Перелистывание страниц вперед при щелчке левой кнопкой мыши
        canvas.addEventListener('click', function() {
            if (pageNumVar < pdfVar.numPages) {
                pageNumVar++;
            } else {
                pageNumVar = 1;
            }
            renderPage(pageNumVar, pdfVar, canvas);
        });

        // Перелистывание страниц назад при щелчке правой кнопкой мыши
        canvas.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            if (pageNumVar > 1) {
                pageNumVar--;
            } else {
                pageNumVar = pdfVar.numPages;
            }
            renderPage(pageNumVar, pdfVar, canvas);
        });

        
    });
}

// Инициализация всех PDF документов
initPdf('sample.pdf', pdfDoc1, 'canvas1', pageNum1);
initPdf('sample1.pdf', pdfDoc2, 'canvas2', pageNum2);
initPdf('sample2.pdf', pdfDoc3, 'canvas3', pageNum3);
initPdf('sample3.pdf', pdfDoc4, 'canvas4', pageNum4);
initPdf('sample4.pdf', pdfDoc5, 'canvas5', pageNum5);
initPdf('sample5.pdf', pdfDoc6, 'canvas6', pageNum6);
initPdf('sample6.pdf', pdfDoc7, 'canvas7', pageNum7);
initPdf('sample7.pdf', pdfDoc8, 'canvas8', pageNum8);







// Находим все элементы с классом .pdf_c
const pdfElements = document.querySelectorAll(".pdf_c");

// Функция для добавления класса clicked к элементу
function activatePdf(element) {
    // Сначала убираем класс clicked у всех .pdf_c
    pdfElements.forEach(el => el.classList.remove("clicked"));
    // Добавляем класс clicked к выбранному элементу
    element.classList.add("clicked");
}

// Добавляем обработчик клика для каждого элемента .pdf_c
pdfElements.forEach(el => {
    el.addEventListener("click", function(event) {
        event.stopPropagation(); // Предотвращаем всплытие события
        activatePdf(el); // Применяем стиль к нажатому элементу
    });
});

// Обработчик для клика вне элементов .pdf_c
document.addEventListener("click", function() {
    pdfElements.forEach(el => el.classList.remove("clicked")); // Убираем класс у всех .pdf_c
});

var inventoryDiv = document.getElementById('inventory');
if (inventoryDiv) {
    inventoryDiv.remove();
}


// Подсветка контейнера при наведении
dropContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropContainer.classList.add('dragover');
});

dropContainer.addEventListener('dragleave', () => {
    dropContainer.classList.remove('dragover');
});

dropContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    dropContainer.classList.remove('dragover');
    
    const data = e.dataTransfer.getData('text/plain'); // Получаем данные из drag-and-drop
    console.log('Полученные данные:', data);

    // Проверяем, является ли это путём к изображению
    if (data) {
        // Создаём элемент изображения
        const img = document.createElement('img');
        img.src = data;
        img.style.opacity = '0'; // Скрываем перед анимацией
        img.style.transition = 'opacity 0.5s ease-in-out';
        img.style.width = '13vh'; // Устанавливаем размер миниатюры
        img.style.height = '16vh';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '1vh';
        img.style.margin = '1vh'; // Расстояние между изображениями
        img.draggable = false;

        // Добавляем изображение в контейнер
        dropContainer.appendChild(img);

        // Запускаем анимацию появления
        setTimeout(() => {
            img.style.opacity = '1'; // Плавное появление
        }, 0);
    } else {
        // Показываем сообщение, если данных нет или они невалидны
        const error = document.createElement('p');
        error.textContent = 'Не удалось загрузить изображение!';
        error.style.color = 'red';
        dropContainer.appendChild(error);
    }
});
