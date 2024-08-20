/*
  Warnings:

  - Added the required column `status` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('Pending', 'Completed', 'Failed');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "status" "TransferStatus" NOT NULL;
