/* DOM FUNCTIONS */ 

const $$ = (selector) => document.querySelectorAll(selector)
const $ = (selector) => document.querySelector(selector)

/* VARIABLES */

/* *************** array data ***************** */

const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const capsLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const symbols = ['$', '#', '?', '&', '+', '!'];


/* *************** DOM selectors ***************** */

const $passDisplay = $("#display-password")
const $passItself = $("#password-itself")
const $refreshPass = $("#refresh-token")
const $copyPass = $("copy-password")


/* *************** password option inputs ***************** */

const $containsLetters = $("#letters")
const $containsNumbers = $("#numbers")
const $containsSymbols = $("#symbols")
const $char8 = $("#char8")
const $char12 = $("#char12")
const $char16 = $("#char16")
const $lowercase = $("#lower")
const $capital = $("#caps")


/* FUNCTIONS */

const getRandomCharacter = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    let randomSelection = array[randomIndex];
    return randomSelection  
} 

const shuffleCharacters = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const stablishLength = () => {
    let passwordLength;
    if ($char8.checked) {
        passwordLength = 8
    }
    else if ($char12.checked) {
        passwordLength = 12
    }
    else {
        passwordLength = 16
    }
    return passwordLength
} 

// MAKE FUNCTION FOR PASSWORD WITH ONLY LETTERS (caps and lower)


// MAKE FUNCTION FOR LOOPING THROUGH ARRAYS (NUMBERS AND SYMBOLS)

const generatePassword = () => {
    let password
    let passArray = [];
    let passwordLength = stablishLength();
    if ($containsLetters.checked && !$containsNumbers.checked && !$containsSymbols.checked && !$capital.checked) {
        // for (let i = 0; i < passwordLength; i++) 
        while (passArray.length < passwordLength) {
            let character = getRandomCharacter(lowerLetters)
            passArray.push(character)
        }
    }
    if ($containsLetters.checked && $containsNumbers.checked && !$containsSymbols.checked && !$capital.checked) {
        // let newArray = lowerLetters.concat(numbers)
        // for (let i = 0; i < passwordLength / 2; i++) 
        while (passArray.length < passwordLength) {
            let character = getRandomCharacter(lowerLetters)
            passArray.push(character)
            character = getRandomCharacter(numbers)
            passArray.push(character)
        }
    }                         
    if ($containsLetters.checked && $containsNumbers.checked && $containsSymbols.checked && !$capital.checked) {
        // let newArray = lowerLetters.concat(numbers)
        // newArray = newArray.concat(symbols)
        // for (let i = 0; i < passwordLength / 3; i++) 
        while (passArray.length < passwordLength) {
            let character = getRandomCharacter(lowerLetters)
            passArray.push(character)
            character = getRandomCharacter(numbers)
            passArray.push(character)
            character = getRandomCharacter(symbols)
            passArray.push(character)
        }
        // if (passArray.length === 18) {
        //     passArray.slice(0,16)
        // }
        
    }

    console.log(passArray.length)
    if (passArray.length === 9) {
            passArray.slice(0,7)
        }  // no anda por resolver
        console.log(passArray.length)
    shuffleCharacters(passArray)
    return passArray.join('')
}

const showPassOnDisplay = () => {
    let passwordGenerated = generatePassword()
    // for (let i = 0; i < passwordGenerated.length; i++) {
    //     if (typeof i === 'number') {
    //         passwordGenerated.charAt(i).style.color = "red"  // PENDIENTE RESOLVER
    //     }
    // }
    $passItself.innerHTML = `${passwordGenerated}`
}

showPassOnDisplay()

// events

// make an event change that disables lower and caps checkbox if user doesn't check letter options
