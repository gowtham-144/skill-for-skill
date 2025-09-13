/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `senderId` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `receiverId` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `skillId` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `teacherId` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `maxStudents` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Skill` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Skill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Made the column `studentId` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_teacherId_fkey`;

-- DropIndex
DROP INDEX `Message_receiverId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_senderId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Session_skillId_fkey` ON `Session`;

-- DropIndex
DROP INDEX `Session_studentId_fkey` ON `Session`;

-- DropIndex
DROP INDEX `Session_teacherId_fkey` ON `Session`;

-- DropIndex
DROP INDEX `Skill_teacherId_fkey` ON `Skill`;

-- AlterTable
ALTER TABLE `Message` DROP PRIMARY KEY,
    DROP COLUMN `updatedAt`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `senderId` INTEGER NOT NULL,
    MODIFY `receiverId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `skillId` INTEGER NOT NULL,
    MODIFY `teacherId` INTEGER NOT NULL,
    MODIFY `studentId` INTEGER NOT NULL,
    MODIFY `endTime` DATETIME(3) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Skill` DROP PRIMARY KEY,
    DROP COLUMN `category`,
    DROP COLUMN `description`,
    DROP COLUMN `duration`,
    DROP COLUMN `maxStudents`,
    DROP COLUMN `price`,
    DROP COLUMN `teacherId`,
    DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `level` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
