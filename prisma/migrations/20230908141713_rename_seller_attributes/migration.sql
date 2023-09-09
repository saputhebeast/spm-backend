/*
  Warnings:

  - You are about to drop the column `lat` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `seller` table. All the data in the column will be lost.
  - Added the required column `slat` to the `seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slong` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seller` DROP COLUMN `lat`,
    DROP COLUMN `long`,
    ADD COLUMN `slat` DOUBLE NOT NULL,
    ADD COLUMN `slong` DOUBLE NOT NULL;
