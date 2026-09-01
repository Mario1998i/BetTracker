<?php
header("Access-Control-Allow-Origin: https://bettracker0.netlify.app");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

if (isset($_SESSION["user_id"])) {
    echo "Loggato";
} else {
    echo "Non loggato";
}
?>