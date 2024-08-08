/*
  Warnings:

  - You are about to drop the column `phone` on the `barbershop` table. All the data in the column will be lost.
  - Added the required column `phones` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barbershop` DROP COLUMN `phone`,
    ADD COLUMN `phones` VARCHAR(191) NOT NULL;
