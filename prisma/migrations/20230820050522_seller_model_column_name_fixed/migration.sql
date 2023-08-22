/*
  Warnings:

  - You are about to drop the column `cateogory` on the `Item` table. All the data in the column will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `cateogory`,
    ADD COLUMN `category` ENUM('SNEAKERS', 'SOCKS') NOT NULL;
