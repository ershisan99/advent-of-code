import * as path from 'path'

export async function day1Part2() {
    const start = performance.now()
    const input = await Bun.file(path.join(__dirname, 'input.txt')).text()
    const lines = input.split('\n')
    const column1: number[] = []
    const column2Map = new Map()

    for (const line of lines) {
        const [left, right] = line.split('   ')
        const n1 = Number.parseInt(left, 10)
        const n2 = Number.parseInt(right, 10)
        column1.push(n1)

        if (column2Map.has(n2)) {
            const v = column2Map.get(n2)
            column2Map.set(n2, v + 1)
        } else {
            column2Map.set(n2, 1)
        }
    }

    let result = 0
    for (let i = 0; i < column1.length; i++) {
        const left = column1[i]
        if(!column2Map.has(left)){
            continue
        }
        const multiplier = column2Map.get(left)

        result += multiplier * left
    }

    const end = performance.now()

    console.log({result, time: end - start})
}