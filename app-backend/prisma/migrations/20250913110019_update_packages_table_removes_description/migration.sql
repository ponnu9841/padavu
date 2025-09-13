/*
  Warnings:

  - You are about to drop the column `description` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `long_description` on the `packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "packages" DROP COLUMN "description",
DROP COLUMN "long_description";
