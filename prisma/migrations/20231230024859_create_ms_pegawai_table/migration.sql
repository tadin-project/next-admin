-- CreateTable
CREATE TABLE `ms_pegawai` (
    `pegawai_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pegawai_kode` VARCHAR(50) NOT NULL,
    `pegawai_nama` VARCHAR(255) NOT NULL,
    `pegawai_status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`pegawai_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
