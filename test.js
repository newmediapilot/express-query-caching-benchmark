import {spawn} from 'node:child_process'
import {readFileSync} from 'fs'
import {performance} from 'perf_hooks'

const {data} = JSON.parse(readFileSync('./data.json', 'utf8'))
const timeout = async (t) => await new Promise(resolve => setTimeout(resolve, t));

(async () => {

    console.log("Starting benchmark...")
    await timeout(1000);
    spawn("npx", ["json-server", "data.json"], {stdio: 'inherit', shell: true})
    await timeout(2000);
    spawn("node", ["server.js"], {stdio: 'inherit', shell: true})
    await timeout(3000);

    const DURATION = 10000;

    const uncachedStart = performance.now()
    for (let j = 0; j < DURATION; j++) {
        const node = data[Math.floor(Math.random() * data.length)]
        const path = `http://localhost:3001/uncached/${node.id}`;
        await fetch(path)
    }
    const uncachedDuration = performance.now() - uncachedStart

    const cachedStart = performance.now()
    for (let i = 0; i < DURATION; i++) {
        const node = data[Math.floor(Math.random() * data.length)]
        const path = `http://localhost:3001/cached/${node.id}`;
        await fetch(path)
    }
    const cachedDuration = performance.now() - cachedStart

    console.log('uncached [ms]', uncachedDuration);
    console.log('cached [ms]', cachedDuration);

    await timeout(3000);

    process.exit(0);
})()




