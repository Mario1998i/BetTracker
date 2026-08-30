<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$dsn = "mysql:host=localhost;dbname=bettracker";
$username = "root";
$password = "";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM predictions WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":user_id" => $_SESSION["user_id"]
    ]);
    
    $predictions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($predictions);
} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>