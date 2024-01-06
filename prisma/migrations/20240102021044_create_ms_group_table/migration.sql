-- CreateTable
CREATE TABLE `ms_group` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_kode` VARCHAR(10) NOT NULL,
    `group_nama` VARCHAR(255) NOT NULL,
    `group_status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
