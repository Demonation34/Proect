var pdfDoc1 = null,
    pdfDoc2 = null,
    pdfDoc3 = null,
    pageNum1 = 1,  // Начальная страница для sample.pdf
    pageNum2 = 1,  // Начальная страница для sample1.pdf
    pageNum3 = 1,  // Начальная страница для sample2.pdf
    scale = 1.5;

// Функция для рендеринга страницы на канвасе
function renderPage(num, pdfDoc, canvas) {
    var ctx = canvas.getContext('2d');
    pdfDoc.getPage(num).then((page) => {
        var viewport = page.getViewport({scale: scale});
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

// Загрузка PDF документов
pdfjsLib.getDocument('sample.pdf').promise.then((doc1) => {
    pdfDoc1 = doc1;

    var canvas1 = document.getElementById("canvas1");

    // Рендер первой страницы для sample.pdf
    renderPage(pageNum1, pdfDoc1, canvas1);

    // Обработчик для перелистывания на canvas1
    canvas1.addEventListener('click', function() {
        if (pageNum1 < pdfDoc1.numPages) {
            pageNum1++;  // Увеличиваем номер страницы для sample.pdf
        } else {
            pageNum1 = 1;  // Если конец документа, возвращаемся к первой странице
        }
        renderPage(pageNum1, pdfDoc1, canvas1);  // Перерисовываем canvas1
    });

    // Обработчик для перелистывания назад на canvas1 (правая кнопка мыши)
    canvas1.addEventListener('contextmenu', function(event) {
        event.preventDefault();  // Отменяем стандартное контекстное меню
        if (pageNum1 > 1) {
            pageNum1--;  // Уменьшаем номер страницы для sample.pdf
        } else {
            pageNum1 = pdfDoc1.numPages;  // Если первая страница, возвращаемся к последней
        }
        renderPage(pageNum1, pdfDoc1, canvas1);  // Перерисовываем canvas1
    });
});

pdfjsLib.getDocument('sample1.pdf').promise.then((doc2) => {
    pdfDoc2 = doc2;

    var canvas2 = document.getElementById("canvas2");

    // Рендер первой страницы для sample1.pdf
    renderPage(pageNum2, pdfDoc2, canvas2);

    // Обработчик для перелистывания на canvas2
    canvas2.addEventListener('click', function() {
        if (pageNum2 < pdfDoc2.numPages) {
            pageNum2++;  // Увеличиваем номер страницы для sample1.pdf
        } else {
            pageNum2 = 1;  // Если конец документа, возвращаемся к первой странице
        }
        renderPage(pageNum2, pdfDoc2, canvas2);  // Перерисовываем canvas2
    });

    // Обработчик для перелистывания назад на canvas2 (правая кнопка мыши)
    canvas2.addEventListener('contextmenu', function(event) {
        event.preventDefault();  // Отменяем стандартное контекстное меню
        if (pageNum2 > 1) {
            pageNum2--;  // Уменьшаем номер страницы для sample1.pdf
        } else {
            pageNum2 = pdfDoc2.numPages;  // Если первая страница, возвращаемся к последней
        }
        renderPage(pageNum2, pdfDoc2, canvas2);  // Перерисовываем canvas2
    });
});

pdfjsLib.getDocument('sample2.pdf').promise.then((doc3) => {
    pdfDoc3 = doc3;

    var canvas3 = document.getElementById("canvas3");

    // Рендер первой страницы для sample2.pdf
    renderPage(pageNum3, pdfDoc3, canvas3);

    // Обработчик для перелистывания на canvas3
    canvas3.addEventListener('click', function() {
        if (pageNum3 < pdfDoc3.numPages) {
            pageNum3++;  // Увеличиваем номер страницы для sample2.pdf
        } else {
            pageNum3 = 1;  // Если конец документа, возвращаемся к первой странице
        }
        renderPage(pageNum3, pdfDoc3, canvas3);  // Перерисовываем canvas3
    });

    // Обработчик для перелистывания назад на canvas3 (правая кнопка мыши)
    canvas3.addEventListener('contextmenu', function(event) {
        event.preventDefault();  // Отменяем стандартное контекстное меню
        if (pageNum3 > 1) {
            pageNum3--;  // Уменьшаем номер страницы для sample2.pdf
        } else {
            pageNum3 = pdfDoc3.numPages;  // Если первая страница, возвращаемся к последней
        }
        renderPage(pageNum3, pdfDoc3, canvas3);  // Перерисовываем canvas3
    });
});
