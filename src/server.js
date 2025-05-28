import e from 'express';
import 'dotenv/config'

const app = e()

app.use(e.json())

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})