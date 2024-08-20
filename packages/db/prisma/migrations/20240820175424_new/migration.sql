/*
  Warnings:

  - You are about to drop the column `status` on the `p2pTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" DROP COLUMN "status";

-- DropEnum
DROP TYPE "TransferStatus";
