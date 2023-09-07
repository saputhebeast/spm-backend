-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `result` VARCHAR(191) NOT NULL,
    `isSubscriptionCancelled` BOOLEAN NOT NULL DEFAULT false,
    `isPositive` BOOLEAN NOT NULL,
    `subscriptionBoxId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `feedback_subscriptionBoxId_key`(`subscriptionBoxId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `outcome` VARCHAR(191) NOT NULL,
    `isReviewDiscarded` BOOLEAN NOT NULL DEFAULT false,
    `feedBackId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_subscriptionBoxId_fkey` FOREIGN KEY (`subscriptionBoxId`) REFERENCES `subscription_box`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_feedBackId_fkey` FOREIGN KEY (`feedBackId`) REFERENCES `feedback`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
