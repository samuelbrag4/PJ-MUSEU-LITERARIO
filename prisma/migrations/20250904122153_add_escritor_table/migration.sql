/*
  Warnings:

  - You are about to drop the column `autor` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `escritorId` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `escritor` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Escritor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "biografia" TEXT,
    "dataNascimento" DATETIME,
    "dataFalecimento" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "autorId" INTEGER,
    "descricao" TEXT NOT NULL,
    "mediaPreco" REAL NOT NULL,
    "imagem" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "temAdaptacao" BOOLEAN NOT NULL,
    "numeroPaginas" INTEGER NOT NULL,
    CONSTRAINT "Livro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Escritor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Livro" ("anoLancamento", "descricao", "dificuldade", "genero", "id", "imagem", "mediaPreco", "numeroPaginas", "temAdaptacao", "titulo") SELECT "anoLancamento", "descricao", "dificuldade", "genero", "id", "imagem", "mediaPreco", "numeroPaginas", "temAdaptacao", "titulo" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nascimento" INTEGER NOT NULL,
    "idade" INTEGER NOT NULL,
    "entrouEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Usuario" ("email", "entrouEm", "id", "idade", "nascimento", "nome", "nomeUsuario", "senha") SELECT "email", "entrouEm", "id", "idade", "nascimento", "nome", "nomeUsuario", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_nomeUsuario_key" ON "Usuario"("nomeUsuario");
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
