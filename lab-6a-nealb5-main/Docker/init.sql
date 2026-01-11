GRANT ALL PRIVILEGES ON *.* TO 'developer'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 15, 2023 at 09:29 PM
-- Server version: 11.0.2-MariaDB-1:11.0.2+maria~ubu2204
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab_6`
--

-- --------------------------------------------------------

--
-- Table structure for table `BasketItems`
--

CREATE TABLE `BasketItems` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BasketItems`
--

INSERT INTO `BasketItems` (`id`, `userId`, `ProductId`, `quantity`) VALUES
(105, 1, 2, 2),
(106, 1, 5, 1),
(107, 1, 8, 1),
(108, 4, 9, 10),
(109, 2, 4, 1),
(110, 2, 5, 1),
(111, 2, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `CustomerFeedback`
--

CREATE TABLE `CustomerFeedback` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `feedback` text NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CustomerFeedback`
--

INSERT INTO `CustomerFeedback` (`id`, `userId`, `author`, `feedback`, `rating`, `created_at`, `updated_at`) VALUES
(1, 2, 'jarbie', 'mesa like it', 5, '2023-08-09 21:56:27', '2023-08-15 21:04:06'),
(9, 4, 'vader', 'i find your lack of security disturbing', 1, '2023-08-15 21:15:40', '2023-08-15 21:15:40');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `name`, `description`, `price`, `image_url`) VALUES
(1, 'Apple Juice', 'Refreshing and classic apple juice', 2.50, 'apple_juice.jpg'),
(2, 'Orange Juice', 'Thirst quenching orange juice', 2.50, 'orange_juice.jpg'),
(3, 'Carrot Juice', 'Mmmmm carrot juice', 1.20, 'carrot_juice.jpeg'),
(4, 'Apples', 'Crunchy and sweet apples', 0.80, 'apple_pressings.jpg'),
(5, 'Eggfruit Juice', 'Wow who would have guessed?', 0.60, 'eggfruit_juice.jpg'),
(6, 'Banana Juice', 'Delicious and refreshing banana juice', 2.50, 'banana_juice.jpg'),
(7, 'Green Smoothie', 'Scrumptious green liquids!', 3.50, 'green_smoothie.jpg'),
(8, 'Strawberry Juice', 'Aguas frescas strawberry fresh waters', 10.00, 'strawberry_juice.jpeg'),
(9, 'Duck', 'Just a cute ducky. Very reasonably priced', 10000000.00, 'cute_duck.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ProfilePictures`
--

CREATE TABLE `ProfilePictures` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `filePath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ProfilePictures`
--

INSERT INTO `ProfilePictures` (`id`, `userId`, `filePath`) VALUES
(1, 1, '/public/uploads/admin-profile-pic.jpg'),
(2, 2, '/public/uploads/jarbie.jpeg'),
(3, 3, '/public/uploads/default-profile-pic.jpg'),
(4, 4, '/public/uploads/vader.jpg'),
(6, 23, '/public/uploads/default-profile-pic.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Reviews`
--

CREATE TABLE `Reviews` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `review` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserAddresses`
--

CREATE TABLE `UserAddresses` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `UserAddresses`
--

INSERT INTO `UserAddresses` (`id`, `userId`, `street`, `city`, `state`, `zip`, `country`) VALUES
(5, 2, '333 Continental Boulevard', 'El Segundo', 'CA', '90245', 'United States'),
(6, 4, '38°3′43″N 122°38′38″W', 'Novato', 'California', '12345', 'United States');

-- --------------------------------------------------------

--
-- Table structure for table `UserPaymentMethods`
--

CREATE TABLE `UserPaymentMethods` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `cardHolderName` varchar(255) DEFAULT NULL,
  `cardNumber` varchar(255) DEFAULT NULL,
  `cvv` int(11) DEFAULT NULL,
  `expiryMonth` int(11) DEFAULT NULL,
  `expiryYear` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `UserPaymentMethods`
--

INSERT INTO `UserPaymentMethods` (`id`, `userId`, `cardHolderName`, `cardNumber`, `cvv`, `expiryMonth`, `expiryYear`) VALUES
(3, 2, 'Jarbie Binks', '4539966583044411', 399, 3, 2031),
(4, 4, 'Darth Vader', '4716646733502030', 549, 7, 2029);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `role`, `isActive`) VALUES
(1, 'admin', 'admin@admin.com', 'password', 'admin', 0),
(2, 'jarbie', 'jarbie@user.com', 'itsajarbieworld', 'user', 0),
(3, 'jarom', 'jarom@admin.com', 'password', 'admin', 1),
(4, 'vader', 'vader@user.com', 'starwars', 'user', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BasketItems`
--
ALTER TABLE `BasketItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BasketId` (`userId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `CustomerFeedback`
--
ALTER TABLE `CustomerFeedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ProfilePictures`
--
ALTER TABLE `ProfilePictures`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `UserAddresses`
--
ALTER TABLE `UserAddresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `UserPaymentMethods`
--
ALTER TABLE `UserPaymentMethods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BasketItems`
--
ALTER TABLE `BasketItems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `CustomerFeedback`
--
ALTER TABLE `CustomerFeedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ProfilePictures`
--
ALTER TABLE `ProfilePictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `UserAddresses`
--
ALTER TABLE `UserAddresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `UserPaymentMethods`
--
ALTER TABLE `UserPaymentMethods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CustomerFeedback`
--
ALTER TABLE `CustomerFeedback`
  ADD CONSTRAINT `CustomerFeedback_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`),
  ADD CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `UserAddresses`
--
ALTER TABLE `UserAddresses`
  ADD CONSTRAINT `UserAddresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

--
-- Constraints for table `UserPaymentMethods`
--
ALTER TABLE `UserPaymentMethods`
  ADD CONSTRAINT `UserPaymentMethods_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
