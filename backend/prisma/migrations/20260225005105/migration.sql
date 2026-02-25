/*
  Warnings:

  - You are about to drop the column `credentialID` on the `Passkey` table. All the data in the column will be lost.
  - The `transports` column on the `Passkey` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[credentialId]` on the table `Passkey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialId` to the `Passkey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passkey" DROP COLUMN "credentialID",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "credentialId" TEXT NOT NULL,
ADD COLUMN     "lastUsedAt" TIMESTAMP(3),
ALTER COLUMN "counter" SET DEFAULT 0,
ALTER COLUMN "counter" SET DATA TYPE BIGINT,
DROP COLUMN "transports",
ADD COLUMN     "transports" TEXT[],
ALTER COLUMN "backedUp" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Passkey_credentialId_key" ON "Passkey"("credentialId");
