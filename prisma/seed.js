import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
	// Limpar todas as tabelas antes de inserir os dados
	await prisma.favorito.deleteMany();
	await prisma.livro.deleteMany();
	await prisma.usuario.deleteMany();
	await prisma.escritor.deleteMany();

	// Gerar hashes para as senhas
	const senhaUsuarioNormal = await bcrypt.hash("senha123", 10);
	const senhaUsuarioEscritor = await bcrypt.hash("senha123", 10);

	// Criar escritor de teste
	const escritor = await prisma.escritor.create({
		data: {
			nome: "Escritor Teste",
			email: "escritor@teste.com",
			biografia: "Biografia do escritor de teste.",
			dataNascimento: new Date("1980-01-01"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Machado_de_Assis_1904.jpg"
		}
	});

	// Criar livro de teste
	await prisma.livro.create({
		data: {
			titulo: "Livro de Teste",
			anoLancamento: 2020,
			autorId: escritor.id,
			descricao: "Descrição do livro de teste.",
			mediaPreco: 49.9,
			imagem: "https://m.media-amazon.com/images/I/81QwQn2ATGL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 200
		}
	});

	// Criar usuário NORMAL
	await prisma.usuario.create({
		data: {
			nome: "Usuário Normal",
			nomeUsuario: "usuario_normal",
			email: "normal@teste.com",
			senha: senhaUsuarioNormal,
			nascimento: 2000,
			idade: 25,
			tipo: "NORMAL"
		}
	});

	// Criar usuário ESCRITOR
	await prisma.usuario.create({
		data: {
			nome: "Usuário Escritor",
			nomeUsuario: "usuario_escritor",
			email: "escritor@teste.com",
			senha: senhaUsuarioEscritor,
			nascimento: 1990,
			idade: 35,
			tipo: "ESCRITOR"
		}
	});

	console.log("Seed concluído com sucesso!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
