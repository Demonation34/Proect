<?php
$host = 'example.local';
$db = 'BD';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

try {
    // Создание подключения к базе данных
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получение данных из запроса
    $inputData = json_decode(file_get_contents('php://input'), true);

    // Подготовка SQL-запроса
    $stmt = $pdo->prepare("INSERT INTO `Тестирование` (персона_id, тест_id, дата_начала, дата_окончания) VALUES (:userId, :test_id, :start_date, :end_date)");

    // Привязка параметров
    
    $stmt->bindParam(':userId', $inputData['id']);
    $stmt->bindParam(':test_id', $inputData['test_id']);
    $stmt->bindParam(':start_date', $inputData['дата_начала']);
    $stmt->bindParam(':end_date', $inputData['дата_окончания']);

    // Выполнение запроса
    $stmt->execute();

    // Возврат успешного ответа
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

?>
