const res = await fetch('wordList.txt')
let wordList = await res.text()
wordList = wordList.toString().split(/\r?\n/)
export default wordList

export const answer = "actor"