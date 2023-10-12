/*
  Warnings:

  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://my-se-bucket-12.s3.ap-south-1.amazonaws.com/1697081389343-e60a3c36-7449-4b67-a441-275cc34f3e13.png';

-- AlterTable
ALTER TABLE `review` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
