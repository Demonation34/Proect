let currentDate = new Date();
console.log(currentDate);

$(document).ready(function () {
    console.log("Страница загружена, начинаю загрузку JSON..."); // Добавлено для диагностики
    $.getJSON('user_data.json', function (data) {
        console.log("JSON загружен:", data); // Добавлено для диагностики
        
        // Проверка, есть ли ID пользователя в JSON-файле
        if (data && data['персона_id']) {
            let userId = data['персона_id']; // Сохраняем ID в переменную
            $('#userId').text(userId); // Отображаем ID на странице
            $('#userIdDisplay').show(); // Показываем блок с ID

            // Выводим ID в консоль
            console.log('Персона ID:', userId); // Здесь мы выводим ID в консоль
        } else {
            console.error('ID пользователя не найден в JSON-файле.');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Ошибка при загрузке JSON-файла:', textStatus, errorThrown); // Подробная ошибка
    });
});
function handleUserId(userId) {
    console.log('Персона ID:', userId);
    // Здесь можно добавить любой другой код, который зависит от userId
}

$(document).ready(function () {
    $.getJSON('user_data.json', function (data) {
        if (data && data['персона_id']) {
            userId = data['персона_id'];
            $('#userId').text(userId);
            $('#userIdDisplay').show();
            handleUserId(userId); // Вызов функции для обработки userId
        } else {
            console.error('ID пользователя не найден в JSON-файле.');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Ошибка при загрузке JSON-файла:', textStatus, errorThrown);
    });
});

// Получаем все элементы с классом butn
const buttons = document.querySelectorAll('.butn');
const toggleButton = document.getElementById('toggleInventory');
const sound = document.getElementById('sound');
const burgerMenu = document.getElementById('burgerMenu');
const sidebar = document.getElementById('sidebar');
const menuText = document.getElementById('menuText');
const inventory = document.getElementById('inventory');
const buttonRect = toggleButton.getBoundingClientRect();
const containersDiv = inventory.querySelector('.containers');
let f = true;
const start = document.getElementById('start');
const scene = document.getElementById('scene');
const test_id=1
const id1=1
let lastMessage = "";
let E1, E2, E3;
let userId;
// AJAX-запрос к PHP-скрипту
fetch('get_values.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error);
        } else {
            E1 = data.E1;
            E2 = data.E2;
            E3 = data.E3;

            // Вызов функции для проверки после получения данных
            
        }
    })
    .catch(error => console.error('Ошибка запроса:', error));

 // Пример данных для проверки

 function checkCorrect() {
    const correct = allNumbers.length === E1; // Проверяем, что длина allNumbers соответствует E1
    lastMessage = correct ? "Верная длина" : "Неверная длина";
    console.log(lastMessage);
};

// Для каждого элемента с классом butn добавляем обработчики событий
buttons.forEach(button => {
    // Когда нажата кнопка мыши (mousedown)
    button.addEventListener('mousedown', () => {
        button.classList.add('active'); // Добавляем класс для уменьшения размера при нажатии
    });

    // Когда кнопка мыши отпущена (mouseup)
    button.addEventListener('mouseup', () => {
        button.classList.remove('active'); // Убираем класс для возвращения к состоянию hover
    });

    // Если пользователь уводит мышь после нажатия и не отпускает
    button.addEventListener('mouseleave', () => {
        button.classList.remove('active'); // Убираем класс, если мышь уходит за пределы кнопки
    });
});


// ---------------------------------- burger
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active_krest'); // Переключаем класс 'active'
    document.body.classList.toggle('menu-active'); // Переключаем класс 'menu-active' у body

    // Переключаем класс 'active' у боковой панели
    sidebar.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        menuText.style.display = 'block';
        // Добавляем задержку 500 миллисекунд перед появлением текста
        setTimeout(() => {
            menuText.innerHTML = 
            `<h2 class="home butn "><a href="index.html">Главное меню</a></h2>
            <h2 class="home butn "><a href="img0.html">Иллюстрация</a></h2>
            <h2 class="back butn"><a href="index.html">Назад</a></h2>`;
        }, 200); // Задержка 0.5 секунды
    } else {
        menuText.innerHTML = '';
        menuText.style.display = 'none';
    }
});

//-------------------------- sound
sound.addEventListener('click', () => {
    sound.classList.toggle('change_image');
    
    if (sound.classList.contains('change_image')) {
        sound.setAttribute("src", "imgs/sound_0.png");
    } else {
        sound.setAttribute("src", "imgs/sound.png");
    }
});


//-------------------------------- inventory


