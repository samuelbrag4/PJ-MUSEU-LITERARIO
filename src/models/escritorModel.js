import prisma from "../../prisma/prisma.js";

class EscritorModel {
	// Buscar todos os escritores
	async findAll() {
		return await prisma.escritor.findMany({
			include: { 
				livros: true,
				_count: {
					select: {
						seguidores: true,
						livros: true
					}
				}
			},
		});
	}

	// Buscar escritor por ID
	async findById(id) {
		return await prisma.escritor.findUnique({
			where: { id: Number(id) },
			include: { 
				livros: true,
				_count: {
					select: {
						seguidores: true,
						livros: true
					}
				}
			},
		});
	}

	// Criar escritor
	async create(data) {
		return await prisma.escritor.create({ data });
	}

	// Atualizar escritor
	async update(id, data) {
		return await prisma.escritor.update({
			where: { id: Number(id) },
			data,
		});
	}

	// Deletar escritor
	async delete(id) {
		await prisma.escritor.delete({ where: { id: Number(id) } });
		return true;
	}
}

export default new EscritorModel();
