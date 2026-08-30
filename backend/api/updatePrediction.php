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

if (
    empty($prediction->sport) ||
    empty($prediction->event) ||
    empty($prediction->prediction) ||
    empty($prediction->analysis) ||
    empty($prediction->odds) ||
    empty($prediction->eventDate)
    ) {
        echo "Compila tutti i campi";
        exit;
    }

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

    $sql = "UPDATE predictions
    SET
    sport = :sport,
    event = :event,
    prediction = :prediction,
    analysis = :analysis,
    odds = :odds,
    event_date = :event_date
    WHERE id = :id AND user_id = :user_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":sport" => $prediction->sport,
        ":event" => $prediction->event,
        ":prediction" => $prediction->prediction,
        ":analysis" => $prediction->analysis,
        ":odds" => $prediction->odds,
        ":event_date" => $prediction->eventDate,
        ":id" => $prediction->id,
        "user_id" => $_SESSION["user_id"]
    ]);

    echo "Prediction aggiornata";
} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>