/*
  Warnings:

  - You are about to drop the column `cookingTime` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Recipe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Dish" DROP COLUMN "cookingTime",
DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "duration",
DROP COLUMN "imageUrl",
ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dishId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_imageId_key" ON "public"."Recipe"("imageId");

-- AddForeignKey
ALTER TABLE "public"."Recipe" ADD CONSTRAINT "Recipe_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
