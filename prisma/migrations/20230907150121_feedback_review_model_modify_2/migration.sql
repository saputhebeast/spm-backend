/*
  Warnings:

  - You are about to drop the column `isPositive` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `outcome` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `feedback` DROP COLUMN `isPositive`,
    ADD COLUMN `outcome` VARCHAR(191) NULL,
    MODIFY `result` VARCHAR(191) NULL,
    MODIFY `isSubmitted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `outcome`,
    ADD COLUMN `isPositive` BOOLEAN NULL,
    ADD COLUMN `opinion` VARCHAR(191) NULL,
    ADD COLUMN `sentiment` VARCHAR(191) NULL;
