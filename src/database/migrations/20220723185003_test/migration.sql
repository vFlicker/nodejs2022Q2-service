/*
  Warnings:

  - You are about to drop the column `artistId` on the `favorites` table. All the data in the column will be lost.
  - Added the required column `artistId` to the `artists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_artistId_fkey";

-- DropIndex
DROP INDEX "IDX_FAVORITE__ARTIST_ID";

-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "artistId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "artistId";

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
