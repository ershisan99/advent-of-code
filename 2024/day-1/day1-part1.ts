import * as path from 'path'
import {sum, zipWith} from 'remeda'

export async function day1Part1() {
    const input = await Bun.file(path.join(__dirname, 'input.txt')).text()
    const lines = input.split('\n')
    const column1: number[] = []
    const column2: number[] = []

    for (const line of lines) {
        const [left, right] = line.split('   ')
        column1.push(Number.parseInt(left, 10))
        column2.push(Number.parseInt(right, 10))
    }

    column1.sort().reverse()
    column2.sort().reverse()

    let result = 0

    for (let i = 0; i < column1.length; i++) {
        const left = column1[i]
        const right = column2[i]
        const diff = Math.abs(left - right)
        result += diff
    }
    const foo = sum(zipWith(column1, column2, (a, b) => Math.abs(a - b)))

    console.log({result, foo})
}