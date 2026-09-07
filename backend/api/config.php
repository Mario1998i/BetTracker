<?php

$dsn = "mysql:host=" . getenv("MYSQLHOST") . ";dbname=" . getenv("MYSQLDATABASE") . ";port=" . getenv("MYSQLPORT") . ";charset=utf8mb4";
$username = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connessione al database fallita.");
}
?>