inventory.classList.remove('hidden');
    
// Получаем высоту элемента inventory
if (f){
    imgs_add();
    f = false;
}
const inventoryHeight = inventory.offsetHeight;
    
// Скрываем inventory после того, как получили высоту, если нужно
inventory.classList.add('hidden');


toggleButton.addEventListener('click', function() {
    // Показать/скрыть инвентарь по клику
    if (toggleButton.classList.contains('enb')){
        

        // Показать/скрыть инвентарь по клику
        inventory.classList.toggle('hidden');
    }
});

let previousStates = [];
// ------------------------------------- krest-inventory
// Обработчик для крестика "×" для скрытия инвентаря и показа кнопки
document.getElementById('closeInventory').addEventListener('click', function() {
    // Скрыть инвентарь
    inventory.classList.add('hidden');
});


function imgs_add() {
    const images = [];
    let i = 0; // Начинаем с 0, потому что будем загружать из массива

    // Функция для загрузки изображений из базы данных
    function loadImagesFromDB() {
        $.ajax({
            url: 'get_images.php', // URL вашего PHP-скрипта
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    images.push(...data); // Заполняем массив images полученными данными
                    loadNextImage(); // Начинаем загружать изображения
                } else {
                    console.log("Нет изображений в базе данных.");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Ошибка загрузки изображений: " + textStatus, errorThrown);
            }
        });
    }

    function loadNextImage() {
        if (i < images.length) {
            const image = new Image();
            image.src = images[i]; // Используем путь из массива

            image.onload = function() {
                const container = document.createElement('div');
                container.className = 'container-inv';

                const img = document.createElement('img');
                img.src = image.src;
                img.alt = `Item ${i + 1}`; // Изменяем alt, чтобы он соответствовал индексу
                img.classList.add('draggable');

                // Создаем изображение с номером поверх первого
                const overlayImage = new Image();
                overlayImage.src = `http://example.local:8080/imgs/i${i + 1}.png`; // Путь к картинке с номером
                overlayImage.classList.add('overlay-image');

                // Добавляем изображения в контейнер
                container.appendChild(img);
                container.appendChild(overlayImage); // Добавляем картинку с номером поверх

                containersDiv.appendChild(container);

                // Обработчик для события drop, чтобы удалять обе картинки
                container.addEventListener('drop', function() {
                    img.remove(); // Удаляем основное изображение
                    overlayImage.remove(); // Удаляем наложенное изображение
                });

                i++;
                loadNextImage(); // Загружаем следующее изображение
            };

            image.onerror = function() {
                console.log(`Ошибка загрузки изображения: ${images[i]}.`);
                i++; // Переходим к следующему изображению в случае ошибки
                loadNextImage(); // Загружаем следующее изображение
            };
        } else {
            console.log("Все изображения загружены.");
            initializeDraggable(); // Инициализируем draggable после добавления всех изображений
        }
    }

    function initializeDraggable() {
        $(".draggable").draggable({
            helper: function() {
                const $clone = $(this).clone().css('transform', 'scale(7)');
                return $clone;
            },
            start: function() {
                const altText = $(this).attr("alt");
                if (altText) {
                    const numbers = altText.match(/\d+/g);
                    if (numbers) {
                        previousStates.push([...allNumbers]);
                        allNumbers.push(...numbers);
                        numbers.forEach(num => console.log("Найдена цифра: " + num));
                        checkCorrect();
                    }
                }

                dragCount++;
                if (dragCount === 3) {
                    afterThreeDragged = true;
                    dragCount = 0;
                }
            },
            stop: function(event, ui) {
                // Это место, где можно обработать поведение после того, как изображение было "брошено"
                const container = ui.helper.closest('.container-inv');
                if (container.length) {
                    const img = container.find('img').first(); // Найдем основное изображение
                    const overlayImage = container.find('.overlay-image').first(); // Найдем наложенное изображение

                    if (img && overlayImage) {
                        img.remove(); // Удаляем основное изображение
                        overlayImage.remove(); // Удаляем наложенное изображение
                    }
                }
            }
        });
    }

    // Запускаем загрузку изображений из базы данных
    loadImagesFromDB();
}


start.addEventListener('click', () => {
    scene.classList.toggle('hidden');
    Object.assign(scene.style, {
        backgroundPosition: 'center',
        backgroundImage: 'url("imgs/human.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        objectFit: 'contain',
    });
    toggleButton.classList.toggle('enb');
    start.innerHTML = `<a href="docs.html">Дальше</a>`;
});

