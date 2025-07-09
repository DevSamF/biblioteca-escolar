import { FastifyInstance } from 'fastify'

export default async function alunoRoutes(app: FastifyInstance) {
  app.post('/alunos', async (req, reply) => {
    const data = req.body as any
    const aluno = await app.prisma.aluno.create({ data })
    reply.code(201).send(aluno)
  })

  app.get('/alunos', async (req, reply) => {
    const alunos = await app.prisma.aluno.findMany({
      include: { emprestimos: true },
    })
    reply.send(alunos)
  })
}
