document.getElementById("Next").addEventListener("click", function() {
    window.location.href = "index1.html";
});
function openNav() {
document.getElementById("side-menu").style.left = "0";
document.getElementById("overlay").style.display = "block";
}

function closeNav() {
document.getElementById("side-menu").style.left = "-250px";
document.getElementById("overlay").style.display = "none";
}
// Клонируем кнопку перед её удалением
document.getElementById("Home").addEventListener("click", function() {
    window.location.href = "index.html";
});

var check = "";

$(function() {
$("#start-button").on("click", function() {
    document.getElementById("start-button").style.visibility = 'hidden';
    document.getElementById("finish-button").style.visibility = "visible";
    $("#interface-container").show();

});



$(".scroll-image").draggable({
    revert: "invalid"
});

var lastDroppedAlt = null;

$(".background-image").droppable({
    accept: ".scroll-image",
    drop: function(event, ui) {
        var alt = ui.draggable.attr("alt");
        lastDroppedAlt = alt;
        if (alt === "Комбинезон.png") {
            var overlayImages = document.querySelectorAll('.overlay-image');
            check += alt;
            overlayImages.forEach(function (element) {
                element.style.opacity = 1;
            });
        } else if (alt === "wd.png") {
            var suitImages = document.querySelectorAll('.suit-image');
            check += alt;
            suitImages.forEach(function (element) {
                element.style.opacity = 1;
            });
        } else if (alt === "7.2. П_Противогаз для голубого фона.png") {
var styleImages = document.querySelectorAll('.style-image-7-2');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "7.3. П_Шланговый противогаз с курткой.png") {
var styleImages = document.querySelectorAll('.style-image-7-3');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "8. П_Каска.png") {
var styleImages = document.querySelectorAll('.style-image-8');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "wd1.png") {
var styleImages = document.querySelectorAll('.style-image-wd1');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "инвентарь.png") {
var styleImages = document.querySelectorAll('.style-image-inventory');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "2. П_Ботинки.png") {
var styleImages = document.querySelectorAll('.style-image-2');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "3.2. П_ИГC.png") {
var styleImages = document.querySelectorAll('.style-image-3-2');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "3.3. П_Рация.png") {
var styleImages = document.querySelectorAll('.style-image-3-3');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "3.4. П_Переносной газосигнализатор.png") {
var styleImages = document.querySelectorAll('.style-image-3-4');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "3.5. П_Искробезопасный инструмент для белого фона.png") {
var styleImages = document.querySelectorAll('.style-image-3-5-white');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "3.5. П_Искробезопасный инструмент для голубого фона.png") {
var styleImages = document.querySelectorAll('.style-image-3-5-blue');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "4. П_Комбинезон для белого фона.png") {
var styleImages = document.querySelectorAll('.style-image-4-white');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "4. П_Комбинезон для голубого фона.png") {
var styleImages = document.querySelectorAll('.style-image-4-blue');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "5.1. П_Перчатки.png") {
var styleImages = document.querySelectorAll('.style-image-5-1');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "5.2. П_Перчатки ИГC.png") {
var styleImages = document.querySelectorAll('.style-image-5-2-igc');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "5.3. П_Перчатки рация.png") {
var styleImages = document.querySelectorAll('.style-image-5-3-radio');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "5.4. П_Перчатки переносной газосигнализатор.png") {
var styleImages = document.querySelectorAll('.style-image-5-4');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "5.5. П_Перчатки инструмент.png") {
var styleImages = document.querySelectorAll('.style-image-5-5-tool');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "5.6. П_Перчатки дозимметр.png") {
var styleImages = document.querySelectorAll('.style-image-5-6-dosimeter');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "Куртка.png") {
var styleImages = document.querySelectorAll('.style-image-kyrtka');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "7.1. П_Защитные очки.png") {
var styleImages = document.querySelectorAll('.style-image-zash');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
} else if (alt === "7.2. П_Противогаз для белого фона.png") {
var styleImages = document.querySelectorAll('.style-image-belgaz');
check += alt;
styleImages.forEach(function (element) {
element.style.opacity = 1;
});
}
    }
});
});

$(function() {
    $("#finish-button").on("click", function() {
        if (check == ""){
            alert("Ничего не надето");
        } else {
            alert("Что-то надето");
        }
    })})

document.getElementById('figure').addEventListener('click', function() {
var overlayImages = document.querySelectorAll('.overlay-image');
check = "";
overlayImages.forEach(function (element) {
    element.style.opacity = 0;
    var suitImages = document.querySelectorAll('.suit-image');
    suitImages.forEach(function (element) {
        element.style.opacity = 0;
        var suitImages = document.querySelectorAll('[class^="style"], [class*=" style"]');
    suitImages.forEach(function (element) {
        element.style.opacity = 0;
        
        
    });
        
    });
});
});

document.getElementById('inventar').addEventListener('click', function() {
var imageContainer = document.getElementById('imageContainer');
if (imageContainer.style.display === 'none' || imageContainer.style.display === '') {
    imageContainer.style.display = 'block';
} else {
    imageContainer.style.display = 'none';
}
});
document.getElementById("skip-button").addEventListener("click", function() {
    window.location.href = "index2.html";
});
