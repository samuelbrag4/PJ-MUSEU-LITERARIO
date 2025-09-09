-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nascimento" INTEGER NOT NULL,
    "idade" INTEGER NOT NULL,
    "entrouEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foto" TEXT,
    "livroDestaqueId" INTEGER,
    CONSTRAINT "Usuario_livroDestaqueId_fkey" FOREIGN KEY ("livroDestaqueId") REFERENCES "Livro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("email", "entrouEm", "foto", "id", "idade", "nascimento", "nome", "nomeUsuario", "senha") SELECT "email", "entrouEm", "foto", "id", "idade", "nascimento", "nome", "nomeUsuario", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_nomeUsuario_key" ON "Usuario"("nomeUsuario");
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
