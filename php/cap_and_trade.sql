-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 14, 2023 at 02:46 PM
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

--
-- Dumping data for table `production`
--

INSERT INTO `production` (`id`, `date`, `quantity_0`, `quantity_1`, `price_0`, `price_1`) VALUES
(12, '2023-08-09 19:53:16', 5, 8, 7.3497700167819, 5.8146152348791),
(11, '2023-08-09 19:53:02', 5, 8, 5.7879154738215, 3.8999332941137);

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
(3, '[{\"x\": 795.6317064267531, \"y\": 373.47667406358306, \"id\": \"mammal\", \"vx\": 0.0005835565771910363, \"vy\": -0.00010876065419322048, \"cost\": 100, \"type\": 0, \"index\": 0, \"label\": \"Mammals\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 675.7343146913286, \"y\": 446.79376197326553, \"id\": \"dog\", \"vx\": 0.001793040455563858, \"vy\": -0.004983991440812687, \"cost\": 100, \"type\": 0, \"index\": 1, \"label\": \"Dogs\", \"level\": 1, \"yield\": 2, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 649.5731461616587, \"y\": 317.4675793982423, \"id\": \"cat\", \"vx\": -0.0024219617907077187, \"vy\": -0.0010463430111126654, \"cost\": 200, \"type\": 1, \"index\": 2, \"label\": \"Cats\", \"level\": 1, \"yield\": 5, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 888.1205767257206, \"y\": 498.5816039108421, \"id\": \"fox\", \"vx\": 0.0005449175545147515, \"vy\": -0.001462077189621924, \"cost\": 100, \"type\": 0, \"index\": 3, \"label\": \"Foxes\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 762.8932131781984, \"y\": 277.2535388743568, \"id\": \"elk\", \"vx\": 0.0007601829554987717, \"vy\": 0.0004106690728449842, \"cost\": 100, \"type\": 1, \"index\": 4, \"label\": \"Elk\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 914.9545063326348, \"y\": 83.97496223316057, \"id\": \"insect\", \"vx\": -0.0007792685421989556, \"vy\": -0.0036087985527348382, \"cost\": 100, \"type\": 1, \"index\": 5, \"label\": \"Insects\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 928.2687151256569, \"y\": 618.7216955153782, \"id\": \"ant\", \"vx\": 0.001969301119034004, \"vy\": -0.0021288157528654163, \"cost\": 200, \"type\": 0, \"index\": 6, \"label\": \"Ants\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 777.615969359214, \"y\": 148.00768494366133, \"id\": \"bee\", \"vx\": 0.0018373980668726412, \"vy\": -0.00006653665827304676, \"cost\": 200, \"type\": 1, \"index\": 7, \"label\": \"Bees\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 688.735373321182, \"y\": 507.8346462758748, \"id\": \"fish\", \"vx\": -0.00943849184802606, \"vy\": 0.004252730091693215, \"cost\": 100, \"type\": 2, \"index\": 8, \"label\": \"Fish\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 598.463497227259, \"y\": 422.8791227231435, \"id\": \"pike\", \"vx\": -0.003830124940701802, \"vy\": 0.000011835603676662242, \"cost\": 100, \"type\": 2, \"index\": 9, \"label\": \"Pikes\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}]', '{\"id\": \"a\", \"cost\": 5, \"name\": \"Eve\", \"type\": \"black\", \"level\": \"yellow\", \"value\": 15, \"locked\": false, \"children\": [{\"id\": \"b\", \"cost\": 5, \"name\": \"Seth\", \"type\": \"grey\", \"level\": \"red\", \"value\": 10, \"locked\": true, \"children\": [{\"id\": \"c\", \"cost\": 5, \"name\": \"Enos\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true}, {\"id\": \"d\", \"cost\": 5, \"name\": \"Noam\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true, \"children\": [{\"id\": \"e\", \"cost\": 5, \"name\": \"Noam\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true, \"children\": [{\"id\": \"f\", \"cost\": 5, \"name\": \"Noam\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true}]}]}]}, {\"id\": \"g\", \"cost\": 5, \"name\": \"Abel\", \"type\": \"grey\", \"level\": \"blue\", \"value\": 10, \"locked\": true}, {\"id\": \"h\", \"cost\": 5, \"name\": \"Awan\", \"type\": \"grey\", \"level\": \"green\", \"value\": 10, \"locked\": true, \"children\": [{\"id\": \"i\", \"cost\": 5, \"name\": \"Enoch\", \"type\": \"grey\", \"level\": \"orange\", \"value\": 7.5, \"locked\": true}]}]}', 1216.3199550656, 10, 90, 1450),
(2, '[{\"x\": 822.6893311434867, \"y\": 394.879661312469, \"id\": \"mammal\", \"vx\": 0.00021987707733496476, \"vy\": -0.00037870691660321106, \"cost\": 100, \"type\": 0, \"index\": 0, \"label\": \"Mammals\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 705.5424757588598, \"y\": 475.5572558652392, \"id\": \"dog\", \"vx\": 0.00014584822849928012, \"vy\": -0.00046312605901552246, \"cost\": 100, \"type\": 0, \"index\": 1, \"label\": \"Dogs\", \"level\": 1, \"yield\": 2, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 654.3960048225648, \"y\": 361.2549577176816, \"id\": \"cat\", \"vx\": -0.00012989839231681273, \"vy\": -0.0006327463752864855, \"cost\": 200, \"type\": 1, \"index\": 2, \"label\": \"Cats\", \"level\": 1, \"yield\": 5, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 932.436371601751, \"y\": 476.0131225156285, \"id\": \"fox\", \"vx\": 0.0002837231070488933, \"vy\": -0.000578003269383177, \"cost\": 100, \"type\": 0, \"index\": 3, \"label\": \"Foxes\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 786.2812907432314, \"y\": 304.9591779358337, \"id\": \"elk\", \"vx\": 0.000001992277805348884, \"vy\": -0.00036977243753533206, \"cost\": 100, \"type\": 1, \"index\": 4, \"label\": \"Elk\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 859.9055349724472, \"y\": -22.32943962713427, \"id\": \"insect\", \"vx\": -0.0004283474903252476, \"vy\": 0.0017431742144823606, \"cost\": 100, \"type\": 1, \"index\": 5, \"label\": \"Insects\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 1020.7180769898026, \"y\": 549.1174958303031, \"id\": \"ant\", \"vx\": 0.0002556112419455621, \"vy\": -0.0005678764198672197, \"cost\": 200, \"type\": 0, \"index\": 6, \"label\": \"Ants\", \"level\": 1, \"yield\": 1, \"locked\": true, \"enabled\": true, \"emissions\": 30}, {\"x\": 820.1982826455637, \"y\": 164.52662051417718, \"id\": \"bee\", \"vx\": -0.0001459243721411284, \"vy\": -0.000003634249016223705, \"cost\": 200, \"type\": 1, \"index\": 7, \"label\": \"Bees\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 490.3214460281367, \"y\": 523.429112562443, \"id\": \"fish\", \"vx\": -0.00016732788717750287, \"vy\": -0.00031628208288787764, \"cost\": 100, \"type\": 2, \"index\": 8, \"label\": \"Fish\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}, {\"x\": 587.5111162746202, \"y\": 467.5900330838073, \"id\": \"pike\", \"vx\": -0.00010457332539333088, \"vy\": -0.0004353159564354552, \"cost\": 100, \"type\": 2, \"index\": 9, \"label\": \"Pikes\", \"level\": 1, \"yield\": 1, \"locked\": false, \"enabled\": true, \"emissions\": 30}]', '{\"id\": \"a\", \"cost\": 5, \"name\": \"Eve\", \"type\": \"black\", \"level\": \"yellow\", \"value\": 15, \"locked\": false, \"children\": [{\"id\": \"b\", \"cost\": 5, \"name\": \"Seth\", \"type\": \"grey\", \"level\": \"red\", \"value\": 10, \"locked\": true, \"children\": [{\"id\": \"c\", \"cost\": 5, \"name\": \"Enos\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true}, {\"id\": \"d\", \"cost\": 5, \"name\": \"Noam\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true, \"children\": [{\"id\": \"e\", \"cost\": 5, \"name\": \"Noam\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true, \"children\": [{\"id\": \"f\", \"cost\": 5, \"name\": \"Noam\", \"type\": \"grey\", \"level\": \"purple\", \"value\": 7.5, \"locked\": true}]}]}]}, {\"id\": \"g\", \"cost\": 5, \"name\": \"Abel\", \"type\": \"grey\", \"level\": \"blue\", \"value\": 10, \"locked\": true}, {\"id\": \"h\", \"cost\": 5, \"name\": \"Awan\", \"type\": \"grey\", \"level\": \"green\", \"value\": 10, \"locked\": true, \"children\": [{\"id\": \"i\", \"cost\": 5, \"name\": \"Enoch\", \"type\": \"grey\", \"level\": \"orange\", \"value\": 7.5, \"locked\": true}]}]}', 239.38688239241, 68, 210, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
