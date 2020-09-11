const generate = document.getElementById('generate');
const resetButton = document.getElementById('reset');
const copyText = document.getElementById('copytext');
const collapsible = document.getElementById('collapsible');
const formData = document.getElementById('everything').elements;

main();

function main()
{
    generate.addEventListener('click', genTestCase);
    resetButton.addEventListener('click', hardReset);
    copyText.addEventListener('click', copy);
    collapsible.addEventListener('click', toggleCollapse);

    document.getElementById('datatype2').onchange = function() {
        document.getElementById('minLen').disabled = !this.checked;
        document.getElementById('maxLen').disabled = !this.checked;
    };
    document.getElementById('datatype1').onchange = function() {
        document.getElementById('minRange').disabled = !this.checked;
        document.getElementById('maxRange').disabled = !this.checked;
        document.getElementById('decimals').disabled = !this.checked;
    };
}

function genTestCase()
{
    let finalTestCase = [];
    let strOptList = makeChoiceArr();
    let numCases = formData.namedItem('numCases').value;
    if(!numCases || numCases < 1) return;
    for(let i = 0; i < numCases; i++)
    {
        finalTestCase.push(genList(strOptList));
    }
    let caseDelim = formData.namedItem('caseDelim').value;
    if(!caseDelim) caseDelim = '\n';
    document.getElementById('result').value = finalTestCase.join(caseDelim);
}

function genList(strOptList)
{
    let elemList = [];
    let elementDelim = formData.namedItem('separateC').value;
    let maxVal = parseInt(formData.namedItem('maxRange').value);
    let minVal = parseInt(formData.namedItem('minRange').value);
    let maxLen = parseInt(formData.namedItem('maxLen').value);
    let minLen = parseInt(formData.namedItem('minLen').value);
    let inputLength = parseInt(formData.namedItem('numbers').value);

    while(inputLength > 0 && elemList.length != inputLength)
    {
        if(formData.namedItem('datatype1').checked)
        {
            let num = Math.random() * (maxVal - minVal);
            if(!formData.namedItem('decimals').value || formData.namedItem('decimals').value < 0) {
                num = Math.floor(num) + minVal;
            }
            else {
                num = (num + minVal).toFixed(formData.namedItem('decimals').value);
            }
            elemList.push(num);
        }
        if(formData.namedItem('datatype2').checked)
        {
            if(strOptList === undefined) return;
            let strLen = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
            let str = '';
            for(let i = 0; i < strLen; i++)
            {
                str = str + getRandomChar(strOptList);
            }
            if(formData.namedItem('capFirst').checked) str = str.charAt(0).toUpperCase() + str.slice(1);
            if(formData.namedItem('quote').checked) str = `"${str}"`;
            elemList.push(str);
        }
    }
    if(!elementDelim) elementDelim = ' ';
    let finalList = elemList.join(elementDelim);
    finalList = formData.namedItem('startingC').value + finalList + formData.namedItem('endingC').value;
    return finalList;
}

/*
Creates an array of options based on user selections.
This array contains everything the user wants in their string test case.
Ex: If the user wants numbers and uppercase in their test, the array returned
would be ['a', 'b', 'c' ... 'z', '0', '1' ... '9']
*/
function makeChoiceArr()
{
    let optionArr = [];
    const settings = document.getElementsByClassName('strOptions');
    for(let i = 0; i < settings.length; i++)
    {
        if(settings[i].checked) {
            optionArr.push(i);
        }
    } //[lc, uc, num, sp, other]
    if(optionArr.length == 0) return undefined; //nothing was selected

    let possibilities = [];
    for(let i = 0; i < optionArr.length; i++)
    {
        if(optionArr[i] == 0) { //a-z
            for(let j = 97; j <= 122; j++)
            {
                possibilities.push(String.fromCharCode(j));
            }
        }
        if(optionArr[i] == 1) { //A-Z
            for(let j = 65; j <= 90; j++)
            {
                possibilities.push(String.fromCharCode(j));
            }
        }
        if(optionArr[i] == 2) { //0-9
            for(let j = 48; j <= 57; j++)
            {
                possibilities.push(String.fromCharCode(j));
            }
        }
        if(optionArr[i] == 3) {
            possibilities.push(' ');
        }
        if(optionArr[i] == 4) {
            let otherChars = '!@#$%^&*()-_=+{}[];:/.,<>|~?';
            for(const c of otherChars) {
                possibilities.push(c);
            }
        }
    }
    return possibilities;
}

/*
Picks a random index from the input array
*/
function getRandomChar(inputArr)
{
    return inputArr[Math.floor(Math.random() * inputArr.length)];
}

function copy()
{
    let text = document.getElementById('result');
    text.select();
    document.execCommand('copy');
}

function toggleCollapse()
{
    let content = collapsible.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function hardReset()
{
    document.getElementById('minRange').disabled = false;
    document.getElementById('maxRange').disabled = false;
    document.getElementById('decimals').disabled = false;

    document.getElementById('minLen').disabled = true;
    document.getElementById('maxLen').disabled = true;
}
