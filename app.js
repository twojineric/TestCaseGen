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
    if(formData.namedItem('datatype1').checked && !formData.namedItem('minRange').validity.valid) return;
    if(formData.namedItem('datatype1').checked && !formData.namedItem('maxRange').validity.valid) return;
    if(formData.namedItem('datatype2').checked && !formData.namedItem('minLen').validity.valid) return;
    if(formData.namedItem('datatype2').checked && !formData.namedItem('maxLen').validity.valid) return;
    if(!formData.namedItem('numbers').value || formData.namedItem('numbers').value < 1) return;
    let numCases = formData.namedItem('numCases').value;
    if(!numCases || numCases < 1) return;
    
    let finalTestCase = [];
    let strOptList = makeChoiceStr();
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
    let maxVal = parseInt(formData.namedItem('maxRange').value);
    let minVal = parseInt(formData.namedItem('minRange').value);
    let maxLen = parseInt(formData.namedItem('maxLen').value);
    let minLen = parseInt(formData.namedItem('minLen').value);
    let elementDelim = formData.namedItem('separateC').value;
    let inputLength = parseInt(formData.namedItem('numbers').value);

    let datatypeOpt = "";
    if(formData.namedItem('datatype1').checked) datatypeOpt = datatypeOpt + 'N';
    if(formData.namedItem('datatype2').checked) datatypeOpt = datatypeOpt + 'S';
    if(datatypeOpt.length == 0) return ''; //no datatype selected

    while(elemList.length != inputLength)
    {
        let dt = datatypeOpt.charAt(Math.floor(Math.random() * datatypeOpt.length));
        if(dt == 'N')
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
        if(dt == 'S')
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
Creates an string of options based on user selections.
This string contains everything the user wants in their string test case.
Ex: If the user wants numbers, uppercase and spaces in their test, the string
returned would be ABCD...YZ 012...9
*/
function makeChoiceStr()
{
    let optionArr = [];
    const settings = document.getElementsByClassName('strOptions');

    //if there is text in the box, pick only characters from there
    if(document.getElementById('custom').value.length > 0) {
        return document.getElementById('custom').value;
    }

    //generate settingsArray [lc, uc, num, sp, other]. If the user wants
    //only uppercase and numbers, optionArr = [1,2];
    for(let i = 0; i < settings.length; i++)
    {
        if(settings[i].checked) {
            optionArr.push(i);
        }
    }
    if(optionArr.length == 0) return undefined; //no box was ticked

    //create the string to pick from
    let possibilities = '';
    for(let option of optionArr)
    {
        if(option == 0) { //a-z
            possibilities = possibilities + 'abcdefghijklmnopqrstuvwxyz';
        }
        if(option == 1) { //A-Z
            possibilities = possibilities + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if(option == 2) { //0-9
            possibilities = possibilities + '0123456789';
        }
        if(option == 3) {
            possibilities = possibilities + ' ';
        }
        if(option == 4) {
            let otherChars = '!@#$%^&*()-_=+{}[];:/.,<>|~?';
            possibilities = possibilities + otherChars;
        }
    }
    return possibilities;
}

/*
Picks a random char from the input string
*/
function getRandomChar(inputStr)
{
    return inputStr.charAt(Math.floor(Math.random() * inputStr.length));
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
