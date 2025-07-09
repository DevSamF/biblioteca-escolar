import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import adminRoutes from './routes/admin'
import alunoRoutes from './routes/alunos'
import livroRoutes from './routes/livros'
import emprestimoRoutes from './routes/emprestimos'

const app = Fastify()
const prisma = new PrismaClient()

app.decorate('prisma', prisma)

app.register(adminRoutes)
app.register(alunoRoutes)
app.register(livroRoutes)
app.register(emprestimoRoutes)

app.listen({ port: 3333 }, () => {
  console.log('Servidor rodando em http://localhost:3333')
})
