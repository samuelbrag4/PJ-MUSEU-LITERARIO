import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function log(message, type = 'info') {
	const timestamp = new Date().toISOString();
	const prefix = { info: '🔵', success: '✅', warning: '⚠️', error: '❌' }[type] || '📝';
	console.log(`${prefix} [SEED] ${message}`);
}

async function main() {
	log('Iniciando população do banco de dados...', 'info');
	
	try {
		log('Limpando tabelas existentes...', 'info');
		await prisma.seguidor.deleteMany();
		await prisma.favorito.deleteMany();
		await prisma.livro.deleteMany();
		await prisma.usuario.deleteMany();
		await prisma.escritor.deleteMany();
		log('Tabelas limpas com sucesso', 'success');

		log('Gerando senhas criptografadas personalizadas...', 'info');
		const senhaLeitor = await bcrypt.hash("leitor2025", 10);
		const senhaEscritor = await bcrypt.hash("escritor2025", 10);
		log('Senhas personalizadas geradas com sucesso', 'success');

	log('Criando escritores brasileiros...', 'info');
	const machado = await prisma.escritor.create({
		data: {
			nome: "Machado de Assis",
			email: "machado@literatura.com",
			biografia: "Machado de Assis foi um escritor brasileiro, considerado um dos maiores nomes da literatura brasileira.",
			dataNascimento: new Date("1839-06-21"),
			dataFalecimento: new Date("1908-09-29"),
			foto: "https://commons.wikimedia.org/wiki/File:Machado_de_Assis_001.jpg#/media/File:Machado_de_Assis_001.jpg"
		}
	});

	const clarice = await prisma.escritor.create({
		data: {
			nome: "Clarice Lispector",
			email: "clarice@literatura.com",
			biografia: "Clarice Lispector foi uma escritora e jornalista brasileira nascida na Ucrânia.",
			dataNascimento: new Date("1920-12-10"),
			dataFalecimento: new Date("1977-12-09"),
			foto: "https://www.bn.gov.br/sites/default/files/styles/large/public/clarice-lispector.jpg"
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
			foto: "https://www.academia.org.br/sites/default/files/academicos/jose-de-alencar.jpg"
		}
	});

	const limabarreto = await prisma.escritor.create({
		data: {
			nome: "Lima Barreto",
			email: "limabarreto@literatura.com",
			biografia: "Afonso Henriques de Lima Barreto foi um escritor brasileiro do período pré-modernista. É considerado um dos mais importantes escritores da literatura brasileira.",
			dataNascimento: new Date("1881-05-13"),
			dataFalecimento: new Date("1922-11-01"),
			foto: "https://www.bn.gov.br/sites/default/files/styles/medium/public/lima-barreto-foto.jpg"
		}
	});

	const racheldequeiroz = await prisma.escritor.create({
		data: {
			nome: "Rachel de Queiroz",
			email: "rachel@literatura.com",
			biografia: "Rachel de Queiroz foi uma escritora, jornalista, cronista e dramaturga brasileira. Foi a primeira mulher a ingressar na Academia Brasileira de Letras, em 1977.",
			dataNascimento: new Date("1910-11-17"),
			dataFalecimento: new Date("2003-11-04"),
			foto: "https://www.academia.org.br/sites/default/files/academicos/rachel-de-queiroz.jpg"
		}
	});

	// Criar livros de diferentes gêneros

	log('Criando livros - Romances clássicos...', 'info');
	await prisma.livro.create({
		data: {
			titulo: "Dom Casmurro",
			anoLancamento: 1899,
			autorId: machado.id,
			descricao: "Romance de Machado de Assis que narra a história de Bentinho e Capitu.",
			mediaPreco: 35.90,
			imagem: "https://via.placeholder.com/300x400/2F4F4F/FFFFFF?text=Dom+Casmurro",
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
			foto: "https://www.saraivaconteudo.com.br/wp-content/uploads/2021/08/carla-madeira-autora-brasileira.jpg"
		}
	});

	// Criar Conceição Evaristo (escritora e acadêmica brasileira)
	const conceicaoEvaristo = await prisma.escritor.create({
		data: {
			nome: "Conceição Evaristo",
			email: "conceicao@literatura.com",
			biografia: "Maria da Conceição Evaristo de Brito é uma escritora mineira. Graduada em Letras pela UFRJ, é mestra em Literatura Brasileira pela PUC-Rio e doutora em Literatura Comparada pela UFF. É uma das principais autoras da literatura afro-brasileira contemporânea. Ganhadora do Prêmio Juca Pato 2023.",
			dataNascimento: new Date("1946-11-29"),
			foto: "https://www.geledes.org.br/wp-content/uploads/2019/11/conceicao-evaristo.jpg"
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

	// NOVOS AUTORES SOLICITADOS
	log('Criando novos escritores solicitados...', 'info');

	// Raul Pompéia
	const raulPompeia = await prisma.escritor.create({
		data: {
			nome: "Raul Pompéia",
			email: "raul@literatura.com",
			biografia: "Raul d'Ávila Pompéia foi um escritor brasileiro, autor da obra-prima 'O Ateneu', considerada um dos marcos do Realismo brasileiro.",
			dataNascimento: new Date("1863-04-12"),
			dataFalecimento: new Date("1895-12-25"),
			foto: "https://ui-avatars.com/api/?name=Raul+Pompéia&background=8B4513&color=FFF&size=400"
		}
	});

	// Olavo Bilac
	const olavoBilac = await prisma.escritor.create({
		data: {
			nome: "Olavo Bilac",
			email: "olavo@literatura.com",
			biografia: "Olavo Brás Martins dos Guimarães Bilac foi um jornalista e poeta brasileiro, membro fundador da Academia Brasileira de Letras. É considerado o maior representante do Parnasianismo brasileiro.",
			dataNascimento: new Date("1865-12-16"),
			dataFalecimento: new Date("1918-12-28"),
			foto: "https://ui-avatars.com/api/?name=Olavo+Bilac&background=4B0082&color=FFF&size=400"
		}
	});

	// Dionélio Machado
	const dionelioMachado = await prisma.escritor.create({
		data: {
			nome: "Dionélio Machado",
			email: "dionelio@literatura.com",
			biografia: "Dionélio Tubino Machado foi um escritor, médico psiquiatra e militante político brasileiro. Considerado precursor do romance urbano moderno no Brasil.",
			dataNascimento: new Date("1895-01-05"),
			dataFalecimento: new Date("1985-05-19"),
			foto: "https://ui-avatars.com/api/?name=Dionélio+Machado&background=2F4F4F&color=FFF&size=400"
		}
	});

	// Paulo Freire
	const pauloFreire = await prisma.escritor.create({
		data: {
			nome: "Paulo Freire",
			email: "paulo@literatura.com",
			biografia: "Paulo Reglus Neves Freire foi um educador, pedagogo e filósofo brasileiro. É considerado um dos pensadores mais notáveis na história da pedagogia mundial.",
			dataNascimento: new Date("1921-09-19"),
			dataFalecimento: new Date("1997-05-02"),
			foto: "https://ui-avatars.com/api/?name=Paulo+Freire&background=228B22&color=FFF&size=400"
		}
	});

	// Graciliano Ramos
	const gracilianoRamos = await prisma.escritor.create({
		data: {
			nome: "Graciliano Ramos",
			email: "graciliano@literatura.com",
			biografia: "Graciliano Ramos de Oliveira foi um escritor brasileiro, considerado por muitos o maior prosador da literatura brasileira. Autor de clássicos como 'Vidas Secas' e 'São Bernardo'.",
			dataNascimento: new Date("1892-10-27"),
			dataFalecimento: new Date("1953-03-20"),
			foto: "https://ui-avatars.com/api/?name=Graciliano+Ramos&background=8B0000&color=FFF&size=400"
		}
	});

	// Jorge Amado
	const jorgeAmado = await prisma.escritor.create({
		data: {
			nome: "Jorge Amado",
			email: "jorge@literatura.com",
			biografia: "Jorge Leal Amado de Faria foi um dos mais famosos e traduzidos escritores brasileiros de todos os tempos. Autor de obras como 'Dona Flor e Seus Dois Maridos', 'Gabriela, Cravo e Canela' e 'Capitães da Areia'.",
			dataNascimento: new Date("1912-08-10"),
			dataFalecimento: new Date("2001-08-06"),
			foto: "https://ui-avatars.com/api/?name=Jorge+Amado&background=FF8C00&color=FFF&size=400"
		}
	});

	// Patrick Torres
	const patrickTorres = await prisma.escritor.create({
		data: {
			nome: "Patrick Torres",
			email: "patrick@literatura.com",
			biografia: "Patrick Torres é um escritor contemporâneo brasileiro, conhecido por suas obras de ficção que exploram temas urbanos e relacionamentos modernos.",
			dataNascimento: new Date("1985-07-15"),
			foto: "https://ui-avatars.com/api/?name=Patrick+Torres&background=483D8B&color=FFF&size=400"
		}
	});

	// Mariana Salomão Carrara
	const marianaSalomao = await prisma.escritor.create({
		data: {
			nome: "Mariana Salomão Carrara",
			email: "mariana@literatura.com",
			biografia: "Mariana Salomão Carrara é uma escritora brasileira contemporânea, conhecida por suas narrativas envolventes e personagens complexos que retratam a vida moderna brasileira.",
			dataNascimento: new Date("1988-03-20"),
			foto: "https://ui-avatars.com/api/?name=Mariana+Salomão&background=DC143C&color=FFF&size=400"
		}
	});

	// LIVROS DOS NOVOS AUTORES
	log('Criando livros dos novos autores...', 'info');

	// Livros de Raul Pompéia
	await prisma.livro.create({
		data: {
			titulo: "O Ateneu",
			anoLancamento: 1888,
			autorId: raulPompeia.id,
			descricao: "Romance autobiográfico que retrata a vida em um colégio interno no Rio de Janeiro do século XIX. Uma crítica severa ao sistema educacional da época.",
			mediaPreco: 34.90,
			imagem: "https://ui-avatars.com/api/?name=O+Ateneu&background=8B4513&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 224
		}
	});

	// Livros de Olavo Bilac
	await prisma.livro.create({
		data: {
			titulo: "Poesias",
			anoLancamento: 1888,
			autorId: olavoBilac.id,
			descricao: "Coletânea de poemas parnasianos de Olavo Bilac, incluindo clássicos como 'Via Láctea' e 'Profissão de Fé'.",
			mediaPreco: 29.90,
			imagem: "https://ui-avatars.com/api/?name=Poesias&background=4B0082&color=FFF&size=400",
			genero: "Poesia",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 180
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Sarças de Fogo",
			anoLancamento: 1888,
			autorId: olavoBilac.id,
			descricao: "Primeira coletânea de poemas de Olavo Bilac, marcando sua entrada no panorama literário brasileiro.",
			mediaPreco: 32.90,
			imagem: "https://ui-avatars.com/api/?name=Sarças+de+Fogo&background=4B0082&color=FFF&size=400",
			genero: "Poesia",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 156
		}
	});

	// Livros de Dionélio Machado
	await prisma.livro.create({
		data: {
			titulo: "Os Ratos",
			anoLancamento: 1935,
			autorId: dionelioMachado.id,
			descricao: "Romance que retrata um dia na vida de Naziazeno, funcionário público que precisa pagar uma dívida. Considerado uma obra-prima do romance urbano brasileiro.",
			mediaPreco: 38.90,
			imagem: "https://ui-avatars.com/api/?name=Os+Ratos&background=2F4F4F&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 144
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "O Louco do Cati",
			anoLancamento: 1942,
			autorId: dionelioMachado.id,
			descricao: "Romance que narra a história de um homem internado em um manicômio, explorando temas de loucura e sociedade.",
			mediaPreco: 36.90,
			imagem: "https://ui-avatars.com/api/?name=O+Louco+do+Cati&background=2F4F4F&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 198
		}
	});

	// Livros de Paulo Freire
	await prisma.livro.create({
		data: {
			titulo: "Pedagogia do Oprimido",
			anoLancamento: 1968,
			autorId: pauloFreire.id,
			descricao: "Obra fundamental da pedagogia crítica, propondo uma educação como prática da liberdade. Um dos livros mais influentes da educação mundial.",
			mediaPreco: 45.90,
			imagem: "https://ui-avatars.com/api/?name=Pedagogia+do+Oprimido&background=228B22&color=FFF&size=400",
			genero: "Ensaio",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 256
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Educação como Prática da Liberdade",
			anoLancamento: 1967,
			autorId: pauloFreire.id,
			descricao: "Primeira obra de Paulo Freire, onde apresenta suas ideias sobre educação democrática e libertadora.",
			mediaPreco: 42.90,
			imagem: "https://ui-avatars.com/api/?name=Educação+como+Prática&background=228B22&color=FFF&size=400",
			genero: "Ensaio",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 192
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Cartas a Cristina",
			anoLancamento: 1994,
			autorId: pauloFreire.id,
			descricao: "Reflexões autobiográficas sobre educação, política e vida, escritas em forma de cartas à sua sobrinha.",
			mediaPreco: 39.90,
			imagem: "https://ui-avatars.com/api/?name=Cartas+a+Cristina&background=228B22&color=FFF&size=400",
			genero: "Biografia",
			dificuldade: "MEDIA", 
			temAdaptacao: false,
			numeroPaginas: 224
		}
	});

	// Livros de Graciliano Ramos
	await prisma.livro.create({
		data: {
			titulo: "Vidas Secas",
			anoLancamento: 1938,
			autorId: gracilianoRamos.id,
			descricao: "Romance que retrata a vida de uma família de retirantes nordestinos. Considerado uma das maiores obras da literatura brasileira.",
			mediaPreco: 41.90,
			imagem: "https://ui-avatars.com/api/?name=Vidas+Secas&background=8B0000&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 176
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "São Bernardo",
			anoLancamento: 1934,
			autorId: gracilianoRamos.id,
			descricao: "Romance narrado em primeira pessoa por Paulo Honório, fazendeiro que conta sua trajetória de ascensão social e as consequências de sua ambição.",
			mediaPreco: 38.90,
			imagem: "https://ui-avatars.com/api/?name=São+Bernardo&background=8B0000&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 224
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Angústia",
			anoLancamento: 1936,
			autorId: gracilianoRamos.id,
			descricao: "Romance psicológico que narra a história de Luís da Silva, funcionário público atormentado por ciúmes e frustrações.",
			mediaPreco: 37.90,
			imagem: "https://ui-avatars.com/api/?name=Angústia&background=8B0000&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 288
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Memórias do Cárcere",
			anoLancamento: 1953,
			autorId: gracilianoRamos.id,
			descricao: "Relato autobiográfico sobre o período em que o autor esteve preso durante o Estado Novo, sem julgamento nem acusação formal.",
			mediaPreco: 48.90,
			imagem: "https://ui-avatars.com/api/?name=Memórias+do+Cárcere&background=8B0000&color=FFF&size=400",
			genero: "Biografia",
			dificuldade: "DIFICIL",
			temAdaptacao: false,
			numeroPaginas: 624
		}
	});

	// Livros de Jorge Amado (atenção especial solicitada)
	await prisma.livro.create({
		data: {
			titulo: "Gabriela, Cravo e Canela",
			anoLancamento: 1958,
			autorId: jorgeAmado.id,
			descricao: "Romance que conta a história de Gabriela, mulher sensual e livre, e sua relação com Nacib, árabe dono de bar em Ilhéus nos anos 1920.",
			mediaPreco: 44.90,
			imagem: "https://ui-avatars.com/api/?name=Gabriela+Cravo+Canela&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "FACIL",
			temAdaptacao: true,
			numeroPaginas: 424
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Dona Flor e Seus Dois Maridos",
			anoLancamento: 1966,
			autorId: jorgeAmado.id,
			descricao: "Romance que narra a história de Dona Flor, viúva que se casa novamente mas continua sendo visitada pelo fantasma do primeiro marido.",
			mediaPreco: 42.90,
			imagem: "https://ui-avatars.com/api/?name=Dona+Flor&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "FACIL",
			temAdaptacao: true,
			numeroPaginas: 368
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Capitães da Areia",
			anoLancamento: 1937,
			autorId: jorgeAmado.id,
			descricao: "Romance que retrata a vida de um grupo de meninos de rua em Salvador, explorando temas sociais e a marginalização infantil.",
			mediaPreco: 39.90,
			imagem: "https://ui-avatars.com/api/?name=Capitães+da+Areia&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 280
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Tieta do Agreste",
			anoLancamento: 1977,
			autorId: jorgeAmado.id,
			descricao: "Romance sobre Tieta, mulher que retorna rica à sua cidade natal após anos de ausência, causando transformações na comunidade.",
			mediaPreco: 41.90,
			imagem: "https://ui-avatars.com/api/?name=Tieta+do+Agreste&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "FACIL",
			temAdaptacao: true,
			numeroPaginas: 392
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Tenda dos Milagres",
			anoLancamento: 1969,
			autorId: jorgeAmado.id,
			descricao: "Romance que aborda questões raciais no Brasil através da história de Pedro Archanjo, mulato defensor da cultura afro-brasileira.",
			mediaPreco: 43.90,
			imagem: "https://ui-avatars.com/api/?name=Tenda+dos+Milagres&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: true,
			numeroPaginas: 416
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Teresa Batista Cansada de Guerra",
			anoLancamento: 1972,
			autorId: jorgeAmado.id,
			descricao: "Romance que narra a saga de Teresa Batista, mulher forte que enfrenta diversas adversidades na Bahia do século XX.",
			mediaPreco: 45.90,
			imagem: "https://ui-avatars.com/api/?name=Teresa+Batista&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 448
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Jubiabá",
			anoLancamento: 1935,
			autorId: jorgeAmado.id,
			descricao: "Romance de formação que conta a história de Baldo, desde a infância pobre até se tornar líder sindical em Salvador.",
			mediaPreco: 38.90,
			imagem: "https://ui-avatars.com/api/?name=Jubiabá&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 312
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Mar Morto",
			anoLancamento: 1936,
			autorId: jorgeAmado.id,
			descricao: "Romance que retrata a vida dos saveiristas da Bahia, misturando realismo social com elementos místicos da cultura popular.",
			mediaPreco: 37.90,
			imagem: "https://ui-avatars.com/api/?name=Mar+Morto&background=FF8C00&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 256
		}
	});

	// Livros de Patrick Torres (autor contemporâneo)
	await prisma.livro.create({
		data: {
			titulo: "Cidade de Neon",
			anoLancamento: 2018,
			autorId: patrickTorres.id,
			descricao: "Romance urbano contemporâneo que explora as relações humanas na metrópole moderna, entre luzes artificiais e solidão urbana.",
			mediaPreco: 35.90,
			imagem: "https://ui-avatars.com/api/?name=Cidade+de+Neon&background=483D8B&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 288
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Paralelos",
			anoLancamento: 2020,
			autorId: patrickTorres.id,
			descricao: "Coletânea de contos que exploram vidas que se cruzam na cidade grande, revelando conexões inesperadas entre desconhecidos.",
			mediaPreco: 32.90,
			imagem: "https://ui-avatars.com/api/?name=Paralelos&background=483D8B&color=FFF&size=400",
			genero: "Contos",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 216
		}
	});

	// Livros de Mariana Salomão Carrara
	await prisma.livro.create({
		data: {
			titulo: "Entre Águas",
			anoLancamento: 2019,
			autorId: marianaSalomao.id,
			descricao: "Romance que entrelaça três gerações de mulheres de uma família, explorando temas de identidade, memória e tradição.",
			mediaPreco: 38.90,
			imagem: "https://ui-avatars.com/api/?name=Entre+Águas&background=DC143C&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 324
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Jardim de Inverno",
			anoLancamento: 2021,
			autorId: marianaSalomao.id,
			descricao: "Romance intimista que acompanha uma mulher em processo de redescoberta após uma grande perda, explorando luto, amor e recomeços.",
			mediaPreco: 36.90,
			imagem: "https://ui-avatars.com/api/?name=Jardim+de+Inverno&background=DC143C&color=FFF&size=400",
			genero: "Romance",
			dificuldade: "MEDIA",
			temAdaptacao: false,
			numeroPaginas: 268
		}
	});

	await prisma.livro.create({
		data: {
			titulo: "Cartas Nunca Enviadas",
			anoLancamento: 2017,
			autorId: marianaSalomao.id,
			descricao: "Coletânea de contos em formato epistolar, onde cada história é uma carta não enviada, revelando segredos e sentimentos guardados.",
			mediaPreco: 34.90,
			imagem: "https://ui-avatars.com/api/?name=Cartas+Nunca+Enviadas&background=DC143C&color=FFF&size=400",
			genero: "Contos",
			dificuldade: "FACIL",
			temAdaptacao: false,
			numeroPaginas: 192
		}
	});

	// CRIANDO USUÁRIOS PERSONALIZADOS
	log('Criando usuários com credenciais personalizadas...', 'info');

	// Usuário LEITOR - Perfil de leitor apaixonado por literatura
	const usuarioLeitor = await prisma.usuario.create({
		data: {
			nome: "Ana Clara Silva",
			nomeUsuario: "ana_leitora",
			email: "ana.clara@museu.com",
			senha: senhaLeitor,
			nascimento: 1995,
			idade: 30,
			tipo: "NORMAL",
			foto: "https://ui-avatars.com/api/?name=Ana+Clara&background=FF69B4&color=FFF&size=400"
		}
	});

	// Usuário ESCRITOR - Perfil de escritor brasileiro contemporâneo  
	const usuarioEscritor = await prisma.usuario.create({
		data: {
			nome: "Carlos Eduardo Santos",
			nomeUsuario: "carlos_escritor",
			email: "carlos.santos@literatura.com",
			senha: senhaEscritor,
			nascimento: 1988,
			idade: 37,
			tipo: "ESCRITOR",
			foto: "https://ui-avatars.com/api/?name=Carlos+Eduardo&background=4169E1&color=FFF&size=400"
		}
	});

	log(`Usuário LEITOR criado: ana_leitora (senha: leitor2025)`, 'success');
	log(`Usuário ESCRITOR criado: carlos_escritor (senha: escritor2025)`, 'success');

		log('População do banco de dados concluída com sucesso!', 'success');
		log(`Total criado: 15 escritores, 66 livros, 2 usuários`, 'info');
	} catch (error) {
		log(`Erro durante a população: ${error.message}`, 'error');
		throw error;
	}
}

main()
	.catch((e) => {
		log(`Erro fatal: ${e.message}`, 'error');
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		log('Desconectando do banco de dados...', 'info');
		await prisma.$disconnect();
		log('Processo de seed finalizado', 'success');
	});
