/*
  Warnings:

  - You are about to drop the column `role` on the `Testimonial` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "WebsiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Testimonial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "event" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "image" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Testimonial" ("active", "content", "createdAt", "id", "image", "name", "rating", "updatedAt") SELECT "active", "content", "createdAt", "id", "image", "name", "rating", "updatedAt" FROM "Testimonial";
DROP TABLE "Testimonial";
ALTER TABLE "new_Testimonial" RENAME TO "Testimonial";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteSettings_key_key" ON "WebsiteSettings"("key");
