<?php
$host = 'example.local'; // Имя хоста
$db = 'BD'; // Имя базы данных
$user = 'root'; // Имя пользователя базы данных
$pass = ''; // Пароль

// Подключение к базе данных
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}

// Получение данных из AJAX-запроса
$allNumbers = isset($_POST['allNumbers']) ? json_decode($_POST['allNumbers']) : null;
$question_id = isset($_POST['question_id']) ? (int)$_POST['question_id'] : null;
$correct = isset($_POST['correct']) ? (int)$_POST['correct'] : null;

if ($allNumbers && $question_id !== null && $correct !== null) {
    // Преобразуем массив allNumbers в одно целое число
    $order = implode('', $allNumbers); // Соединяем все элементы массива в строку без запятой
    $orderInt = (int)$order; // Преобразуем строку в целое число

    // Подготовка SQL-запроса для вставки данных
    $stmt = $pdo->prepare("INSERT INTO Ответы (порядок, вопрос_id, правильный) VALUES (:order, :question_id, :correct)");
    
    // Выполнение запроса
    $stmt->execute([
        ':order' => $orderInt,
        ':question_id' => $question_id,
        ':correct' => $correct
    ]);

    echo "Данные успешно сохранены в базе данных!";
} else {
    echo "Ошибка: отсутствуют необходимые данные для записи.";
}
?>
