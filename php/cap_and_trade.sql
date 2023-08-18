-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 18, 2023 at 09:41 AM
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
-- Database: `cap_and_trade`
--

-- --------------------------------------------------------

--
-- Table structure for table `emissions_market`
--

DROP TABLE IF EXISTS `emissions_market`;
CREATE TABLE IF NOT EXISTS `emissions_market` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `emissions_market`
--

INSERT INTO `emissions_market` (`id`, `userId`, `quantity`, `price`, `date`) VALUES
(2, 10, 20, 300, '2023-08-17 15:31:14'),
(6, 6, 1, 1, '2023-08-18 04:25:23'),
(7, 6, 10, 30, '2023-08-18 04:27:04'),
(8, 6, 1, 23, '2023-08-18 04:30:45'),
(9, 10, 100, 100, '2023-08-18 05:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
CREATE TABLE IF NOT EXISTS `production` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity_0` double DEFAULT NULL,
  `quantity_1` double DEFAULT NULL,
  `price_0` double DEFAULT NULL,
  `price_1` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_saves`
--

DROP TABLE IF EXISTS `user_saves`;
CREATE TABLE IF NOT EXISTS `user_saves` (
  `id` int NOT NULL,
  `node_graph` json DEFAULT NULL,
  `research_trees` json DEFAULT NULL,
  `currency` double DEFAULT NULL,
  `research` double DEFAULT NULL,
  `curr_emissions` double DEFAULT NULL,
  `emissions_cap` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_saves`
--

INSERT INTO `user_saves` (`id`, `node_graph`, `research_trees`, `currency`, `research`, `curr_emissions`, `emissions_cap`) VALUES
(6, '[{\"x\": 1038.4187438534204, \"y\": 677.658170371868, \"id\": \"mammal\", \"vx\": -0.0002925033993876266, \"vy\": -0.00005141932782565164, \"cost\": 100, \"type\": 0, \"index\": 0, \"label\": \"Mammals\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": false, \"emissions\": 30}, {\"x\": 916.9011308389998, \"y\": 736.1294138276508, \"id\": \"dog\", \"vx\": -0.00046911132842610264, \"vy\": 0.000033428446501760416, \"cost\": 100, \"type\": 0, \"index\": 1, \"label\": \"Dogs\", \"level\": 1, \"yield\": 2, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 867.5355176040293, \"y\": 620.3234478357905, \"id\": \"cat\", \"vx\": -0.00021660233586316588, \"vy\": -0.0003691779820943295, \"cost\": 200, \"type\": 1, \"index\": 2, \"label\": \"Cats\", \"level\": 1, \"yield\": 5, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 1139.051242892283, \"y\": 774.4895536706671, \"id\": \"fox\", \"vx\": -0.000002005500636078619, \"vy\": -0.0006652676743330615, \"cost\": 100, \"type\": 0, \"index\": 3, \"label\": \"Foxes\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 1005.8730415358372, \"y\": 589.4557468297515, \"id\": \"elk\", \"vx\": -0.00013278103619533517, \"vy\": -0.0001078951974599863, \"cost\": 100, \"type\": 1, \"index\": 4, \"label\": \"Elk\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": false, \"emissions\": 30}, {\"x\": 1132.8418214454382, \"y\": 326.7840053218322, \"id\": \"insect\", \"vx\": -0.0005240732979161952, \"vy\": -0.0008933013872660266, \"cost\": 100, \"type\": 1, \"index\": 5, \"label\": \"Insects\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 1209.845519318274, \"y\": 868.1335166532358, \"id\": \"ant\", \"vx\": 0.000556749546835106, \"vy\": -0.0011541504979614978, \"cost\": 200, \"type\": 0, \"index\": 6, \"label\": \"Ants\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 1050.1159745904893, \"y\": 465.0671715253665, \"id\": \"bee\", \"vx\": 0.00006487889171069206, \"vy\": -0.0002468263171313819, \"cost\": 200, \"type\": 1, \"index\": 7, \"label\": \"Bees\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 724.8263374209079, \"y\": 798.0074111753362, \"id\": \"fish\", \"vx\": -0.0018403378539312584, \"vy\": -0.0014468267244713798, \"cost\": 100, \"type\": 2, \"index\": 8, \"label\": \"Fish\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 799.5872682172205, \"y\": 718.946374548178, \"id\": \"pike\", \"vx\": -0.0005464967854929565, \"vy\": -0.0002868036614456722, \"cost\": 100, \"type\": 2, \"index\": 9, \"label\": \"Pikes\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}]', '{\"id\": \"1\", \"cost\": \"\", \"name\": \"\", \"type\": \"display\", \"locked\": false, \"children\": [{\"id\": \"2\", \"cost\": \"\", \"name\": \"Production\", \"type\": \"display\", \"locked\": false, \"children\": [{\"id\": \"prod-1\", \"cost\": 5, \"name\": \"Production Type 1\", \"type\": \"production\", \"locked\": false, \"multiplier\": 1.1, \"description\": \"Produce 10% more of good A.\"}, {\"id\": \"prod-2\", \"cost\": 5, \"name\": \"Production Type 2\", \"type\": \"production\", \"locked\": true, \"multiplier\": 1.1, \"description\": \"Produce 10% more of good B.\"}, {\"id\": \"prod-3\", \"cost\": 7.5, \"name\": \"Research Mandates\", \"type\": \"production\", \"locked\": true, \"children\": [{\"id\": \"prod-4\", \"cost\": 10, \"name\": \"Research Mandates II\", \"type\": \"production\", \"locked\": true, \"multiplier\": 1.15, \"description\": \"Produce an additional 10% more research points.\"}], \"multiplier\": 1.15, \"description\": \"Produce 15% more research points.\"}]}, {\"id\": \"3\", \"cost\": \"\", \"name\": \"Emissions\", \"type\": \"display\", \"locked\": false, \"children\": [{\"id\": \"emis-1\", \"cost\": 10, \"name\": \"Clean Production\", \"type\": \"emissions\", \"locked\": true, \"multiplier\": 0.8, \"description\": \"Lower emissions caused by production by 20%.\"}, {\"id\": \"emis-2\", \"cost\": 10, \"name\": \"Lobby Government\", \"type\": \"emissions\", \"locked\": true, \"children\": [{\"id\": \"emis-3\", \"cost\": 15, \"name\": \"R&D Allowances\", \"type\": \"emissions\", \"locked\": true, \"multiplier\": 0.4, \"description\": \"Lower emissions of all research nodes by 60%.\"}], \"multiplier\": 0.5, \"description\": \"Reduce the fine for exceeding emissions limits by 50%.\"}]}, {\"id\": \"4\", \"cost\": \"\", \"name\": \"Selling\", \"type\": \"display\", \"locked\": false, \"children\": [{\"id\": \"sell-1\", \"cost\": 5, \"name\": \"Quality goods\", \"type\": \"selling\", \"locked\": false, \"children\": [{\"id\": \"sell-2\", \"cost\": 10, \"name\": \"Quality Type A\", \"type\": \"selling\", \"locked\": true, \"multiplier\": 1.2, \"description\": \"Goods of type A sell for 20% more.\"}, {\"id\": \"sell-3\", \"cost\": 10, \"name\": \"Quality Type B\", \"type\": \"selling\", \"locked\": true, \"multiplier\": 1.2, \"description\": \"Goods of type B sell for 20% more.\"}], \"multiplier\": 1.1, \"description\": \"All goods sell for 10% more.\"}]}]}', 900, 0, 0, 200);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
