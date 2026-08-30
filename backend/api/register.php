<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$data = file_get_contents("php://input");

$user = json_decode($data);



$dsn = "mysql:host=localhost;dbname=bettracker";
$username = "root";
$password = "";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":email" => $user->email
    ]);

    if ($stmt->fetch()) {
        echo "Email già registrata";
        exit;
    }

    if ($user->role !== "user" && $user->role !== "tipster") {
        echo "Ruolo non valido";
        exit;
    }

    $passwordHash = password_hash($user->password, PASSWORD_DEFAULT);


    $sql = "INSERT INTO users (username, email, password, role)
    VALUES (:username, :email, :password, :role)";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":username" => $user->username,
        ":email" => $user->email,
        ":password" => $passwordHash,
        ":role" => "$user->role"
    ]);

    echo "Utente registrato";

} catch (PDOException $e) {
    echo "Connessione fallita " . $e->getMessage();
}


?>