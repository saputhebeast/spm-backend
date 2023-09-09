/*
  Warnings:

  - Added the required column `lat` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seller` ADD COLUMN `lat` DOUBLE NOT NULL,
    ADD COLUMN `long` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `_ItemToSubscriptionBox` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemToSubscriptionBox_AB_unique`(`A`, `B`),
    INDEX `_ItemToSubscriptionBox_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ItemToSubscriptionBox` ADD CONSTRAINT `_ItemToSubscriptionBox_A_fkey` FOREIGN KEY (`A`) REFERENCES `item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToSubscriptionBox` ADD CONSTRAINT `_ItemToSubscriptionBox_B_fkey` FOREIGN KEY (`B`) REFERENCES `subscription_box`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
