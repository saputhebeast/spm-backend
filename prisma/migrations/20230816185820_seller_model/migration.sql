-- CreateTable
CREATE TABLE `seller` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `line1` VARCHAR(191) NOT NULL,
    `line2` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `seller_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
