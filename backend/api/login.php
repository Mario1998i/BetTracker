<?php
header("Access-Control-Allow-Origin: https://bettracker0.netlify.app");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$data = file_get_contents("php://input");

$user = json_decode($data);

require_once __DIR__ . "/config.php";

try {
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([
        ":email" => $user->email
    ]);

    $userDb = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userDb) {
        echo json_encode([
            "message" => "Utente non trovato"
        ]);
        exit;
    }

    if(password_verify($user->password, $userDb["password"])) {
        $_SESSION["user_id"] = $userDb["id"];
        $_SESSION["user_role"] = $userDb["role"];
        echo json_encode([
            "message" => "Login effettuato",
            "role" => $userDb["role"]
        ]);
    } else {
        echo json_encode([
            "message" => "Password errata"
        ]);
    }
} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>