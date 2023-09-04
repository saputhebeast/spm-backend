/*
  Warnings:

  - Added the required column `updatedAt` to the `shipping_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shipping_details` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `subscription_box` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` DOUBLE NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_subscription_box` (
    `itemId` INTEGER NOT NULL,
    `subscriptionBoxId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `subscriptionBoxId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscription_box` ADD CONSTRAINT `subscription_box_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_subscription_box` ADD CONSTRAINT `item_subscription_box_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_subscription_box` ADD CONSTRAINT `item_subscription_box_subscriptionBoxId_fkey` FOREIGN KEY (`subscriptionBoxId`) REFERENCES `subscription_box`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
