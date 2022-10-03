/* DOM FUNCTIONS */ 

const $$ = (selector) => document.querySelectorAll(selector)
const $ = (selector) => document.querySelector(selector)

/***************** VARIABLES ***************/  

/* *************** data array  ***************** */

const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const capsLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ['$', '#', '?', '&', '+', '!', '%', '@', '='];
const multidimensionalArray = [numbers, lowerLetters, symbols, capsLetters]

/* *************** DOM selectors ***************** */

const $passItself = $("#password-itself")
const $refreshPass = $("#refresh-token")
const $copyPass = $("#copy-password")
const $generatePass = $("#generate-password")
const $$generateOrRefreshNewPass = $$(".generate-new-pass")
const $$letterSelection = $$(".letter-selection")
const $$ifNothingsChecked = $$(".if-nothings-checked")


/* *************** password option inputs ***************** */

const $containsLetters = $("#letters")
const $containsNumbers = $("#numbers")
const $containsSymbols = $("#symbols")
const $lowercase = $("#lower")
const $capital = $("#caps")


/***************** PASSWORD FUNCTIONS *******************/ 

const getRandomCharacter = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    let randomSelection = array[randomIndex];
    return randomSelection  
} 

const generateLargePassword = () => {
    let passArray = [];
    while (passArray.length < 64) {
        for (let i = 0; i < multidimensionalArray.length; i++) {
            let character = getRandomCharacter(multidimensionalArray[i])
            passArray.push(character)
        }
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

const cutPassword = () => {
    let passLength = $('input[name="length"]:checked').value;
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

/****************** DOM FUNCTIONS **************/

const disableBtn = (selector) => {
    selector.setAttribute('disabled','');
    selector.style.backgroundColor = 'gray';
    selector.style.cursor = 'auto';
}

const enableBtn = (selector) => {
    selector.removeAttribute('disabled','');
    selector.removeAttribute('style')
}

const disableCheckboxes = (selector) => {
    selector.checked = false
    selector.setAttribute("disabled", '');
}

const enableCheckboxes = (selector) => {
    selector.removeAttribute("disabled", '');
    selector.checked = true
}

const generatePush = () => {
    $passItself.innerHTML = `Push Generate⚡`;
    disableBtn($copyPass)
}

/***************** EVENTS *******************/

$copyPass.addEventListener("click", () => {
    const $copyTxt = $(".copy-text")
    navigator.clipboard.writeText($passItself.innerText);
    $copyTxt.innerHTML = 'COPIED!';
    $copyTxt.style.color = '#ffd000';
    $copyPass.style.backgroundColor = '#723D63';
    $passItself.style.color = '#16C60C';
    const returnToPreviousCopyBtn = () => {
        $copyPass.removeAttribute('style');
        $copyTxt.removeAttribute('style');
        $copyTxt.innerHTML = 'Copy to clipboard';
        $passItself.removeAttribute('style');
    }
    window.setTimeout(returnToPreviousCopyBtn, 750)
})

$containsLetters.addEventListener("click", () => {
    if (!$containsLetters.checked) {
        disableCheckboxes($capital)
        disableCheckboxes($lowercase)
    }
    if ($containsLetters.checked) {
        enableCheckboxes($lowercase)
        enableCheckboxes($capital)
    }
})

for (const letterTypeCheckbox of $$letterSelection) {
    letterTypeCheckbox.addEventListener("click", () => {
        if (!$lowercase.checked && !$capital.checked) {
            $containsLetters.checked = false
            generatePush() 
        }
        if ($lowercase.checked || $capital.checked) {
            $containsLetters.checked = true
            generatePush() 
        }
    })
}

for (const checkbox of $$ifNothingsChecked) {
    checkbox.addEventListener("click", () => {
        const $rotateArrows = $("#rotate")
        if (!$containsLetters.checked && !$containsNumbers.checked && !$containsSymbols.checked) {
            $passItself.innerHTML = `Select characters`;
            disableBtn($copyPass)
            disableBtn($generatePass)
            disableBtn($rotateArrows)
            $refreshPass.setAttribute('disabled','');
            $rotateArrows.classList.remove('active-rotate')
            $generatePass.classList.remove('hover-bolt')
        }
        else {
            generatePush() 
            enableBtn($generatePass)
            enableBtn($refreshPass)
            enableBtn($rotateArrows)
            $rotateArrows.classList.add('active-rotate')
            $generatePass.classList.add('hover-bolt')
        }
    })
}

for (const button of $$generateOrRefreshNewPass) {
    button.addEventListener("click", () => {
        showPassOnDisplay()
        enableBtn($copyPass)
    })
}