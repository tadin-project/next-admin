-- CreateTable
CREATE TABLE `ms_menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_kode` VARCHAR(10) NOT NULL,
    `menu_nama` VARCHAR(255) NOT NULL,
    `menu_status` BOOLEAN NULL DEFAULT true,
    `menu_link` VARCHAR(255) NULL,
    `parent_menu_id` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
