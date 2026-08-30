-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ago 30, 2026 alle 19:12
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bettracker`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `predictions`
--

CREATE TABLE `predictions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sport` varchar(50) NOT NULL,
  `event` varchar(255) NOT NULL,
  `prediction` varchar(255) NOT NULL,
  `analysis` text DEFAULT NULL,
  `odds` decimal(5,2) NOT NULL,
  `event_date` datetime NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `predictions`
--

INSERT INTO `predictions` (`id`, `user_id`, `sport`, `event`, `prediction`, `analysis`, `odds`, `event_date`, `status`, `created_at`) VALUES
(1, 1, 'Football', 'Inter - Milan', 'Over 2.5', 'Entrambe le squadre sono in ottima forma', 2.10, '2026-09-05 20:45:00', 'Pending', '2026-08-30 15:42:26'),
(2, 1, 'Basketball', 'Lakers - Warriors', 'Over 215.5', 'Entrambe le squadre hanno un buon rendimento offensivo', 1.85, '2026-09-20 21:00:00', 'Pending', '2026-08-30 16:16:21'),
(3, 2, 'Football', 'Juventus - Napoli', 'Over 2.5', 'Le due squadre hanno mostrato una buona propensione offensiva nelle ultime partite', 1.90, '2026-09-25 20:45:00', 'Pending', '2026-08-30 16:19:14'),
(4, 2, 'Tennis', 'Sinner - Alcaraz', 'Sinner vincente', 'Sinner ha mostrato grande continuità e solidità nei match recenti', 2.00, '2026-09-28 18:00:00', 'Pending', '2026-08-30 16:20:50');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Tina', 'tina@gmail.com', '$2y$10$EixJvnLUryWHPB6nYVZbHuN.n4qkGS/YtHT9G0UQWmKYh5mafHeK.', 'tipster', '2026-08-30 15:03:38'),
(2, 'Mark', 'mark@gmail.com', '$2y$10$JrtcEOOwJvXW5rGeIKp2kuyloBeneLZzmo2Lw2gY6ABrrzfhCgPmG', 'tipster', '2026-08-30 15:04:53'),
(3, 'Andrea', 'andrea@gmail.com', '$2y$10$xU3pLfHL3zOoxFuocMxZ/eJHSubdV8PpXJtFoaZC0ZLLf9aQ9AnTG', 'user', '2026-08-30 15:31:18');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_predictions_users` (`user_id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `predictions`
--
ALTER TABLE `predictions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `predictions`
--
ALTER TABLE `predictions`
  ADD CONSTRAINT `fk_predictions_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