// Инициализация переменных
let dragCount = 0; 
let allNumbers = []; 
let afterThreeDragged = false; 


// Переносим инициализацию draggable в imgs_add для избежания дублирования

// Обработчик события клика на кнопку
$("#check").on("click", function() {
    // Проверяем, если lastMessage не пустой
    sendDataToServer();
        alert(lastMessage); // Если lastMessage не пуст, показываем его
        

        
    
    
        FinishDate2 = new Date(); // Обновляем currentDate2
        console.log("FinishDate2:", FinishDate2); // Выводим в консоль

        // Форматируем и отображаем новую дату
        
        
    

function formatDateToMySQL(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Январь - 0
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
    
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    }
    
    function sendTestData(userId, test_id, currentDate, FinishDate2) {
        // Подготовим данные для отправки
        const data = {
            id: userId,
            test_id: test_id,
            дата_начала: formatDateToMySQL(currentDate), // Преобразуем в нужный формат
            дата_окончания: formatDateToMySQL(FinishDate2) // Преобразуем в нужный формат
        };
    
        // Отправляем данные на сервер
        fetch('TEST.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    sendTestData(userId, test_id, currentDate, FinishDate2);

    
        
    
});






// Делаем элемент сцены droppable
$(document).ready(function() {
    var $scene = $(".scene");

    $(".scene").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            // Получаем элемент, который был перетащен
            var $draggedElement = ui.draggable;

            // Устанавливаем пропорциональные размеры и координаты перетащенного элемента
            $draggedElement.css({
                width: '50vw', // Например, 20% от ширины сцены
                height: '85vh', // Например, 25% от высоты сцены
                position: 'absolute', // Позволяет задать точное положение
                left: '28.68vw', // Положение слева относительно родителя (например, 50%)
                top: '2.3vh', // Положение сверху относительно родителя (например, 50%)
                'object-fit':'contain',
                
                
            });

            // Перемещаем его внутрь зоны
            $draggedElement.appendTo(this);
            $draggedElement.draggable('disable');
            
            
            
        }
    });
});

// Функция для сброса инвентаря и обновления элемента human
function resetInventoryAndHuman() {

    // Сбрасываем переменную lastMessage
    lastMessage = '';

    // Очищаем инвентарь
    
    containersDiv.innerHTML = ''; // Удаляем все элементы внутри контейнера

    // Запускаем заново процесс добавления изображений
    imgs_add(); 

    // Обновляем элемент human
    
    //scene.innerHTML = ''; // Удаляем текущий фон и содержимое

    // Создаем заново элемент human
   //Object.assign(scene.style, {
   //    backgroundPosition: 'center',
   //    backgroundImage: 'url("imgs/human.png")',
   //    backgroundSize: 'contain',
   //    backgroundRepeat: 'no-repeat',
   //    height: '100%',
   //    objectFit: 'contain',
   //});
   const sceneDiv = document.getElementById('scene');
    
    // Ищем элементы с alt, содержащим "Item" и возможными пробелами
    const items = Array.from(sceneDiv.querySelectorAll('img[alt*="Item"]'));

    // Удаляем последний элемент с атрибутом alt, содержащим "Item"
    if (items.length > 0) {
        const lastItem = items[items.length - 1];
        lastItem.remove(); // Удаляем последний элемент
    }
    if (previousStates.length > 0) {
        allNumbers = previousStates.pop(); // Восстанавливаем предыдущее состояние
        console.log("Откат на один шаг назад, текущее состояние:", allNumbers);
        checkCorrect(); // Перепроверяем правильность после отката
    } else {
        console.log("Нечего откатывать!");
    }
    
}
// Добавляем обработчик события для сброса по нажатию на кнопку с id 'sbros'
document.getElementById('sbros').addEventListener('click', resetInventoryAndHuman);






// Функция для отправки данных allNumbers на сервер
function sendDataToServer() {
    $.ajax({
        url: 'send_ot.php', // Файл на сервере для обработки данных
        type: 'POST',
        data: {
            allNumbers: JSON.stringify(allNumbers), // Преобразуем массив в строку JSON
            question_id: 1, // Значение question_id
            correct: 1 // Значение correct
        },
        success: function(response) {
            console.log("Ответ от сервера:", response); // Выводим ответ сервера в консоль
            alert("Данные успешно отправлены");
        },
        error: function(xhr, status, error) {
            console.error("Ошибка отправки данных:", error);
            alert("Ошибка отправки данных");
        }
    });
}

// Вызывайте sendDataToServer() в нужный момент, например, по кнопке:

















