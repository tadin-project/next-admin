-- CreateTable
CREATE TABLE `group_menu` (
    `gm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NULL,
    `menu_id` INTEGER NULL,

    PRIMARY KEY (`gm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `group_menu` ADD CONSTRAINT `group_menu_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `ms_group`(`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_menu` ADD CONSTRAINT `group_menu_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `ms_menu`(`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE;
