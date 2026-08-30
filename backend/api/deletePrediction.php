<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$data = file_get_contents("php://input");
$prediction = json_decode($data);

if ($_SESSION["user_role"] !== "tipster") {
    echo "Accesso negato";
    exit;
}

$dsn = "mysql:host=localhost;dbname=bettracker";
$username = "root";
$password = "";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "DELETE FROM predictions WHERE id = :id AND user_id = :user_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":id" => $prediction->id,
        ":user_id" => $_SESSION["user_id"]
    ]);

    echo "Prediction eliminata";
} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>