<?php
session_start();
$host = 'example.local';
$db = 'BD';
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
    die(json_encode(['status' => 'error', 'message' => 'Ошибка подключения к базе данных']));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare('SELECT * FROM `Персона` WHERE login = :login');
    $stmt->execute(['login' => $login]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['id'];

        // Сохранение ID в JSON-файл
        $data = ['персона_id' => $user['id']];
        file_put_contents('user_data.json', json_encode($data, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'id' => $user['id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Неверный логин или пароль']);
    }
}
?>
