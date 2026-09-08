<?php
header("Access-Control-Allow-Origin: https://bettracker0.netlify.app");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$data = file_get_contents("php://input");
$prediction = json_decode($data);

$fields = ["sport", "event", "prediction", "analysis", "odds", "eventDate"];

foreach ($fields as $field) {
    if (empty($prediction->$field)) {
        echo "Tutti i campi sono obbligatori";
        exit;
    }
}


if ($_SESSION["user_role"] !== "tipster") {
    echo "Accesso negato";
    exit;
}

require_once __DIR__ . "/config.php";

try {
    $sql = "INSERT INTO predictions (
    user_id,
    sport,
    event,
    prediction,
    analysis,
    odds,
    event_date,
    status)
    VALUES (
    :user_id,
    :sport,
    :event,
    :prediction,
    :analysis,
    :odds,
    :event_date,
    :status
    )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":user_id" => $_SESSION["user_id"],
        ":sport" => $prediction->sport,
        ":event" => $prediction->event,
        ":prediction" => $prediction->prediction,
        ":analysis" => $prediction->analysis,
        ":odds" => $prediction->odds,
        ":event_date" => $prediction->eventDate,
        ":status" => "Pending"
    ]);

    echo "Prediction creata";
} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>