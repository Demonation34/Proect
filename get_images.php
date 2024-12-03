<?php
$servername = "localhost";
$username = "root"; // Укажите ваше имя пользователя
$password = ""; // Укажите ваш пароль
$dbname = "Baza"; // Название вашей базы данных

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL-запрос для получения путей изображений
$sql = "SELECT Path FROM Images";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
    // Сохранение путей изображений в массив
    while($row = $result->fetch_assoc()) {
        $images[] = $row['Path'];
    }
}

// Возврат данных в формате JSON
echo json_encode($images);

// Закрытие соединения
$conn->close();
?>
