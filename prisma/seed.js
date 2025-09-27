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

	// Adicionar mais escritores brasileiros
	const josedealencar = await prisma.escritor.create({
		data: {
			nome: "José de Alencar",
			email: "josealencar@literatura.com",
			biografia: "José Martiniano de Alencar foi um escritor e político brasileiro, considerado um dos maiores representantes do Romantismo brasileiro e patrono da cadeira 23 da Academia Brasileira de Letras.",
			dataNascimento: new Date("1829-05-01"),
			dataFalecimento: new Date("1877-12-12"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jos%C3%A9_de_Alencar_%28c._1870%29.jpg/220px-Jos%C3%A9_de_Alencar_%28c._1870%29.jpg"
		}
	});

	const limabarreto = await prisma.escritor.create({
		data: {
			nome: "Lima Barreto",
			email: "limabarreto@literatura.com",
			biografia: "Afonso Henriques de Lima Barreto foi um escritor brasileiro do período pré-modernista. É considerado um dos mais importantes escritores da literatura brasileira.",
			dataNascimento: new Date("1881-05-13"),
			dataFalecimento: new Date("1922-11-01"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Lima_Barreto_1916.jpg/220px-Lima_Barreto_1916.jpg"
		}
	});

	const racheldequeiroz = await prisma.escritor.create({
		data: {
			nome: "Rachel de Queiroz",
			email: "rachel@literatura.com",
			biografia: "Rachel de Queiroz foi uma escritora, jornalista, cronista e dramaturga brasileira. Foi a primeira mulher a ingressar na Academia Brasileira de Letras, em 1977.",
			dataNascimento: new Date("1910-11-17"),
			dataFalecimento: new Date("2003-11-04"),
			foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Rachel_de_Queiroz_1930.jpg/220px-Rachel_de_Queiroz_1930.jpg"
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

	// LITERATURA ROMÂNTICA BRASILEIRA
	await prisma.livro.create({
		data: {
			titulo: "Iracema",
			anoLancamento: 1865,
			autorId: josedealencar.id,
			descricao: "Romance indianista que narra a história de amor entre Iracema, índia tabajara, e Martim, colonizador português.",
			mediaPreco: 32.90,
			imagem: "https://m.media-amazon.com/images/I/71VrKHF3+7L._SY466_.jpg",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 144
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "O Guarani",
			anoLancamento: 1857,
			autorId: josedealencar.id,
			descricao: "Romance indianista que conta a história de Peri, índio goitacá, e Ceci, filha de fidalgo português.",
			mediaPreco: 35.90,
			imagem: "https://m.media-amazon.com/images/I/71QfB2YZJQL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 432
		}
	});

	// LITERATURA REALISTA BRASILEIRA
	await prisma.livro.create({
		data: {
			titulo: "Triste Fim de Policarpo Quaresma",
			anoLancamento: 1915,
			autorId: limabarreto.id,
			descricao: "Romance que satiriza o nacionalismo exagerado e retrata a sociedade brasileira do início do século XX.",
			mediaPreco: 38.90,
			imagem: "https://m.media-amazon.com/images/I/71mKPv3HVSL._SY466_.jpg",
			genero: "Drama",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 256
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "O Cortiço",
			anoLancamento: 1890,
			autorId: limabarreto.id,
			descricao: "Romance naturalista que retrata a vida em um cortiço carioca e as condições sociais da época.",
			mediaPreco: 36.90,
			imagem: "https://m.media-amazon.com/images/I/81VvnfJZr9L._SY466_.jpg",
			genero: "Drama",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 288
		}
	});

	// LITERATURA REGIONALISTA BRASILEIRA
	await prisma.livro.create({
		data: {
			titulo: "O Quinze",
			anoLancamento: 1930,
			autorId: racheldequeiroz.id,
			descricao: "Romance que retrata a seca de 1915 no Ceará e seus efeitos devastadores sobre a população sertaneja.",
			mediaPreco: 34.90,
			imagem: "https://m.media-amazon.com/images/I/71YmWzD7XZL._SY466_.jpg",
			genero: "Drama",
			dificuldade: "FACIL",
			temAdaptacao: true,
			numeroPaginas: 192
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Dôra, Doralina",
			anoLancamento: 1975,
			autorId: racheldequeiroz.id,
			descricao: "Romance que conta a saga de uma mulher forte que enfrenta as adversidades da vida no interior do Ceará.",
			mediaPreco: 42.90,
			imagem: "https://m.media-amazon.com/images/I/71k8H6mKmDL._SY466_.jpg",
			genero: "Drama",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 384
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Senhora",
			anoLancamento: 1875,
			autorId: josedealencar.id,
			descricao: "Romance urbano que retrata os costumes da sociedade burguesa carioca do século XIX, explorando temas como casamento por interesse.",
			mediaPreco: 33.90,
			imagem: "https://m.media-amazon.com/images/I/71JwH5v+FYL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 224
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

	// CRÔNICAS BRASILEIRAS
	await prisma.livro.create({
		data: {
			titulo: "Recordações do Escrivão Isaías Caminha",
			anoLancamento: 1909,
			autorId: limabarreto.id,
			descricao: "Romance autobiográfico que retrata as dificuldades de um jovem mulato para se inserir na sociedade carioca do início do século XX.",
			mediaPreco: 37.90,
			imagem: "https://m.media-amazon.com/images/I/71xB5ZvJ0cL._SY466_.jpg",
			genero: "Literatura Brasileira",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 312
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
