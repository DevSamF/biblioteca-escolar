import { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'

export default async function adminRoutes(app: FastifyInstance) {
  app.post('/admin', async (req, reply) => {
    const { nome, email, senha } = req.body as any
    const senhaHash = await bcrypt.hash(senha, 8)

    const admin = await app.prisma.admin.create({
      data: { nome, email, senhaHash },
    })

    reply.code(201).send({ id: admin.id, nome: admin.nome, email: admin.email })
  })
}
