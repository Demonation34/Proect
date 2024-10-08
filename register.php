<?php
session_start();
$host = 'example.local'; // измените на ваше имя хоста
$db = 'test'; // имя вашей базы данных
$user = 'root'; // имя пользователя базы данных
$pass = ''; // пароль к базе данных

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

// Указываем, что ответ будет в формате JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['regname'];
    $password = $_POST['regpass'];
    $confirmPassword = $_POST['reregpass'];

    // Проверяем, совпадают ли пароли
    if ($password !== $confirmPassword) {
        echo json_encode(['status' => 'error', 'message' => 'Пароли не совпадают']);
        exit;
    }

    // Проверяем, существует ли уже пользователь с таким логином
    $stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login');
    $stmt->execute(['login' => $login]);
    $existingUser = $stmt->fetch();

    if ($existingUser) {
        echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким логином уже существует']);
        exit;
    }

    // Хэшируем пароль
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Сохраняем нового пользователя в базе данных
    $stmt = $pdo->prepare('INSERT INTO users (login, password) VALUES (:login, :password)');
    $stmt->execute(['login' => $login, 'password' => $hashedPassword]);

    echo json_encode(['status' => 'success', 'message' => 'Регистрация успешна']);
}
?>
