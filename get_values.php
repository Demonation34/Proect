<?php
header('Content-Type: application/json');
$host = 'example.local';
$db = 'BD';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->query("SELECT Правильный_порядок FROM Вопрос LIMIT 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && isset($result['Правильный_порядок'])) {
        // Получаем строку из столбца Правильный_порядок
        $correct_order = $result['Правильный_порядок'];

        // Вычисляем длину строки
        $length = strlen($correct_order);

        // Возвращаем длину числа
        echo json_encode([
            'E1' => $length
        ]);
    } else {
        echo json_encode(['error' => 'Нет данных для Правильный_порядок']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения: ' . $e->getMessage()]);
}
?>
