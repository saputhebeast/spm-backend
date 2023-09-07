/*
  Warnings:

  - Added the required column `description` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSubmitted` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `feedback` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `isSubmitted` BOOLEAN NOT NULL;
