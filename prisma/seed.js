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
			descricao: "Romance de estreia de Clarice Lispector que revolucionou a literatura brasileira com sua prosa introspectiva e poética.",
			mediaPreco: 46.90,
			imagem: "https://m.media-amazon.com/images/I/71yQHjSKPfL._SY466_.jpg",
			genero: "Drama",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 192
		}
	});

	// MAIS OBRAS DE CLARICE LISPECTOR
	await prisma.livro.create({
		data: {
			titulo: "O Lustre",
			anoLancamento: 1946,
			autorId: clarice.id,
			descricao: "Segundo romance de Clarice, que narra a trajetória de Virgínia em busca de compreender o mundo e a própria existência.",
			mediaPreco: 42.90,
			imagem: "https://m.media-amazon.com/images/I/71mQ8NX7jCL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 280
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Cidade Sitiada",
			anoLancamento: 1949,
			autorId: clarice.id,
			descricao: "Romance que explora a vida de Lucrécia Neves e sua relação com a cidade em transformação, uma metáfora sobre a condição humana.",
			mediaPreco: 40.90,
			imagem: "https://m.media-amazon.com/images/I/71vR2ZKjKzL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 200
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Maçã no Escuro",
			anoLancamento: 1961,
			autorId: clarice.id,
			descricao: "Romance existencial que acompanha Martim em sua fuga e redescoberta do mundo após cometer um crime. Considerado uma das grandes obras da autora.",
			mediaPreco: 48.90,
			imagem: "https://m.media-amazon.com/images/I/71KzK8Wz8jL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 352
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Paixão Segundo G.H.",
			anoLancamento: 1964,
			autorId: clarice.id,
			descricao: "Obra-prima de Clarice Lispector, considerada um dos grandes romances da literatura mundial. Narra a epifania de uma mulher ao comer uma barata.",
			mediaPreco: 45.90,
			imagem: "https://m.media-amazon.com/images/I/71xB9YkJ7tL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: true,
			numeroPaginas: 176
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Uma Aprendizagem ou O Livro dos Prazeres",
			anoLancamento: 1969,
			autorId: clarice.id,
			descricao: "Romance que explora o amadurecimento emocional e sexual de Lóri através de sua relação com Ulisses, uma jornada de autodescoberta.",
			mediaPreco: 43.90,
			imagem: "https://m.media-amazon.com/images/I/71HmQ9xKzQL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 160
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Água Viva",
			anoLancamento: 1973,
			autorId: clarice.id,
			descricao: "Narrativa experimental que quebra as convenções do romance tradicional, apresentando um fluxo de consciência puro sobre a arte e a vida.",
			mediaPreco: 41.90,
			imagem: "https://m.media-amazon.com/images/I/71xR5vB6nGL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 96
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Um Sopro de Vida",
			anoLancamento: 1978,
			autorId: clarice.id,
			descricao: "Último romance de Clarice, publicado postumamente. Uma reflexão profunda sobre a criação literária e a condição humana através do diálogo entre Autor e Ângela.",
			mediaPreco: 44.90,
			imagem: "https://m.media-amazon.com/images/I/71QzR8vYKjL._SY466_.jpg",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 144
		}
	});

	// CONTOS DE CLARICE LISPECTOR
	await prisma.livro.create({
		data: {
			titulo: "Laços de Família",
			anoLancamento: 1960,
			autorId: clarice.id,
			descricao: "Coletânea de 13 contos que explora as relações familiares e os momentos de epifania no cotidiano. Uma das obras mais importantes da contística brasileira.",
			mediaPreco: 39.90,
			imagem: "https://m.media-amazon.com/images/I/71YvKGz8q5L._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 156
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Legião Estrangeira",
			anoLancamento: 1964,
			autorId: clarice.id,
			descricao: "Coletânea de contos e crônicas que inclui textos sobre animais e reflexões sobre a condição humana, revelando a sensibilidade única da autora.",
			mediaPreco: 42.90,
			imagem: "https://m.media-amazon.com/images/I/71dKpR4RKOL._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 200
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Felicidade Clandestina",
			anoLancamento: 1971,
			autorId: clarice.id,
			descricao: "Coletânea de contos autobiográficos que inclui o famoso conto que dá nome ao livro, explorando memórias da infância e juventude da autora.",
			mediaPreco: 38.90,
			imagem: "https://m.media-amazon.com/images/I/71K8qXzMx2L._SY466_.jpg",
			genero: "Contos",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 164
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Imitação da Rosa",
			anoLancamento: 1973,
			autorId: clarice.id,
			descricao: "Coletânea de contos que reúne algumas das melhores narrativas curtas de Clarice, incluindo o conto que dá título ao livro.",
			mediaPreco: 37.90,
			imagem: "https://m.media-amazon.com/images/I/61lmQ8xR4ZL._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 144
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Onde Estivestes de Noite",
			anoLancamento: 1974,
			autorId: clarice.id,
			descricao: "Coletânea de contos que explora temas como solidão, amor e a busca pelo sentido da existência através de personagens femininas marcantes.",
			mediaPreco: 40.90,
			imagem: "https://m.media-amazon.com/images/I/71pB5X8Zx9L._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 152
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Via Crucis do Corpo",
			anoLancamento: 1974,
			autorId: clarice.id,
			descricao: "Coletânea ousada de contos que aborda a sexualidade de forma franca e direta, quebrando tabus da época com a maestria característica da autora.",
			mediaPreco: 43.90,
			imagem: "https://m.media-amazon.com/images/I/71K7x4ZLzpL._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 88
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Bela e a Fera",
			anoLancamento: 1979,
			autorId: clarice.id,
			descricao: "Coletânea póstuma de contos que reúne textos esparsos da autora, incluindo narrativas inéditas e versões alternativas de contos conhecidos.",
			mediaPreco: 41.90,
			imagem: "https://m.media-amazon.com/images/I/71xN8qK4M2L._SY466_.jpg",
			genero: "Contos",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 136
		}
	});

	// CRÔNICAS DE CLARICE LISPECTOR
	await prisma.livro.create({
		data: {
			titulo: "Para Não Esquecer",
			anoLancamento: 1978,
			autorId: clarice.id,
			descricao: "Coletânea de crônicas publicadas no Jornal do Brasil, onde Clarice revela seu lado mais íntimo e reflexivo sobre o cotidiano.",
			mediaPreco: 36.90,
			imagem: "https://m.media-amazon.com/images/I/71R8vY6KNOL._SY466_.jpg",
			genero: "Crônicas",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 128
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Descoberta do Mundo",
			anoLancamento: 1984,
			autorId: clarice.id,
			descricao: "Coletânea póstuma das crônicas publicadas no Jornal do Brasil entre 1967 e 1973, revelando o olhar sensível da autora sobre o mundo.",
			mediaPreco: 45.90,
			imagem: "https://m.media-amazon.com/images/I/71nB7Q8M9XL._SY466_.jpg",
			genero: "Crônicas",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 500
		}
	});

	// LITERATURA INFANTIL DE CLARICE LISPECTOR
	await prisma.livro.create({
		data: {
			titulo: "O Mistério do Coelho Pensante",
			anoLancamento: 1967,
			autorId: clarice.id,
			descricao: "Primeiro livro infantil de Clarice Lispector, uma história envolvente sobre um coelho que resolve mistérios, escrita com a sensibilidade única da autora.",
			mediaPreco: 32.90,
			imagem: "https://m.media-amazon.com/images/I/61vB8q4RQKL._SY466_.jpg",
			genero: "Literatura Infantil",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 48
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Mulher que Matou os Peixes",
			anoLancamento: 1968,
			autorId: clarice.id,
			descricao: "Livro infantil onde Clarice conta para as crianças, com culpa e ternura, sobre como acabou matando os peixinhos vermelhos de seus filhos.",
			mediaPreco: 30.90,
			imagem: "https://m.media-amazon.com/images/I/71zK8RpLxvL._SY466_.jpg",
			genero: "Literatura Infantil",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 40
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "A Vida Íntima de Laura",
			anoLancamento: 1974,
			autorId: clarice.id,
			descricao: "História sobre Laura, uma galinha que vive uma vida simples mas repleta de pequenas descobertas e reflexões sobre a existência.",
			mediaPreco: 31.90,
			imagem: "https://m.media-amazon.com/images/I/71B8nK4RKQL._SY466_.jpg",
			genero: "Literatura Infantil",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 32
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Quase de Verdade",
			anoLancamento: 1978,
			autorId: clarice.id,
			descricao: "Último livro infantil de Clarice, publicado postumamente, que conta a história de Ulisses, um cão que narra suas aventuras e pensamentos.",
			mediaPreco: 33.90,
			imagem: "https://m.media-amazon.com/images/I/71p8N4qRzML._SY466_.jpg",
			genero: "Literatura Infantil",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 44
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Como Nasceram as Estrelas",
			anoLancamento: 1987,
			autorId: clarice.id,
			descricao: "Coletânea póstuma de doze lendas brasileiras recontadas por Clarice Lispector, preservando a cultura popular com sua sensibilidade literária.",
			mediaPreco: 35.90,
			imagem: "https://m.media-amazon.com/images/I/71KzX5rB8wL._SY466_.jpg",
			genero: "Literatura Infantil",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 80
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
