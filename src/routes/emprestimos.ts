import { FastifyInstance } from 'fastify'
import { StatusEmprestimo } from '@prisma/client'

export default async function emprestimoRoutes(app: FastifyInstance) {
  app.post('/emprestimos', async (req, reply) => {
    const { alunoId, livroId, dataDevolucaoPrevista } = req.body as any

    const emprestimo = await app.prisma.emprestimo.create({
      data: {
        alunoId,
        livroId,
        dataDevolucaoPrevista: new Date(dataDevolucaoPrevista),
        status: StatusEmprestimo.EMPRESTADO,
      },
    })

    reply.code(201).send(emprestimo)
  })

  app.get('/emprestimos', async (req, reply) => {
    const lista = await app.prisma.emprestimo.findMany({
      include: {
        aluno: true,
        livro: true,
      },
    })

    reply.send(lista)
  })
}
