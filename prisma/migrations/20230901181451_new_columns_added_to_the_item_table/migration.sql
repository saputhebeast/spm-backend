/*
  Warnings:

  - Added the required column `age` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outdoor` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `material` VARCHAR(191) NOT NULL,
    ADD COLUMN `outdoor` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD COLUMN `tags` VARCHAR(191) NOT NULL;
