-- CreateTable
CREATE TABLE "CronogramaLeitura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "livroId" INTEGER,
    "tipo" TEXT NOT NULL DEFAULT 'EVENTO',
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CronogramaLeitura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CronogramaLeitura_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favorito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FAVORITO',
    "statusLeitura" TEXT DEFAULT 'QUERO_LER',
    "dataInicio" DATETIME,
    "dataTermino" DATETIME,
    "progresso" INTEGER DEFAULT 0,
    "adicionadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorito_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favorito" ("id", "livroId", "status", "usuarioId") SELECT "id", "livroId", "status", "usuarioId" FROM "Favorito";
DROP TABLE "Favorito";
ALTER TABLE "new_Favorito" RENAME TO "Favorito";
CREATE UNIQUE INDEX "Favorito_usuarioId_livroId_key" ON "Favorito"("usuarioId", "livroId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
