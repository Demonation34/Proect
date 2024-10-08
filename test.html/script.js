// Массив для запоминания порядка дропнутых элементов
let droppedItemsOrder = [];

// Получаем все элементы, которые можно перетаскивать
const draggables = document.querySelectorAll('.draggable');
const dropzone = document.getElementById('dropzone');

// Устанавливаем события для всех draggable элементов
draggables.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

// Начало перетаскивания
function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

// Зоны дропа: разрешаем дроп
dropzone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

// Обработка события дропа
dropzone.addEventListener('drop', function(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    
    // Добавляем элемент в dropzone
    dropzone.appendChild(draggableElement);

    // Запоминаем порядок дропнутых элементов
    droppedItemsOrder.push(id);
    console.log('Порядок дропнутых элементов:', droppedItemsOrder);
});
