-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "autor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "mediaPreco" REAL NOT NULL,
    "imagem" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "temAdaptacao" BOOLEAN NOT NULL,
    "numeroPaginas" INTEGER NOT NULL,
    "escritorId" INTEGER,
    CONSTRAINT "Livro_escritorId_fkey" FOREIGN KEY ("escritorId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Livro" ("anoLancamento", "autor", "descricao", "dificuldade", "genero", "id", "imagem", "mediaPreco", "numeroPaginas", "temAdaptacao", "titulo") SELECT "anoLancamento", "autor", "descricao", "dificuldade", "genero", "id", "imagem", "mediaPreco", "numeroPaginas", "temAdaptacao", "titulo" FROM "Livro";
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
    "entrouEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "escritor" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Usuario" ("email", "entrouEm", "id", "idade", "nascimento", "nome", "nomeUsuario", "senha") SELECT "email", "entrouEm", "id", "idade", "nascimento", "nome", "nomeUsuario", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_nomeUsuario_key" ON "Usuario"("nomeUsuario");
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
