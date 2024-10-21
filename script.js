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
E4="4";
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


// ------------------------------------- krest-inventory
// Обработчик для крестика "×" для скрытия инвентаря и показа кнопки
document.getElementById('closeInventory').addEventListener('click', function() {
    // Скрыть инвентарь
    inventory.classList.add('hidden');
});


function imgs_add() {
    const images = [];
    let i = 1;

    function loadNextImage() {
        const image = new Image();
        image.src = `imgs/${i}.png`;

        image.onload = function() {
            images.push(image.src);

            const container = document.createElement('div');
            container.className = 'container-inv';

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = ` Item ${i}`;
            img.classList.add('draggable');

            container.appendChild(img);
            containersDiv.appendChild(container);

            i++;
            loadNextImage();
        };

        image.onerror = function() {
            console.log(`No more images after ${i - 1}.`);
            initializeDraggable(); // Инициализируем draggable после добавления всех изображений
        };
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
                        allNumbers.push(...numbers);
                        numbers.forEach(num => console.log("Найдена цифра: " + num));
                    }
                }

                dragCount++;
                if (dragCount === 3) {
                    afterThreeDragged = true;
                    const correct = allNumbers.length >= 3 && allNumbers[0] === E1 && allNumbers[1] === E2 && allNumbers[2] === E3;
                    lastMessage = correct ? "Верно" : "Неверно";
                    console.log(lastMessage);
                    dragCount = 0; 
                    allNumbers = [];
                }
            }
        });
    }

    loadNextImage(); // Запускаем загрузку изображений
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
let lastMessage = ""; 

// Переносим инициализацию draggable в imgs_add для избежания дублирования

// Обработчик события клика на кнопку
$("#check").on("click", function() {
    // Проверяем, если lastMessage не пустой
    if (lastMessage) {
        alert(lastMessage); // Если lastMessage не пуст, показываем его
        window.location.href = "docs.html"; // Перенаправляем на docs.html
    } else {
        alert("Неверно"); 
        window.location.href = "index.html";// Если lastMessage пуст, показываем "Неверно"
    }
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










