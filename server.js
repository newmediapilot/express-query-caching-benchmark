import express from 'express'
import cors from 'express'

const app = express()
const port = 3001

app.use(cors())

const cached = {}

app.get('/cached/:id', async ({params: {id}}, res) => {
    const path = `http://localhost:3000/data/${id}`;
    if (!!cached[path]) {
        res.send(cached[path])
    } else {
        const response = await fetch(path);
        cached[path] = await response.json();
        res.send(cached[path]);
    }
})

app.get('/uncached/:id', async ({params: {id}}, res) => {
    const path = `http://localhost:3000/data/${id}`;
    const response = await fetch(path);
    res.send(await response.json());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})