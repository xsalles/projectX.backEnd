import e from 'express';
import 'dotenv/config'
import { authRoutes } from './routes/auth.routes.js';

const app = e()

app.use(e.json())
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})