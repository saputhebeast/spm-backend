/*
  Warnings:

  - You are about to drop the column `createAt` on the `subscription_box` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subscription_box` DROP COLUMN `createAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
