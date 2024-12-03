$(document).ready(function () {
   $('#go').click(function (event) {
       event.preventDefault();

       // Собираем данные для отправки
       var login = $('#name').val();
       var password = $('#pass').val();

       // AJAX-запрос для авторизации
       $.ajax({
           url: 'login.php', // Укажите путь к файлу авторизации
           type: 'POST',
           data: {
               login: login,
               password: password
           },
           success: function (response) {
               // Ожидаем, что ответ придет в формате JSON
               try {
                   var data = JSON.parse(response);

                   if (data.status === 'success') {
                       // Авторизация прошла успешно, отображаем ID пользователя и перенаправляем
                       $('#userId').text(data.id);
                       $('#userIdDisplay').show();
                       window.location.href = 'index.html'; // Перенаправление
                   } else if (data.status === 'error') {
                       alert(data.message);
                   }
               } catch (error) {
                   console.error('Ошибка обработки ответа:', error);
                   alert('Ошибка при обработке ответа от сервера.');
               }
           },
           error: function (xhr, status, error) {
               console.error('Ошибка AJAX-запроса:', error);
               alert('Произошла ошибка при подключении к серверу.');
           }
       });
   });
});



$(document).ready(function() {
   // Обработчик для кнопки "Зарегистрироваться"
   $('#reg').click(function(event) {
       event.preventDefault(); // Предотвращаем отправку формы по умолчанию

       // Получаем значения из полей
       const regname = $('#regname').val();
       const regpass = $('#regpass').val();
       const reregpass = $('#reregpass').val();

       // Отправляем AJAX-запрос на сервер
       $.ajax({
           type: 'POST',
           url: 'register.php',
           data: {
               regname: regname,
               regpass: regpass,
               reregpass: reregpass
           },
           success: function(response) {
               const res = response;
               if (res.status === 'success') {
                   alert(res.message);
                   window.location.href = 'index.php';
               } else {
                   alert(res.message);
               }
           },
           error: function() {
               alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
           }
       });
   });
});












$(function() {

   $(".input input").focus(function() {

      $(this).parent(".input").each(function() {
         $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "0px"
         })
         $(".spin", this).css({
            "width": "100%"
         })
      });
   }).blur(function() {
      $(".spin").css({
         "width": "0px"
      })
      if ($(this).val() == "") {
         $(this).parent(".input").each(function() {
            $("label", this).css({
               "line-height": "60px",
               "font-size": "24px",
               "font-weight": "300",
               "top": "10px"
            })
         });

      }
   });

   $(".button").click(function(e) {
      var pX = e.pageX,
         pY = e.pageY,
         oX = parseInt($(this).offset().left),
         oY = parseInt($(this).offset().top);

      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
      $('.x-' + oX + '.y-' + oY + '').animate({
         "width": "500px",
         "height": "500px",
         "top": "-250px",
         "left": "-250px",

      }, 600);
      $("button", this).addClass('act');
   })

   $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
         $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
         })

         setTimeout(function() {
            $(".overbox").css({
               "overflow": "initial"
            })
         }, 600)

         $(this).animate({
            "width": "140px",
            "height": "140px"
         }, 500, function() {
            $(".box").removeClass("back");

            $(this).removeClass('act')
         });

         $(".overbox .title").fadeOut(300);
         $(".overbox .input").fadeOut(300);
         $(".overbox .button").fadeOut(300);

         $(".alt-2").addClass('material-buton');
      }

   })

   $(".material-button").click(function() {

      if ($(this).hasClass('material-button')) {
         setTimeout(function() {
            $(".overbox").css({
               "overflow": "hidden"
            })
            $(".box").addClass("back");
         }, 200)
         $(this).addClass('act').animate({
            "width": "700px",
            "height": "700px"
         });

         setTimeout(function() {
            $(".shape").css({
               "width": "50%",
               "height": "50%",
               "transform": "rotate(45deg)"
            })

            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
         }, 700)

         $(this).removeClass('material-button');

      }

      if ($(".alt-2").hasClass('material-buton')) {
         $(".alt-2").removeClass('material-buton');
         $(".alt-2").addClass('material-button');
      }

   });

});