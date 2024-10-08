<?php
session_start();
$host = 'example.local';
$db = 'test';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die('Подключение не удалось: ' . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из запроса
    $login = $_POST['login'];
    $password = $_POST['password'];

    // Подготавливаем SQL-запрос для поиска пользователя
    $stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login');
    $stmt->execute(['login' => $login]);
    $user = $stmt->fetch();

    // Проверяем, существует ли пользователь
    if ($user) {
        // Проверяем правильность пароля
        if (password_verify($password, $user['password'])) {
            // Авторизация успешна
            $_SESSION['user'] = $user['id']; // Сохраняем идентификатор пользователя в сессии
            echo json_encode(['status' => 'success']);
        } else {
            // Неверный пароль
            echo json_encode(['status' => 'error', 'message' => 'Неверный пароль']);
        }
    } else {
        // Неверный логин
        echo json_encode(['status' => 'error', 'message' => 'Неверный логин']);
    }
}
?>