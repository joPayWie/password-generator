/* DOM FUNCTIONS */ 

const $$ = (selector) => document.querySelectorAll(selector)
const $ = (selector) => document.querySelector(selector)

/***************** VARIABLES ***************/  

/* *************** array data ***************** */

const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const capsLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const symbols = ['$', '#', '?', '&', '+', '!'];


/* *************** DOM selectors ***************** */

const $passItself = $("#password-itself")
const $refreshPass = $("#refresh-token")
const $copyPass = $("#copy-password")
const $generatePass = $("#generate-password")
const $$generateOrRefreshNewPass = $$(".generate-new-pass")
const $$letterSelection = $$(".letter-selection")


/* *************** password option inputs ***************** */

const $containsLetters = $("#letters")
const $containsNumbers = $("#numbers")
const $containsSymbols = $("#symbols")
const $char8 = $("#char8")
const $char12 = $("#char12")
const $char16 = $("#char16")
const $lowercase = $("#lower")
const $capital = $("#caps")


/***************** FUNCTIONS *******************/ 

const getRandomCharacter = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    let randomSelection = array[randomIndex];
    return randomSelection  
} 

const generateLargePassword = () => {
    let passArray = [];
    while (passArray.length < 64) {
        let character = getRandomCharacter(lowerLetters)
        passArray.push(character)
        character = getRandomCharacter(numbers)
        passArray.push(character)
        character = getRandomCharacter(symbols)
        passArray.push(character)
        character = getRandomCharacter(capsLetters)
        passArray.push(character)
    }
    return passArray
}


const defineCheckedCharacters = () => {
    let passArray = generateLargePassword()
    if (!$lowercase.checked) {
        passArray = passArray.filter((letter) => {
            return !lowerLetters.includes(letter)
        })
    }
    if (!$capital.checked) {
        passArray = passArray.filter((letter) => {
            return !capsLetters.includes(letter)
        })
    } 
    if (!$containsNumbers.checked) {
        passArray = passArray.filter((number) => {
            return !numbers.includes(number)
        })
    }
    if (!$containsSymbols.checked) {
        passArray = passArray.filter((symbol) => {
            return !symbols.includes(symbol)
        })
    }
    return passArray
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

const cutPassword = () => {
    let passLength = stablishLength();
    let passToCut = defineCheckedCharacters();
    passToCut = passToCut.slice(0,passLength);
    return passToCut
}         

const shuffleCharacters = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const getFinalPassword = () => {
    let passwordGenerated = shuffleCharacters(cutPassword())
    return passwordGenerated.join('')
}

const showPassOnDisplay = () => {
    $passItself.innerHTML = `${getFinalPassword()}`
}

showPassOnDisplay()

/***************** EVENTS *******************/

$copyPass.addEventListener("click", (e) => {
    const $copyTxt = $(".copy-text")
    navigator.clipboard.writeText($passItself.innerText);
    $copyTxt.innerHTML = 'COPIED!';
    $copyTxt.style.color = '#ffd000';
    $copyPass.style.backgroundColor = '#723D63';
    const returnToPreviousCopyBtn = () => {
        $copyPass.removeAttribute('style');
        $copyTxt.removeAttribute('style');
        $copyTxt.innerHTML = 'Copy to clipboard';
    }
    window.setTimeout(returnToPreviousCopyBtn, 750)
})

$containsLetters.addEventListener("click", (e) => {
    if (!$containsLetters.checked) {
        $capital.checked = false
        $lowercase.checked = false
        $lowercase.setAttribute("disabled", '');
        $capital.setAttribute("disabled", '');
    }
    if ($containsLetters.checked) {
        $lowercase.removeAttribute("disabled", '');
        $capital.removeAttribute("disabled", '');
        $lowercase.checked = true
        $capital.checked = true
    }
})

for (const letterTypeCheckbox of $$letterSelection) {
    letterTypeCheckbox.addEventListener("click", (e) => {
        if (!$lowercase.checked && !$capital.checked) {
            $containsLetters.setAttribute("disabled", '')
        }
        if ($lowercase.checked || $capital.checked) {
            $containsLetters.removeAttribute("disabled", '')
        }
    })
}

for (const button of $$generateOrRefreshNewPass) {
    button.addEventListener("click", (e) => {
        showPassOnDisplay()
    })
}
