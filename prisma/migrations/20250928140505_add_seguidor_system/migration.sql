/*
  Warnings:

  - You are about to drop the `Avaliacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Avaliacao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Seguidor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "escritorId" INTEGER NOT NULL,
    "seguidoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Seguidor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Seguidor_escritorId_fkey" FOREIGN KEY ("escritorId") REFERENCES "Escritor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Seguidor_usuarioId_escritorId_key" ON "Seguidor"("usuarioId", "escritorId");
