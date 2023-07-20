-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 19, 2023 at 08:01 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartdawa`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
CREATE TABLE IF NOT EXISTS `doctor` (
  `DoctorID` int NOT NULL AUTO_INCREMENT,
  `DoctorName` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`DoctorID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`DoctorID`, `DoctorName`, `email`, `password`, `role`) VALUES
(1, 'Doctor Tim', 'tim@gmail.com', 'tim', 1);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
CREATE TABLE IF NOT EXISTS `medicine` (
  `MedicineID` int NOT NULL AUTO_INCREMENT,
  `MedicineName` varchar(255) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`MedicineID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`MedicineID`, `MedicineName`, `Quantity`) VALUES
(14, 'Strepsils', 95),
(13, 'Panadol Extra', 9),
(7, 'Panadol Advanced', 34);

-- --------------------------------------------------------

--
-- Table structure for table `pharmacist`
--

DROP TABLE IF EXISTS `pharmacist`;
CREATE TABLE IF NOT EXISTS `pharmacist` (
  `PharmacistID` int NOT NULL AUTO_INCREMENT,
  `PharmacistName` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`PharmacistID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pharmacist`
--

INSERT INTO `pharmacist` (`PharmacistID`, `PharmacistName`, `email`, `password`, `role`) VALUES
(1, 'Pharmacist Sam', 'sam@gmail.com', 'sam', 2);

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
CREATE TABLE IF NOT EXISTS `prescription` (
  `PrescriptionID` int NOT NULL AUTO_INCREMENT,
  `DoctorName` varchar(255) NOT NULL,
  `PatientID` int NOT NULL,
  `MedicineID` int NOT NULL,
  `MedicineName` varchar(255) NOT NULL,
  `Quantity` int NOT NULL,
  `Status` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`PrescriptionID`),
  KEY `DoctorID` (`DoctorName`(250)),
  KEY `PatientID` (`PatientID`),
  KEY `MedicineID` (`MedicineID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`PrescriptionID`, `DoctorName`, `PatientID`, `MedicineID`, `MedicineName`, `Quantity`, `Status`) VALUES
(1, '1', 123, 1, 'Panadol Extra', 3, 'Taken'),
(2, 'Doctor Tim', 123, 1, 'Panadol Extra', 2, 'Taken'),
(3, 'Doctor Tim', 123, 1, 'Panadol Extra', 2, 'Taken'),
(4, 'Doctor Tim', 1234, 1, 'Panadol Extra', 34, 'Taken'),
(5, 'Doctor Tim', 123, 1, 'Panadol Extra', 59, 'Pending'),
(6, '', 0, 3, 'panado updated ', 4, 'Pending'),
(7, '', 34, 14, 'Strepsils', 5, 'Pending');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
