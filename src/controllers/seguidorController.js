import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seguidorController = {

	// SEGUIR UM ESCRITOR
	async seguirEscritor(req, res) {
		try {
			const { escritorId } = req.params;
			const usuarioId = req.user.id; // Vem do middleware de autenticação

			// Verificar se o escritor existe
			const escritor = await prisma.escritor.findUnique({
				where: { id: parseInt(escritorId) }
			});

			if (!escritor) {
				return res.status(404).json({
					erro: "Escritor não encontrado"
				});
			}

			// Verificar se já está seguindo
			const jaSegue = await prisma.seguidor.findUnique({
				where: {
					usuarioId_escritorId: {
						usuarioId: usuarioId,
						escritorId: parseInt(escritorId)
					}
				}
			});

			if (jaSegue) {
				return res.status(400).json({
					erro: "Você já segue este escritor"
				});
			}

			// Criar o relacionamento de seguidor
			const novoSeguidor = await prisma.seguidor.create({
				data: {
					usuarioId: usuarioId,
					escritorId: parseInt(escritorId)
				},
				include: {
					escritor: {
						select: {
							id: true,
							nome: true,
							foto: true
						}
					}
				}
			});

			res.status(201).json({
				mensagem: `Agora você está seguindo ${escritor.nome}!`,
				seguidor: {
					id: novoSeguidor.id,
					seguidoEm: novoSeguidor.seguidoEm,
					escritor: novoSeguidor.escritor
				}
			});

		} catch (error) {
			console.error("Erro ao seguir escritor:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	},

	// DEIXAR DE SEGUIR UM ESCRITOR
	async deixarDeSeguir(req, res) {
		try {
			const { escritorId } = req.params;
			const usuarioId = req.user.id;

			// Verificar se está seguindo
			const seguidor = await prisma.seguidor.findUnique({
				where: {
					usuarioId_escritorId: {
						usuarioId: usuarioId,
						escritorId: parseInt(escritorId)
					}
				},
				include: {
					escritor: {
						select: {
							nome: true
						}
					}
				}
			});

			if (!seguidor) {
				return res.status(404).json({
					erro: "Você não segue este escritor"
				});
			}

			// Remover o relacionamento
			await prisma.seguidor.delete({
				where: {
					usuarioId_escritorId: {
						usuarioId: usuarioId,
						escritorId: parseInt(escritorId)
					}
				}
			});

			res.status(200).json({
				mensagem: `Você deixou de seguir ${seguidor.escritor.nome}`
			});

		} catch (error) {
			console.error("Erro ao deixar de seguir:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	},

	// LISTAR ESCRITORES QUE O USUÁRIO SEGUE
	async listarEscritoresSeguindo(req, res) {
		try {
			const usuarioId = req.user?.id || parseInt(req.params.usuarioId);

			const escritoresSeguindo = await prisma.seguidor.findMany({
				where: {
					usuarioId: usuarioId
				},
				include: {
					escritor: {
						select: {
							id: true,
							nome: true,
							biografia: true,
							foto: true,
							dataNascimento: true,
							dataFalecimento: true,
							_count: {
								select: {
									livros: true,
									seguidores: true
								}
							}
						}
					}
				},
				orderBy: {
					seguidoEm: 'desc'
				}
			});

			const resultado = escritoresSeguindo.map(seguidor => ({
				seguidorId: seguidor.id,
				seguidoEm: seguidor.seguidoEm,
				escritor: {
					...seguidor.escritor,
					totalLivros: seguidor.escritor._count.livros,
					totalSeguidores: seguidor.escritor._count.seguidores
				}
			}));

			res.status(200).json({
				mensagem: `${resultado.length} escritores sendo seguidos`,
				total: resultado.length,
				escritores: resultado
			});

		} catch (error) {
			console.error("Erro ao listar escritores seguindo:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	},

	// LISTAR SEGUIDORES DE UM ESCRITOR
	async listarSeguidoresEscritor(req, res) {
		try {
			const { escritorId } = req.params;

			// Verificar se o escritor existe
			const escritor = await prisma.escritor.findUnique({
				where: { id: parseInt(escritorId) }
			});

			if (!escritor) {
				return res.status(404).json({
					erro: "Escritor não encontrado"
				});
			}

			const seguidores = await prisma.seguidor.findMany({
				where: {
					escritorId: parseInt(escritorId)
				},
				include: {
					usuario: {
						select: {
							id: true,
							nome: true,
							nomeUsuario: true,
							foto: true,
							entrouEm: true
						}
					}
				},
				orderBy: {
					seguidoEm: 'desc'
				}
			});

			const resultado = seguidores.map(seguidor => ({
				seguidorId: seguidor.id,
				seguidoEm: seguidor.seguidoEm,
				usuario: seguidor.usuario
			}));

			res.status(200).json({
				mensagem: `${resultado.length} seguidores para ${escritor.nome}`,
				escritor: {
					id: escritor.id,
					nome: escritor.nome,
					foto: escritor.foto
				},
				totalSeguidores: resultado.length,
				seguidores: resultado
			});

		} catch (error) {
			console.error("Erro ao listar seguidores do escritor:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	},

	// VERIFICAR SE USUÁRIO SEGUE UM ESCRITOR
	async verificarSeSegue(req, res) {
		try {
			const { escritorId } = req.params;
			const usuarioId = req.user.id;

			const segue = await prisma.seguidor.findUnique({
				where: {
					usuarioId_escritorId: {
						usuarioId: usuarioId,
						escritorId: parseInt(escritorId)
					}
				}
			});

			res.status(200).json({
				segue: !!segue,
				seguidoEm: segue?.seguidoEm || null
			});

		} catch (error) {
			console.error("Erro ao verificar se segue:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	},

	// ESTATÍSTICAS DE SEGUIDOR DE UM USUÁRIO
	async estatisticasUsuario(req, res) {
		try {
			const usuarioId = req.user?.id || parseInt(req.params.usuarioId);

			const [totalSeguindo] = await Promise.all([
				prisma.seguidor.count({
					where: { usuarioId: usuarioId }
				})
			]);

			// Escritores mais seguidos que o usuário segue
			const escritoresMaisSeguidos = await prisma.seguidor.findMany({
				where: { usuarioId: usuarioId },
				include: {
					escritor: {
						select: {
							id: true,
							nome: true,
							foto: true,
							_count: {
								select: {
									seguidores: true,
									livros: true
								}
							}
						}
					}
				},
				orderBy: {
					escritor: {
						seguidores: {
							_count: 'desc'
						}
					}
				},
				take: 5
			});

			res.status(200).json({
				estatisticas: {
					totalEscritoresSeguindo: totalSeguindo,
					escritoresMaisSeguidos: escritoresMaisSeguidos.map(s => ({
						...s.escritor,
						totalSeguidores: s.escritor._count.seguidores,
						totalLivros: s.escritor._count.livros
					}))
				}
			});

		} catch (error) {
			console.error("Erro ao buscar estatísticas:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	},

	// ESCRITORES MAIS SEGUIDOS (RANKING GERAL)
	async escritoresMaisSeguidos(req, res) {
		try {
			const limite = parseInt(req.query.limite) || 10;

			const escritores = await prisma.escritor.findMany({
				include: {
					_count: {
						select: {
							seguidores: true,
							livros: true
						}
					}
				},
				orderBy: {
					seguidores: {
						_count: 'desc'
					}
				},
				take: limite
			});

			const resultado = escritores.map((escritor, index) => ({
				posicao: index + 1,
				id: escritor.id,
				nome: escritor.nome,
				biografia: escritor.biografia,
				foto: escritor.foto,
				dataNascimento: escritor.dataNascimento,
				dataFalecimento: escritor.dataFalecimento,
				totalSeguidores: escritor._count.seguidores,
				totalLivros: escritor._count.livros
			}));

			res.status(200).json({
				mensagem: `Top ${limite} escritores mais seguidos`,
				ranking: resultado
			});

		} catch (error) {
			console.error("Erro ao buscar escritores mais seguidos:", error);
			res.status(500).json({
				erro: "Erro interno do servidor",
				detalhes: error.message
			});
		}
	}

};