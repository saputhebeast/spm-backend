/*
  Warnings:

  - Added the required column `lat` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seller` ADD COLUMN `lat` DOUBLE NOT NULL,
    ADD COLUMN `long` DOUBLE NOT NULL;
