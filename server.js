import express from 'express'
import apicache from 'apicache'

const app = express()
const port = 3001
let cache = apicache.middleware

app.get('/cached/:id', cache('5 minutes'), async ({params: {id}}, res) => {
    const path = `http://localhost:3000/data/${id}`;
    const response = await fetch(path);
    res.send(await response.json());
})

app.get('/uncached/:id', async ({params: {id}}, res) => {
    const path = `http://localhost:3000/data/${id}`;
    const response = await fetch(path);
    res.send(await response.json());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})