CREATE DATABASE  IF NOT EXISTS `mini_wallet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mini_wallet`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: mini_wallet
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `reference_id` varchar(45) NOT NULL,
  `amount` int NOT NULL,
  `type` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference_id_UNIQUE` (`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (2,7,'ea021233-abd6-ab6f-8c67-868e814a2abc',10000,1,NULL,NULL),(3,7,'50535246-dcb2-4929-8cc9-004ea06f5241',888888,1,'2023-02-15 16:41:20','2023-02-15 16:41:20'),(5,7,'50535246-dcb2-4929-8cc9-004ea06f5242',888888,1,'2023-02-15 16:42:45','2023-02-15 16:42:45'),(6,7,'50535246-dcb2-4929-8cc9-004ea06f5243',-888888,2,'2023-02-15 16:44:02','2023-02-15 16:44:02'),(8,7,'50535246-dcb2-4929-8cc9-004ea06f5244',-888888,2,'2023-02-15 16:44:35','2023-02-15 16:44:35'),(10,7,'50535246-dcb2-4929-8cc9-004ea06f5245',777777,1,'2023-02-15 16:45:58','2023-02-15 16:45:58'),(12,7,'50535246-dcb2-4929-8cc9-004ea06f5246',777777,1,'2023-02-15 16:47:54','2023-02-15 16:47:54'),(13,7,'50535246-dcb2-4929-8cc9-004ea06f5247',-777777,2,'2023-02-15 16:48:19','2023-02-15 16:48:19'),(15,9,'50535246-dcb2-4929-8cc9-004ea06f5250',777777,1,'2023-02-15 23:32:34','2023-02-15 23:32:34'),(16,9,'50535246-dcb2-4929-8cc9-004ea06f5251',-777771,2,'2023-02-15 23:33:25','2023-02-15 23:33:25');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 15:46:31
