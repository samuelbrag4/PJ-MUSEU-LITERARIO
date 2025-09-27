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

	// Criar escritores de teste
	const machado = await prisma.escritor.create({
		data: {
			nome: "Machado de Assis",
			email: "machado@literatura.com",
			biografia: "Machado de Assis foi um escritor brasileiro, considerado um dos maiores nomes da literatura brasileira.",
			dataNascimento: new Date("1839-06-21"),
			dataFalecimento: new Date("1908-09-29"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Machado_de_Assis_1904.jpg"
		}
	});

	const clarice = await prisma.escritor.create({
		data: {
			nome: "Clarice Lispector",
			email: "clarice@literatura.com",
			biografia: "Clarice Lispector foi uma escritora e jornalista brasileira nascida na Ucrânia.",
			dataNascimento: new Date("1920-12-10"),
			dataFalecimento: new Date("1977-12-09"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Clarice_Lispector.jpg/220px-Clarice_Lispector.jpg"
		}
	});

	const orwell = await prisma.escritor.create({
		data: {
			nome: "George Orwell",
			email: "orwell@literature.com",
			biografia: "George Orwell foi um escritor, jornalista e ensaísta político inglês.",
			dataNascimento: new Date("1903-06-25"),
			dataFalecimento: new Date("1950-01-21"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/7/7e/George_Orwell_press_photo.jpg"
		}
	});

	const tolkien = await prisma.escritor.create({
		data: {
			nome: "J.R.R. Tolkien",
			email: "tolkien@literatura.com",
			biografia: "John Ronald Reuel Tolkien foi um escritor, professor universitário e filólogo britânico.",
			dataNascimento: new Date("1892-01-03"),
			dataFalecimento: new Date("1973-09-02"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/J._R._R._Tolkien%2C_ca._1925.jpg/220px-J._R._R._Tolkien%2C_ca._1925.jpg"
		}
	});

	const agatha = await prisma.escritor.create({
		data: {
			nome: "Agatha Christie",
			email: "agatha@mystery.com",
			biografia: "Agatha Christie foi uma escritora britânica que atuou como romancista e dramaturga.",
			dataNascimento: new Date("1890-09-15"),
			dataFalecimento: new Date("1976-01-12"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Agatha_Christie.png/220px-Agatha_Christie.png"
		}
	});

	// Criar livros de diferentes gêneros

	// ROMANCE
	await prisma.livro.create({
		data: {
			titulo: "Dom Casmurro",
			anoLancamento: 1899,
			autorId: machado.id,
			descricao: "Romance de Machado de Assis que narra a história de Bentinho e Capitu.",
			mediaPreco: 35.90,
			imagem: "https://m.media-amazon.com/images/I/81QwQn2ATGL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 256
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Hora da Estrela",
			anoLancamento: 1977,
			autorId: clarice.id,
			descricao: "Último romance de Clarice Lispector, conta a história de Macabéa.",
			mediaPreco: 42.50,
			imagem: "https://m.media-amazon.com/images/I/71vKGZ5UFSL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: true,
			numeroPaginas: 192
		}
	});

	// FICÇÃO CIENTÍFICA
	await prisma.livro.create({
		data: {
			titulo: "1984",
			anoLancamento: 1949,
			autorId: orwell.id,
			descricao: "Romance distópico que retrata uma sociedade totalitária.",
			mediaPreco: 38.90,
			imagem: "https://m.media-amazon.com/images/I/61NAx5pd6XL._SY466_.jpg",
			genero: "Ficção Científica",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 328
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Revolução dos Bichos",
			anoLancamento: 1945,
			autorId: orwell.id,
			descricao: "Fábula sobre uma revolução dos animais em uma fazenda.",
			mediaPreco: 32.90,
			imagem: "https://m.media-amazon.com/images/I/61owI5nOadL._SY466_.jpg",
			genero: "Ficção Científica",
			dificuldade: "FACIL",
			temAdaptacao: true,
			numeroPaginas: 152
		}
	});

	// FANTASIA
	await prisma.livro.create({
		data: {
			titulo: "O Senhor dos Anéis: A Sociedade do Anel",
			anoLancamento: 1954,
			autorId: tolkien.id,
			descricao: "Primeiro volume da épica trilogia de fantasia.",
			mediaPreco: 89.90,
			imagem: "https://m.media-amazon.com/images/I/91jBdG2aghL._SY466_.jpg",
			genero: "Fantasia",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 576
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "O Hobbit",
			anoLancamento: 1937,
			autorId: tolkien.id,
			descricao: "A aventura de Bilbo Bolseiro na Terra Média.",
			mediaPreco: 55.90,
			imagem: "https://m.media-amazon.com/images/I/712cDO7d73L._SY466_.jpg",
			genero: "Fantasia",
			dificuldade: "FACIL",
			temAdaptacao: true,
			numeroPaginas: 310
		}
	});

	// MISTÉRIO
	await prisma.livro.create({
		data: {
			titulo: "Assassinato no Expresso do Oriente",
			anoLancamento: 1934,
			autorId: agatha.id,
			descricao: "Um dos mais famosos casos de Hercule Poirot.",
			mediaPreco: 44.90,
			imagem: "https://m.media-amazon.com/images/I/81V2oqUznzL._SY466_.jpg",
			genero: "Mistério",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 256
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "E Não Sobrou Nenhum",
			anoLancamento: 1939,
			autorId: agatha.id,
			descricao: "Dez pessoas são convidadas para uma ilha misteriosa.",
			mediaPreco: 41.90,
			imagem: "https://m.media-amazon.com/images/I/71U1uK2Pm3L._SY466_.jpg",
			genero: "Mistério",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 288
		}
	});

	// DRAMA
	await prisma.livro.create({
		data: {
			titulo: "Memórias Póstumas de Brás Cubas",
			anoLancamento: 1881,
			autorId: machado.id,
			descricao: "Romance narrado por um defunto autor.",
			mediaPreco: 39.90,
			imagem: "https://m.media-amazon.com/images/I/81K7z4lYYeL._SY466_.jpg",
			genero: "Drama",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 208
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Perto do Coração Selvagem",
			anoLancamento: 1943,
			autorId: clarice.id,
			descricao: "Romance de estreia de Clarice Lispector.",
			mediaPreco: 46.90,
			imagem: "https://m.media-amazon.com/images/I/71yQHjSKPfL._SY466_.jpg",
			genero: "Drama",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 192
		}
	});

	// AVENTURA
	await prisma.livro.create({
		data: {
			titulo: "As Duas Torres",
			anoLancamento: 1954,
			autorId: tolkien.id,
			descricao: "Segundo volume de O Senhor dos Anéis.",
			mediaPreco: 89.90,
			imagem: "https://m.media-amazon.com/images/I/81EKaJxfuqL._SY466_.jpg",
			genero: "Aventura",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 448
		}
	});

	// Criar Carla Madeira (escritora brasileira)
	const carlaMadeira = await prisma.escritor.create({
		data: {
			nome: "Carla Madeira",
			email: "carlamadeira@literatura.com",
			biografia: "Carla Madeira nasceu em Belo Horizonte em 1964. Jornalista, publicitária e escritora brasileira, é autora de best-sellers como Tudo é Rio, A Natureza da Mordida e Véspera. Foi segunda escritora mais lida do Brasil em 2021.",
			dataNascimento: new Date("1964-10-18"),
			foto: "https://images.gr-assets.com/authors/1593530941p8/8518150.jpg"
		}
	});

	// Criar Conceição Evaristo (escritora e acadêmica brasileira)
	const conceicaoEvaristo = await prisma.escritor.create({
		data: {
			nome: "Conceição Evaristo",
			email: "conceicao@literatura.com",
			biografia: "Maria da Conceição Evaristo de Brito é uma escritora mineira. Graduada em Letras pela UFRJ, é mestra em Literatura Brasileira pela PUC-Rio e doutora em Literatura Comparada pela UFF. É uma das principais autoras da literatura afro-brasileira contemporânea. Ganhadora do Prêmio Juca Pato 2023.",
			dataNascimento: new Date("1946-11-29"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Concei%C3%A7%C3%A3o_Evaristo_2019.jpg/220px-Concei%C3%A7%C3%A3o_Evaristo_2019.jpg"
		}
	});

	// LITERATURA CONTEMPORÂNEA BRASILEIRA - Carla Madeira
	await prisma.livro.create({
		data: {
			titulo: "Tudo é Rio",
			anoLancamento: 2014,
			autorId: carlaMadeira.id,
			descricao: "Romance de estreia de Carla Madeira que se tornou um fenômeno editorial. A história de Dalva, Lucy e Venâncio e seus destinos entrelaçados pelo amor, dor e redenção.",
			mediaPreco: 49.90,
			imagem: "https://m.media-amazon.com/images/I/71qrfm8zIbL._SY466_.jpg",
			genero: "Literatura Contemporânea",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 264
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Natureza da Mordida",
			anoLancamento: 2018,
			autorId: carlaMadeira.id,
			descricao: "Segundo romance de Carla Madeira que explora os limites entre o bem e o mal através da história de três personagens em busca de redenção.",
			mediaPreco: 52.90,
			imagem: "https://m.media-amazon.com/images/I/81F4v-DSZOL._SY466_.jpg",
			genero: "Literatura Contemporânea",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 288
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Véspera",
			anoLancamento: 2021,
			autorId: carlaMadeira.id,
			descricao: "Terceiro romance de Carla Madeira que consolidou seu lugar entre os grandes nomes da literatura brasileira contemporânea. Uma narrativa envolvente sobre família, segredos e perdão.",
			mediaPreco: 56.90,
			imagem: "https://m.media-amazon.com/images/I/81VRGkNx8nL._SY466_.jpg",
			genero: "Literatura Contemporânea",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 320
		}
	});

	// LITERATURA AFRO-BRASILEIRA - Conceição Evaristo
	await prisma.livro.create({
		data: {
			titulo: "Ponciá Vicêncio",
			anoLancamento: 2003,
			autorId: conceicaoEvaristo.id,
			descricao: "Romance de estreia que narra a trajetória de uma mulher negra em busca de sua identidade e lugar no mundo. Uma das obras mais importantes da literatura afro-brasileira contemporânea.",
			mediaPreco: 39.90,
			imagem: "https://m.media-amazon.com/images/I/71n8qF5JDOL._SY466_.jpg",
			genero: "Literatura Brasileira",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 127
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Becos da Memória",
			anoLancamento: 2006,
			autorId: conceicaoEvaristo.id,
			descricao: "Romance que retrata a vida em uma favela antes de sua remoção, explorando as memórias e experiências de seus moradores com sensibilidade e profundidade.",
			mediaPreco: 42.90,
			imagem: "https://m.media-amazon.com/images/I/71vF8R-TQTL._SY466_.jpg",
			genero: "Literatura Brasileira",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 181
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Olhos d'água",
			anoLancamento: 2014,
			autorId: conceicaoEvaristo.id,
			descricao: "Coletânea de 15 contos que revelam com maestria poética a condição da mulher negra na sociedade brasileira. Obra fundamental da literatura afro-brasileira contemporânea.",
			mediaPreco: 44.90,
			imagem: "https://m.media-amazon.com/images/I/71YJQz8zN0L._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 116
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Insubmissas lágrimas de mulheres",
			anoLancamento: 2011,
			autorId: conceicaoEvaristo.id,
			descricao: "Coletânea de 13 contos que dão voz a mulheres negras que enfrentam e superam adversidades, celebrando sua força e resistência.",
			mediaPreco: 41.90,
			imagem: "https://m.media-amazon.com/images/I/71X4tB5RKOL._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 118
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Canção para ninar menino grande",
			anoLancamento: 2022,
			autorId: conceicaoEvaristo.id,
			descricao: "Romance mais recente que explora a relação entre mãe e filho, abordando temas como maternidade, violência urbana e amor familiar. Obra obrigatória da FUVEST 2025.",
			mediaPreco: 49.90,
			imagem: "https://m.media-amazon.com/images/I/71qE8M2U4-L._SY466_.jpg",
			genero: "Literatura Brasileira",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 208
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Poemas da recordação e outros movimentos",
			anoLancamento: 2017,
			autorId: conceicaoEvaristo.id,
			descricao: "Coletânea de poemas que traz reflexões sobre memória, ancestralidade e resistência. A poesia de Conceição Evaristo revela sua sensibilidade e compromisso social.",
			mediaPreco: 36.90,
			imagem: "https://m.media-amazon.com/images/I/61Q7RQz8q5L._SY466_.jpg",
			genero: "Poesia",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 120
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Histórias de leves enganos e parecenças",
			anoLancamento: 2016,
			autorId: conceicaoEvaristo.id,
			descricao: "Coletânea de contos que explora as complexidades das relações humanas e as sutilezas do cotidiano com o olhar único da autora.",
			mediaPreco: 38.90,
			imagem: "https://m.media-amazon.com/images/I/71xC9H+KSHL._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 128
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
