<?php

$dsn = "mysql:host=" . $_ENV["MYSQLHOST"] . ";dbname=" . $_ENV["MYSQLDATABASE"] . ";port=" . $_ENV["MYSQLPORT"] . ";charset=utf8mb4";
$username = $_ENV["MYSQLUSER"];
$password = $_ENV["MYSQLPASSWORD"];

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connessione al database fallita.");
}
?>