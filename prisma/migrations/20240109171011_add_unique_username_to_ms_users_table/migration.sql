/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `ms_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ms_user_username_key` ON `ms_user`(`username`);
