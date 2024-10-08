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
E1="1";
E2="2";
E3="3";

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
            `<h2 class="home butn "><a href="main.html">Главное меню</a></h2>
            <h2 class="home butn "><a href="img0.html">Иллюстрация</a></h2>
            <h2 class="back butn"><a href="main.html">Назад</a></h2>`;
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


// ------------------------------------- krest-inventory
// Обработчик для крестика "×" для скрытия инвентаря и показа кнопки
document.getElementById('closeInventory').addEventListener('click', function() {
    // Скрыть инвентарь
    inventory.classList.add('hidden');
});



function imgs_add() {
    const images = [];

    // Генерация путей к изображениям от 1 до 29
    for (let i = 1; i <= 23; i++) {
        images.push(`imgs/items/${i}.png`);
    }

    // Добавляем контейнеры и изображения в инвентарь
    images.forEach((image, index) => {

        try {
            // Создаем контейнер для изображения
        const container = document.createElement('div');
        container.className = 'container-inv';

        const img = document.createElement('img');
            img.src = image;
            img.alt = `Item ${index + 1}`;
            
        // Добавляем изображение в контейнер
        container.appendChild(img);
        img.classList.add('draggable')
        // Добавляем контейнер в секцию инвентаря
        containersDiv.appendChild(container);
        } catch (error) {
            console.error(`Произошла ошибка при добавлении изображения: ${error}`);
        }
    });
}



start.addEventListener('click', () => {

    scene.classList.toggle('hidden');

    scene.style.backgroundPosition = 'center';
    scene.style.backgroundImage = 'url("/imgs/items/human.png")';
    scene.style.backgroundSize = 'contain';
    scene.style.backgroundRepeat = 'no-repeat';
    scene.style.height = '100%';
    scene.style.objectFit = 'contain';
    


    toggleButton.classList.toggle('enb');
    start.innerHTML = `<a href="docs.html">Дальше</a>`;

});

// Счетчик для отслеживания количества перетаскиваемых элементов
let dragCount = 0; 
let allNumbers = []; // Массив для хранения всех найденных цифр
let afterThreeDragged = false; // Флаг для отслеживания состояния после трех перетаскиваний
let lastMessage = ""; // Переменная для хранения последнего сообщения

$(".draggable").draggable({
    
    helper: function() {
        // Создаем клон элемента
        var $clone = $(this).clone();
        // Применяем трансформацию к клону
        $clone.css({
            'transform': 'scale(7)', // Увеличиваем клон на 10%
            
        });
        return $clone; // Возвращаем клон как helper
    },

    start: function(event, ui) {
        // Получаем значение атрибута alt у перетаскиваемого элемента
        var altText = $(this).attr("alt");
        $(this).css('transform', 'scale(2)');
        

        // Проверяем, существует ли alt
        if (altText) {
            // Используем регулярное выражение для извлечения всех цифр
            var numbers = altText.match(/\d+/g);
            if (numbers) {
                // Объединяем все найденные цифры в общий массив
                allNumbers = allNumbers.concat(numbers);
            }
        }

        // Увеличиваем счетчик
        dragCount++;

        // Если перетаскивали три элемента
        if (dragCount === 3) {
            afterThreeDragged = true; // Устанавливаем флаг, что три элемента уже перетащили

            // Проверяем, совпадают ли первые три цифры с 1, 2 и 3
            if (allNumbers.length >= 3 && allNumbers[0] === E1 && allNumbers[1] === E2 && allNumbers[2] === E3) {
                console.log("Верно");
                lastMessage = "Верно"; // Сохраняем последнее сообщение
            } else {
                console.log("Неверно");
                lastMessage = "Неверно"; // Сохраняем последнее сообщение
            }

            // Сбрасываем счетчик и массив для дальнейшего использования
            dragCount = 0; 
            allNumbers = [];
        }
    }
});

// Обработчик события клика на кнопку
$("#check").on("click", function() {
    // Показать кастомный alert с последним сообщением
    alert(lastMessage || "Неверно"); // Если lastMessage пуст, показываем "Неверно"
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
                width: 'auto', // Например, 20% от ширины сцены
                height: '97%', // Например, 25% от высоты сцены
                position: 'absolute', // Позволяет задать точное положение
                left: '53.7%', // Положение слева относительно родителя (например, 50%)
                top: '50%', // Положение сверху относительно родителя (например, 50%)
                'object-fit':'contain',
                'transform': 'translate(-50%, -50%)'
                
            });

            // Перемещаем его внутрь зоны
            $draggedElement.appendTo(this);
            $draggedElement.draggable("disable");
            
        }
    });
});


document.querySelectorAll('*').forEach(function(el) {
    if (getComputedStyle(el).cursor === 'pointer') {
        el.style.cursor = "url('dw.png'), pointer";
    }
});

document.querySelectorAll('*').forEach(function(el) {
    if (getComputedStyle(el).cursor === 'grab') {
        el.style.cursor = "url('dw.png'), pointer";
    }
});



