-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemName` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `category` ENUM('SNEAKERS', 'SOCKS') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sellerId` INTEGER NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `outdoor` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `age` INTEGER NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `material` VARCHAR(255) NOT NULL,
    `tags` VARCHAR(255) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `rating` DECIMAL(3,2) NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`sellerId`) REFERENCES `Seller`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
