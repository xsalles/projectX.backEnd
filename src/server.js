import e from 'express';
import 'dotenv/config'
import { authRoutes } from './routes/auth.routes.js';
import cors from 'cors'

const app = e()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(e.json())

app.use('/api/auth', authRoutes)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})