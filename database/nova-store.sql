-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: bqb52b9pxygmuezgqap2-mysql.services.clever-cloud.com    Database: bqb52b9pxygmuezgqap2
-- ------------------------------------------------------
-- Server version	8.0.22-13

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'a05a675a-1414-11e9-9c82-cecd01b08c7e:1-491550428,
a38a16d0-767a-11eb-abe2-cecd029e558e:1-616637656';

--
-- Table structure for table `hist_record`
--

DROP TABLE IF EXISTS `hist_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hist_record` (
  `hist_record_id` int NOT NULL AUTO_INCREMENT,
  `hist_record_order_number` bigint NOT NULL,
  `hist_record_delivery_stimate` date NOT NULL,
  `hist_record_order_date` date NOT NULL,
  `hist_record_item_quantity` int NOT NULL,
  `hist_record_variation_id` int DEFAULT NULL,
  `hist_record_prod_id` int NOT NULL,
  `hist_record_user_id` int NOT NULL,
  `hist_record_shipping_address` varchar(100) NOT NULL,
  `hist_record_payment_method` varchar(45) NOT NULL,
  PRIMARY KEY (`hist_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hist_record`
--

LOCK TABLES `hist_record` WRITE;
/*!40000 ALTER TABLE `hist_record` DISABLE KEYS */;
INSERT INTO `hist_record` VALUES (30,199367411558,'2026-01-01','2025-12-18',2,4,2,14,'das','dsad'),(31,199367411558,'2026-01-01','2025-12-18',2,2,1,14,'das','dsad'),(32,199367411558,'2026-01-01','2025-12-18',1,1,1,14,'das','dsad'),(33,288425315936,'2026-01-01','2025-12-18',1,2,1,14,'das','dsad'),(34,364480377433,'2026-01-19','2026-01-05',1,2,1,14,'das','dsad'),(35,745978302521,'2026-01-19','2026-01-05',3,2,1,14,'das','dsad');
/*!40000 ALTER TABLE `hist_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_cart`
--

DROP TABLE IF EXISTS `prod_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_cart` (
  `prod_cart_id` int NOT NULL AUTO_INCREMENT,
  `prod_cart_quantity` int NOT NULL,
  `prod_cart_prod_variation_id` int DEFAULT NULL,
  `prod_cart_prod_id` int NOT NULL,
  `prod_cart_user_id` int NOT NULL,
  PRIMARY KEY (`prod_cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_cart`
--

LOCK TABLES `prod_cart` WRITE;
/*!40000 ALTER TABLE `prod_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `prod_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_imgs`
--

DROP TABLE IF EXISTS `prod_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_imgs` (
  `prod_imgs_id` int NOT NULL AUTO_INCREMENT,
  `prod_imgs_url` varchar(200) DEFAULT NULL,
  `prod_imgs_prod_id` int NOT NULL,
  `prod_imgs_color` varchar(100) DEFAULT NULL,
  `prod_imgscol_main` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`prod_imgs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_imgs`
--

LOCK TABLES `prod_imgs` WRITE;
/*!40000 ALTER TABLE `prod_imgs` DISABLE KEYS */;
INSERT INTO `prod_imgs` VALUES (1,'images/Earphone_1/Earphone_1_white.jpg',1,'white','1'),(2,'images/Earphone_1/Earphone_2_white.jpg',1,'white',NULL),(3,'images/Earphone_1/Earphone_3_white.jpg',1,'white',NULL),(4,'images/Earphone_1/Earphone_1_blue.jpg',1,'dark-blue','1'),(5,'images/Earphone_1/Earphone_2_blue.jpg',1,'dark-blue',NULL),(6,'images/Earphone_1/Earphone_3_blue.jpg',1,'dark-blue',NULL),(7,'images/Shoes_1/Shoes1_1_black.jpg',2,'black','1'),(8,'images/Shoes_1/Shoes1_2_black.jpg',2,'black',NULL),(9,'images/Shoes_1/Shoes1_3_black.jpg',2,'black',NULL),(10,'images/O-cedar/o-cedar_1.jpg',3,NULL,'1'),(11,'images/O-cedar/o-cedar_2.jpg',3,NULL,NULL),(12,'images/O-cedar/o-cedar_3.jpg',3,NULL,NULL),(13,'images/O-cedar/o-cedar_4.jpg',3,NULL,NULL),(14,'images/Laptop_1/Laptop_1.jpg',4,NULL,'1'),(15,'images/Laptop_1/Laptop_2.jpg',4,NULL,NULL),(16,'images/Laptop_1/Laptop_3.jpg',4,NULL,NULL),(17,'images/Laptop_1/Laptop_4.jpg',4,NULL,NULL),(18,'images/Jordan_1/jordan_1_red_1.jpg',5,'red','1'),(19,'images/Jordan_1/jordan_1_red_2.jpg',5,'red',NULL),(20,'images/Jordan_1/jordan_1_red_3.jpg',5,'red',NULL),(21,'images/Jordan_1/jordan_1_black_1.jpg',5,'black','1'),(22,'images/Jordan_1/jordan_1_black_2.jpg',5,'black',NULL),(23,'images/Jordan_1/jordan_1_black_3.jpg',5,'black',NULL);
/*!40000 ALTER TABLE `prod_imgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_variation`
--

DROP TABLE IF EXISTS `prod_variation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_variation` (
  `prod_variation_id` int NOT NULL AUTO_INCREMENT,
  `prod_variation_pord_id` int NOT NULL,
  `prod_variation_color` varchar(45) DEFAULT NULL,
  `prod_variation_color_style` varchar(100) NOT NULL,
  `prod_variation_size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`prod_variation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_variation`
--

LOCK TABLES `prod_variation` WRITE;
/*!40000 ALTER TABLE `prod_variation` DISABLE KEYS */;
INSERT INTO `prod_variation` VALUES (1,1,'white','bg-white ',NULL),(2,1,'dark-blue','bg-blue-800',NULL),(3,2,'black','bg-black','9'),(4,2,'black','bg-black','8.5'),(5,2,'black','bg-black','8'),(6,2,'black','bg-black','7'),(8,5,'red','bg-red-600','8.5'),(9,5,'red','bg-red-600','8'),(10,5,'black','bg-black','8.5'),(11,5,'black','bg-black','8'),(12,5,'black','bg-black','9');
/*!40000 ALTER TABLE `prod_variation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `products_id` int NOT NULL AUTO_INCREMENT,
  `products_name` varchar(300) NOT NULL,
  `products_description` varchar(500) NOT NULL,
  `products_price` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  `products_highlights` varchar(500) DEFAULT NULL,
  `products_details` varchar(1000) DEFAULT NULL,
  `products_creation_date` datetime DEFAULT NULL,
  `products_category` varchar(45) NOT NULL,
  PRIMARY KEY (`products_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Sony WH‑CH520 Wireless On‑Ear Headphones – Crystal Clear Sound, 50 Hours Playtime','<p>Experience powerful sound and all‑day comfort with the Sony WH‑CH520 Wireless Bluetooth On‑Ear Headphones. Designed for music lovers and multitaskers alike, these headphones deliver clear audio and deep bass in a lightweight, stylish build. With up to 50 hours of battery life and quick charging support, you’ll enjoy uninterrupted listening whether at home, work, or on the go.</p>',000000034.95,'<li>Wireless Bluetooth connectivity for easy pairing</li>','<p>Wireless Bluetooth connectivity for easy pairing with smartphones, tablets, and laptops.</p>','2025-12-07 00:08:56','Technology'),(2,'EverFoams Women’s Soft Curly Full Slippers Memory Foam Lightweight House Shoes Cozy Loafer with Polar Fleece Lining','<p>Experience ultimate comfort at home with the EverFoams Women’s Soft Curly Full Slippers. Designed with lightweight memory foam cushioning and a cozy polar fleece lining, these slippers combine warmth, softness, and support for everyday wear.</p>',000000015.29,'<li>Soft curly fabric exterior for a stylish, cozy look</li><li>Memory foam insole that adapts to your foot shape</li><li>Lightweight design for effortless indoor use</li><li>Polar fleece lining for extra warmth and comfort</li><li>Slip-on loafer style for easy wear</li>','<p>Perfect for lounging, relaxing, or keeping your feet warm during chilly evenings, these slippers are crafted to deliver both comfort and durability. The combination of plush materials and supportive memory foam makes them ideal for daily use around the house.</p>','2025-12-07 12:20:56','Clothing and accessories'),(3,'O-Cedar EasyWring Spin Mop & Bucket System with Foot Pedal | Hands-Free Wringing Microfiber Mop for Hardwood, Tile & Laminate Floors','<p>Keep your floors spotless with the O-Cedar EasyWring Spin Mop & Bucket System. Designed with a convenient foot pedal for hands-free wringing, this microfiber mop delivers deep cleaning power on hardwood, tile, and laminate surfaces while keeping your hands dry and clean.</p>',000000036.88,'<li>Hands-free wringing with easy-to-use foot pedal</li<li>Microfiber mop head removes dirt, dust, and grime effectively</li><li>Safe for hardwood, tile, laminate, and other sealed floors</li><li>Adjustable telescopic handle for comfortable cleaning</li><li>Bucket splash guard prevents mess and keeps water contained</li>','<p>The O-Cedar EasyWring system combines efficiency and convenience, making floor cleaning faster and less tiring. Its microfiber mop head is machine washable and reusable, while the bucket’s splash guard ensures a cleaner experience. Perfect for everyday household cleaning, this system is built to save time and effort.</p>','2025-12-07 13:08:56','Home and decoration'),(4,'18.5 inch Laptop, 2025 Laptop, 16GB RAM 512GB NVMe SSD, Ιntel N150 Processor(Up to 3.6GHz), Laptop Computer, 1080 FHD Display for Business & Students, 8000Mah Battery, Wi-Fi','<p>Upgrade your productivity with the 18.5-inch 2025 Laptop, powered by the Intel N150 processor up to 3.6GHz. Featuring 16GB RAM and a fast 512GB NVMe SSD, this laptop delivers smooth multitasking and reliable performance for business professionals and students alike. The 1080 FHD display ensures crisp visuals, while the lightweight design and long-lasting 8000mAh battery keep you connected wherever you go.</p>',000000000420,'<li>Large 18.5-inch Full HD display</li><li>Intel N150 processor up to 3.6GHz</li><li>16GB RAM for seamless multitasking</li><li>512GB NVMe SSD for fast storage</li><li>8000mAh battery for extended use</li><li>Wi-Fi connectivity for reliable online access</li>','<p>Designed for both work and study, this laptop combines speed, storage, and portability. Its powerful hardware ensures smooth performance across demanding applications, while the durable build and modern design make it a versatile choice for everyday computing needs.</p>','2025-12-07 00:00:56','Technology'),(5,'Nike Men\'s Air Jordan 1 Low Sneaker','<p>The Nike Men’s Air Jordan 1 Low Sneaker blends iconic basketball heritage with modern streetwear style. Inspired by the original 1985 Air Jordan 1, this low‑cut version delivers a sleek silhouette, premium materials, and everyday comfort. Designed for versatility, it transitions seamlessly from the court to casual wear, making it a timeless staple in any sneaker collection.</p>',000000199.99,'<li>Classic Design: Low‑top version of the legendary Air Jordan 1</li><li>Premium Build: Durable leather and synthetic upper for long‑lasting wear</li><li>Comfort First: Cushioned midsole with Air‑Sole unit for lightweight impact protection</li><li>Traction Ready: Rubber outsole with pivot‑point tread for grip and stability</li><li>Style Versatility: Pairs effortlessly with athletic or casual outfits</li>','<p>Crafted with a combination of genuine leather, synthetic overlays, and textile materials, the upper ensures durability and support while maintaining a premium look. The encapsulated Air‑Sole cushioning in the midsole delivers responsive comfort and lightweight impact protection. A solid rubber outsole with a classic circular traction pattern provides multidirectional grip and stability. The low‑cut collar design allows natural ankle movement and creates a streamlined silhouette that enhances both performance and style. Iconic Nike Swoosh and Jumpman logo details reinforce its authentic Jordan heritage, making it perfect for basketball fans, sneaker collectors, and everyday wearers seeking a versatile shoe that blends performance with fashion.</p>','2025-12-07 00:00:56','Clothing and accessories');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_coments`
--

DROP TABLE IF EXISTS `products_coments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_coments` (
  `products_coments_id` int NOT NULL AUTO_INCREMENT,
  `products_coments_text` varchar(1000) NOT NULL,
  `products_coments_rate` int NOT NULL,
  `products_coments_date` date NOT NULL,
  `products_coments_prod_id` int NOT NULL,
  `products_coments_user` int NOT NULL,
  PRIMARY KEY (`products_coments_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_coments`
--

LOCK TABLES `products_coments` WRITE;
/*!40000 ALTER TABLE `products_coments` DISABLE KEYS */;
INSERT INTO `products_coments` VALUES (1,'<p>I recently tried the Sony WH‑CH520 Wireless On‑Ear Headphones and I have to say they deliver an impressive balance of comfort, performance, and durability. The first thing that stood out to me was the sound quality—crystal clear across all ranges, with crisp highs and deep, well‑defined bass that makes music, podcasts, and even calls feel immersive. Despite being lightweight and compact, the headphones feel sturdy and well‑built, making them perfect for daily use whether at home, commuting, or working.</p>',4,'2025-12-07',1,1),(2,'<p>I\'ve been using the Sony WH-CH520 headphones for a couple of weeks now, and I am incredibly impressed with the value they offer.</p>',5,'2025-12-07',1,5),(3,'dsad',2,'2025-12-18',1,14),(4,'DASDS',4,'2025-12-18',1,14),(5,'This is the best articule ever\n',4,'2025-12-18',1,14),(6,'This is the best articule ever\n\ncxcxcxzcz',4,'2025-12-18',1,14),(7,'This is the best articule ever\n\ncxcxcxzcz',3,'2025-12-18',1,14),(8,'dasda',0,'2025-12-18',1,14),(9,'dasdasd\n\n\ndfdsfdsf',4,'2025-12-18',1,14),(10,'This the grather item i ever \n\n100% recommended.\n\nI use it all the the and it is wonder full\n',4,'2025-12-18',1,14),(11,'Good',5,'2025-12-18',4,14),(12,'Bad',0,'2025-12-18',4,14),(13,'weqwe',3,'2026-01-05',1,14),(14,'dsadasd',0,'2026-01-05',1,14),(15,'dsdsada',4,'2026-01-05',1,14);
/*!40000 ALTER TABLE `products_coments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `users_id` int NOT NULL AUTO_INCREMENT,
  `users_img` varchar(100) NOT NULL,
  `users_name` varchar(100) NOT NULL,
  `users_last_name` varchar(45) NOT NULL,
  `users_email` varchar(45) NOT NULL,
  `users_password` varchar(200) NOT NULL,
  `users_address` varchar(100) NOT NULL,
  `users_postal_code` varchar(45) DEFAULT NULL,
  `users_phone_number` varchar(45) DEFAULT NULL,
  `users_credit-card` varchar(45) NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `users_email_UNIQUE` (`users_email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Christopher','Deyvid Gabriel','Marmolejo','cunglaoboot2@gmail.com','$2b$10$Pd3NvJjGPe58ifYsGs9yzO7AHP0Kox/9VbET76AMi8PWYBQJ22wYe','das','dsad','dsadsa','dsad'),(20,'https://api.dicebear.com/9.x/avataaars/svg?seed=Ryker','Prueba','Nueva','prueba@gamil.com','$2b$10$TJACvgxR76MaErZ7nVFPOOFISXYdL9wBgnvwJVllWZXC2LGHJQ/ZO','dddddddddddddddddddddd','11111111111111111','1111111111111111111','11111111111111111111');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-07 15:28:19
