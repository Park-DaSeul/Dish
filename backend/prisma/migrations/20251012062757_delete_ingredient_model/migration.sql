/*
  Warnings:

  - You are about to drop the `DishIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dishIngredient` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."DishIngredient" DROP CONSTRAINT "DishIngredient_dishId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DishIngredient" DROP CONSTRAINT "DishIngredient_ingredientId_fkey";

-- AlterTable
ALTER TABLE "public"."Dish" ADD COLUMN     "dishIngredient" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "publicId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."DishIngredient";

-- DropTable
DROP TABLE "public"."Ingredient";
