/*
  Warnings:

  - A unique constraint covering the columns `[pegawai_id]` on the table `ms_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ms_user` ADD COLUMN `pegawai_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ms_user_pegawai_id_key` ON `ms_user`(`pegawai_id`);

-- AddForeignKey
ALTER TABLE `ms_user` ADD CONSTRAINT `ms_user_pegawai_id_fkey` FOREIGN KEY (`pegawai_id`) REFERENCES `ms_pegawai`(`pegawai_id`) ON DELETE SET NULL ON UPDATE CASCADE;
