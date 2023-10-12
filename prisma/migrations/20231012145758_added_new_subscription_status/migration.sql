-- AlterTable
ALTER TABLE `subscription` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'COMPLETED') NOT NULL;
