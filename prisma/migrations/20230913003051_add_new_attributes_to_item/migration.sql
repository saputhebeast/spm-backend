-- AlterTable
ALTER TABLE `item` ADD COLUMN `demand` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `demandweek` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
