/*
  Warnings:

  - Made the column `title` on table `title` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `title` MODIFY `title` VARCHAR(191) NOT NULL;
