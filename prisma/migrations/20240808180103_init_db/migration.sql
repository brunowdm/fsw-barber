/*
  Warnings:

  - You are about to drop the column `barberShopId` on the `barbershopservice` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `booking` table. All the data in the column will be lost.
  - Added the required column `barbershopId` to the `BarbershopService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `barbershopservice` DROP FOREIGN KEY `BarberShopService_barberShopId_fkey`;

-- AlterTable
ALTER TABLE `barbershopservice` DROP COLUMN `barberShopId`,
    ADD COLUMN `barbershopId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `description`,
    DROP COLUMN `name`;

-- AddForeignKey
ALTER TABLE `BarbershopService` ADD CONSTRAINT `BarbershopService_barbershopId_fkey` FOREIGN KEY (`barbershopId`) REFERENCES `Barbershop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
