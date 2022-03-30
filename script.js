import wordList from './wordList.js'
import {answer} from './wordList.js'


const NUMBER_OF_GUESSES = 6
const LENGTH_OF_WORD = 5
const ANSWER = 'actor'
let gameWon = false
let gameOver = false

let currentCol = 1
let currentRow = 1
let currentColEl

createBoard(NUMBER_OF_GUESSES, LENGTH_OF_WORD)
startGame()

window.onkeydown = (e) => {
    if (!isAlphaKey(e) && !isDeleteKey(e) && !isReturnKey(e)) {   //do nothing if not a-z, delete, return
        e.preventDefault()
    } 
}


window.onkeyup = (e) => {
    if (!isAlphaKey(e) && !isDeleteKey(e) && !isReturnKey(e)) {   //do nothing if not a-z, delete, return
        e.preventDefault()
    } else if (isAlphaKey(e) && currentCol === 6) {
        e.preventDefault()
    } else if (isDeleteKey(e) && currentCol === 1) {
        e.preventDefault()
    } else if (!gameOver) {
        if (isAlphaKey(e)) {
            nextCol()
        } else if (isDeleteKey(e)) {
            prevCol()  
        } else if (isReturnKey(e)) {
            const word = getWord()
            submitWord(word)
        }   
    }
}

//helper functions

function createBoard(numberOfGuesses, lengthOfWord) {
    let rows = new Array(numberOfGuesses).fill(0)
    let columns = new Array(lengthOfWord).fill(0)

    rows.forEach((row, rowIndex) => {
        const rowEl = document.createElement('div')
        rowEl.id = `r${rowIndex+1}`
        rowEl.className = "row"
        columns.forEach((column, colIndex) => {
            const colEl = document.createElement('input')
            colEl.id = `r${rowIndex + 1}-c${colIndex + 1}`
            colEl.className = "col"
            colEl.setAttribute('maxlength', 1)
            colEl.setAttribute('disabled', true)
            rowEl.appendChild(colEl)
        })
        document.getElementById('board').appendChild(rowEl)
    })
}

function startGame() {
    currentColEl = document.getElementById(`r1-c1`)
    currentColEl.removeAttribute('disabled')
    currentColEl.focus()
}



function isAlphaKey(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        return true;
      }
      return false;
}

function isDeleteKey(e) {
    if (e.keyCode === 8) {
        return true
    }

    return false
}

function isReturnKey(e) {
    if (e.keyCode === 13) {
        return true
    }

    return false
}

function nextCol() {
    currentColEl.setAttribute('disabled', true)
    currentCol++
    if (currentCol !== 6) {
        currentColEl = document.getElementById(`r${currentRow}-c${currentCol}`)
        currentColEl.removeAttribute('disabled')
        currentColEl.focus()
    }
}

function prevCol() {
    currentColEl.value = ''
    currentCol--
    currentColEl = document.getElementById(`r${currentRow}-c${currentCol}`)
    currentColEl.removeAttribute('disabled')
    currentColEl.focus()
}

function getWord() {
    let word = ''
    const currentRowEl = document.getElementById(`r${currentRow}`)
    let rowChildren = currentRowEl.childNodes

    const letters = [...rowChildren]
    letters.forEach(letter => {
        word += letter.value 
    })
    return word
}

function isValidWord(word) {
    word = word.toLowerCase()
    if (wordList.includes(word)) {
        return true
    } else {
        return false
    }
}

function showCorrectLetters(word) {
    let wordArr = word.split('')
    let answerArr = answer.split('')
    wordArr.forEach((letter, index) => {
        const colEl = document.getElementById(`r${currentRow}-c${index + 1}`)
        if (letter === answer[index]) {
            colEl.style.background = "#538d4e"
            colEl.style.border = '1px solid #538d4e'
        } else if (answerArr.includes(letter)) {
            colEl.style.background = "#b59f3b"
            colEl.style.border = '1px solid #b59f3b'
        } else {
            colEl.style.background = "#86888a"
        }
            
    })

}

function submitWord(word) {
    if (currentCol !== 6) {
        console.log('Not enough letters')
    } else if (!isValidWord(word)) {
        console.log("Invalid word")
    } else {
        showCorrectLetters(word)
        checkForWinner(word)
    }
}

function checkForWinner(word) {
    if (word.toLowerCase() === answer) {
        gameWon = true
        endGame()
    } else if (currentRow === 6) {
        endGame()
    } else {
        nextRow()
    }
}

function endGame() {
    gameOver = true
    if (gameWon) {
        console.log('You Win!')
    } else {
        console.log("You Lose!")
    }
}

function nextRow() {
    currentRow++
    currentCol = 1
    currentColEl = document.getElementById(`r${currentRow}-c${currentCol}`)
    currentColEl.removeAttribute('disabled')
    currentColEl.focus()
}