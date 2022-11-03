// DOM el
const resultEl = document.getElementById('pasdisplay');
const lengthEl = document.getElementById('Lenght');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generateBtn');
const copyEl = document.getElementById('copyclipboard');


const randomFunc = {
    lower: randomLowercase,
    upper: randomUppercase,
    number: randomNumber,
    symbol: randomSymbol
}

//generate event listener

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

   resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumbers, hasSymbols, length);
});

// copy to clipboard

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied!')
});


//generate pass function
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
        
    );

    // console.log('typesArr: ', typesArr);

    if(typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
           // console.log('funcName: ', funcName)

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

//generate functions (http://www.net-comber.com/charset.html)

function randomLowercase () {
 return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUppercase () {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomNumber () {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSymbol () {
    const symbols = '!@#$%^&*(){}=[]<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]
}
