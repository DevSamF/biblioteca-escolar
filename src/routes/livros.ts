import { FastifyInstance } from 'fastify'

export default async function livroRoutes(app: FastifyInstance) {
  app.post('/livros', async (req, reply) => {
    const data = req.body as any
    const livro = await app.prisma.livro.create({ data })
    reply.code(201).send(livro)
  })

  app.get('/livros', async (req, reply) => {
  const livros = await app.prisma.livro.findMany({
    include: {
      emprestimos: {
        where: {
          status: 'EMPRESTADO',
        },
        include: {
          aluno: true, // pega nome, matrícula, etc
        },
      },
    },
  })

  // transforma os dados pra dizer "está emprestado ou não"
  const resposta = livros.map((livro) => {
    const emprestado = livro.emprestimos.length > 0

    return {
      id: livro.id,
      titulo: livro.titulo,
      autor: livro.autor,
      genero: livro.genero,
      isbn: livro.isbn,
      quantidade: livro.quantidade,
      criadoEm: livro.criadoEm,
      emprestado,
      emprestimos: livro.emprestimos.map((e) => ({
        alunoId: e.aluno.id,
        nome: e.aluno.nome,
        turma: e.aluno.turma,
        curso: e.aluno.curso,
        dataEmprestimo: e.dataEmprestimo,
        dataDevolucaoPrevista: e.dataDevolucaoPrevista,
      })),
    }
  })

  reply.send(resposta)
})

}
