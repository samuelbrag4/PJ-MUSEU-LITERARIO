import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar escritores
  await prisma.escritor.createMany({
    data: [
        // Clássicos
        {
          nome: 'José de Alencar',
          email: null,
          biografia: 'José de Alencar (1829–1877) inaugurou o romance de temática nacional. Formou-se em Direito, mas dedicou-se à escrita, produzindo romances, contos, crônicas, peças de teatro e sua autobiografia. Suas obras, como "O Guarani" (1857), marcaram a literatura brasileira do século XIX.',
          dataNascimento: new Date('1829-05-01'),
          dataFalecimento: new Date('1877-12-12'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Jos%C3%A9_de_Alencar.jpg'
        },
        {
          nome: 'Cecília Meireles',
          email: null,
          biografia: 'Cecília Meireles (1901–1964) foi a primeira escritora brasileira a ganhar grande reconhecimento literário. Autora de mais de cinquenta obras, escreveu poemas, romances, livros infantis e textos jornalísticos. Estreou com "Espectros" (1919) aos 18 anos.',
          dataNascimento: new Date('1901-11-07'),
          dataFalecimento: new Date('1964-11-09'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Cec%C3%ADlia_Meireles_1934.jpg'
        },
        {
          nome: 'Carlos Drummond de Andrade',
          email: null,
          biografia: 'Carlos Drummond de Andrade (1902–1987) é considerado um dos maiores poetas brasileiros. Sua obra é marcada por versos soltos, simplicidade de linguagem e reflexão social e existencial. Destaca-se "A Rosa do Povo" (1945) entre suas obras mais renomadas.',
          dataNascimento: new Date('1902-10-31'),
          dataFalecimento: new Date('1987-08-17'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Carlos_Drummond_de_Andrade.jpg'
        },
        {
          nome: 'Machado de Assis',
          email: null,
          biografia: 'Machado de Assis (1839–1908) é o escritor brasileiro mais reconhecido internacionalmente, fundador e primeiro presidente da Academia Brasileira de Letras. Sua obra inclui romances, contos, crônicas, poesias e peças de teatro. "Dom Casmurro" (1899) é uma de suas obras mais estudadas.',
          dataNascimento: new Date('1839-06-21'),
          dataFalecimento: new Date('1908-09-29'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Machado_de_Assis_1890_por_Marc_Ferrez.jpg'
        },
        {
          nome: 'Clarice Lispector',
          email: null,
          biografia: 'Clarice Lispector (1920–1977) nasceu na Ucrânia e naturalizou-se brasileira. Reconhecida por sua profundidade e sensibilidade literária, escreveu romances, contos, crônicas e livros infantis, explorando a subjetividade e dilemas existenciais.',
          dataNascimento: new Date('1920-12-10'),
          dataFalecimento: new Date('1977-12-09'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Clarice_Lispector.jpg'
        },
        {
          nome: 'João Cabral de Melo Neto',
          email: null,
          biografia: 'João Cabral de Melo Neto (1920–1999) foi um dos maiores nomes da Geração de 45. Autor do poema dramático "Morte e Vida Severina" (1955), seus versos possuem rigidez formal e forte influência da cultura popular.',
          dataNascimento: new Date('1920-01-09'),
          dataFalecimento: new Date('1999-10-09'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Jo%C3%A3o_Cabral_de_Melo_Neto.jpg'
        },
        {
          nome: 'Graciliano Ramos',
          email: null,
          biografia: 'Graciliano Ramos (1892–1953) é um dos prosadores mais importantes da segunda fase do modernismo brasileiro. Autor de "Vidas Secas" (1938), suas obras retratam o Nordeste e as dificuldades sociais com grande realismo e sensibilidade.',
          dataNascimento: new Date('1892-10-27'),
          dataFalecimento: new Date('1953-03-20'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Graciliano_Ramos.jpg'
        },
        {
          nome: 'Mario Quintana',
          email: null,
          biografia: 'Mario Quintana (1906–1994) foi um poeta gaúcho conhecido por sua linguagem simples e delicada. Seus versos conquistaram gerações de leitores, sendo reconhecido como um dos maiores poetas do século XX no Brasil.',
          dataNascimento: new Date('1906-07-30'),
          dataFalecimento: new Date('1994-05-05'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Mario_Quintana.jpg'
        },
        {
          nome: 'João Guimarães Rosa',
          email: null,
          biografia: 'João Guimarães Rosa (1908–1967) foi romancista e contista brasileiro. Autor do épico "Grande Sertão: Veredas", é reconhecido pelo domínio da linguagem e pela originalidade de suas narrativas.',
          dataNascimento: new Date('1908-06-27'),
          dataFalecimento: new Date('1967-11-19'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Jo%C3%A3o_Guimar%C3%A3es_Rosa_1950.jpg'
        },
        {
          nome: 'Monteiro Lobato',
          email: null,
          biografia: 'Monteiro Lobato (1882–1948) foi um dos primeiros escritores brasileiros a escrever literatura infantil. Criador do Sítio do Picapau Amarelo, suas obras infantis são clássicos da literatura nacional. Também escreveu contos e o romance polêmico "O Choque das Raças" (1926).',
          dataNascimento: new Date('1882-04-18'),
          dataFalecimento: new Date('1948-07-04'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Monteiro_Lobato.jpg'
        },
      
        // Contemporâneos
        {
          nome: 'Ruth Rocha',
          email: null,
          biografia: 'Ruth Rocha (1931) é uma das autoras mais conhecidas da literatura infantil brasileira. Seu livro "Marcelo, Marmelo, Martelo" já vendeu mais de um milhão de cópias e ela é ganhadora de quatro prêmios Jabuti.',
          dataNascimento: new Date('1931-05-31'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Ruth_Rocha.jpg'
        },
        {
          nome: 'Luis Fernando Veríssimo',
          email: null,
          biografia: 'Luis Fernando Veríssimo (1936) é renomado autor contemporâneo brasileiro, conhecido por sua escrita criativa e humorística, especialmente voltada para contos e crônicas do cotidiano. Venceu dois prêmios Jabuti.',
          dataNascimento: new Date('1936-09-26'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Luis_Fernando_Verissimo_2006.jpg'
        },
        {
          nome: 'Ana Maria Machado',
          email: null,
          biografia: 'Ana Maria Machado (1941) é escritora premiada da literatura infantil, membro da Academia Brasileira de Letras, fundadora da primeira livraria infantil do Brasil e autora de mais de cem obras traduzidas.',
          dataNascimento: new Date('1941-12-24'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Ana_Maria_Machado.jpg'
        },
        {
          nome: 'Chico Buarque de Holanda',
          email: null,
          biografia: 'Chico Buarque (1944) é escritor e músico brasileiro. Autor de oito livros, peças de teatro e romances, já recebeu três prêmios Jabuti e vários outros nacionais e internacionais.',
          dataNascimento: new Date('1944-06-19'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Chico_Buarque_2010.jpg'
        },
        {
          nome: 'Adélia Prado',
          email: null,
          biografia: 'Adélia Prado (1935) é escritora brasileira, premiada com o Prêmio Jabuti e o Prêmio da Associação Paulista dos Críticos de Arte. Sua obra combina a experiência feminina com temas religiosos e do cotidiano.',
          dataNascimento: new Date('1935-12-13'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Ad%C3%A9lia_Prado_2014.jpg'
        },
        {
          nome: 'Eva Furnari',
          email: null,
          biografia: 'Eva Furnari (1948) é escritora brasileira de literatura infantil. Nascida na Itália, criada no Brasil, publicou mais de sessenta livros e ganhou dois prêmios Jabuti.',
          dataNascimento: new Date('1948-06-13'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Eva_Furnari.jpg'
        },
        {
          nome: 'Martha Medeiros',
          email: null,
          biografia: 'Martha Medeiros (1961) é escritora brasileira de livros, crônicas, peças e roteiros adaptados para cinema e TV. Seu livro "Felicidade Crônica" (2014) foi best-seller por meses.',
          dataNascimento: new Date('1961-08-20'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Martha_Medeiros.jpg'
        },
        {
          nome: 'Conceição Evaristo',
          email: null,
          biografia: 'Conceição Evaristo (1946) é uma das principais vozes da literatura afro-brasileira. Publicou contos, poemas e romances, sendo presença constante em eventos literários nacionais e internacionais.',
          dataNascimento: new Date('1946-11-29'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Conceição_Evaristo_2018.jpg'
        },
        {
          nome: 'André Dahmer',
          email: null,
          biografia: 'André Dahmer (1974) é cartunista e escritor brasileiro, vencedor do prêmio Jabuti com seu livro "Quadrinhos dos Anos 10". Conhecido por seu humor ácido e crítica social.',
          dataNascimento: new Date('1974-05-14'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/André_Dahmer.jpg'
        },
        {
          nome: 'Marcelino Freire',
          email: null,
          biografia: 'Marcelino Freire (1967) é escritor pernambucano, autor do livro premiado "Contos Negreiros" e fundador da Balada Literária. Sua obra é conhecida por estilo original e impactante.',
          dataNascimento: new Date('1967-09-06'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Marcelino_Freire.jpg'
        },
        {
          nome: 'Marçal Aquino',
          email: null,
          biografia: 'Marçal Aquino (1958) é escritor paulistano, roteirista de cinema e autor de diversos romances. Seu estilo é marcado por traços jornalísticos e realismo social.',
          dataNascimento: new Date('1958-11-29'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Marçal_Aquino.jpg'
        },
        {
          nome: 'Antônio Prata',
          email: null,
          biografia: 'Antônio Prata (1977) é cronista, contista e roteirista brasileiro. Autor de dez livros, colunista da Folha de S. Paulo e selecionado pela Granta como um dos vinte melhores escritores nacionais com menos de 40 anos.',
          dataNascimento: new Date('1977-08-22'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Antônio_Prata.jpg'
        },
        {
          nome: 'Ana Maria Gonçalves',
          email: null,
          biografia: 'Ana Maria Gonçalves (1970) é escritora mineira, autora de "Um Defeito de Cor" (2006), prêmio Casa de Las Américas, com obras publicadas em Portugal e Itália.',
          dataNascimento: new Date('1970-07-08'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Ana_Maria_Gonçalves.jpg'
        },
        {
          nome: 'Veronica Stigger',
          email: null,
          biografia: 'Veronica Stigger (1973) é escritora brasileira nascida em Porto Alegre. Autora de "Opisanie swiata" (2013), premiada com o Prêmio Machado de Assis e outros prêmios nacionais.',
          dataNascimento: new Date('1973-09-09'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Veronica_Stigger.jpg'
        },
        {
          nome: 'Luisa Geisler',
          email: null,
          biografia: 'Luisa Geisler (1991) é escritora brasileira, autora de três romances e vencedora do Prêmio Sesc de Literatura e finalista do Prêmio Jabuti.',
          dataNascimento: new Date('1991-02-07'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Luisa_Geisler.jpg'
        },
        {
          nome: 'Raphael Montes',
          email: null,
          biografia: 'Raphael Montes (1990) é escritor brasileiro de literatura policial. Autor de "Suicidas" e "Dias Perfeitos", teve seus livros finalistas de prêmios nacionais e traduzidos para diversos países.',
          dataNascimento: new Date('1990-01-22'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Raphael_Montes.jpg'
        },
        {
          nome: 'Daniel Galera',
          email: null,
          biografia: 'Daniel Galera (1979) é escritor gaúcho, autor de "Barba Ensopada de Sangue", vencedor do Prêmio São Paulo de Literatura. Participa de eventos literários importantes como a FLIP.',
          dataNascimento: new Date('1979-04-29'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Daniel_Galera.jpg'
        },
        {
          nome: 'Ricardo Terto',
          email: null,
          biografia: 'Ricardo Terto (1986) é escritor paulista, autor de "Marmitas Frias" (2017). Seus textos abordam vivências pessoais, política e cotidiano, com grande repercussão na internet.',
          dataNascimento: new Date('1986-03-15'),
          foto: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Ricardo_Terto.jpg'
        }
    ],
  });

  // Criar livros
  await prisma.livro.createMany({
    data: [
      // Adicione os dados dos livros aqui, incluindo o autorId
    ],
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });