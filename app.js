const button = document.getElementById('generate');
const resetButton = document.getElementById('reset');
const formData = document.getElementById('everything').elements;

main();

function main()
{
    button.addEventListener('click', genList);
    resetButton.addEventListener('click', hardReset);

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

function genList()
{
    let elemList = [];
    let delimiter = formData.namedItem('separateC').value;
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
            //A-Z is 65-90, a-z is 97-122
            let strLen = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
            let str = '';
            for(let i = 0; i < strLen; i++)
            {
                str = str + String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            }
            if(formData.namedItem('quote').checked) {
                str = `"${str}"`;
            }
            elemList.push(str);
        }
    }
    if(!delimiter) delimiter = ' ';
    let finalList = elemList.join(delimiter);
    finalList = formData.namedItem('startingC').value + finalList + formData.namedItem('endingC').value;
    document.getElementById('result').value = finalList;
}

function hardReset()
{
    document.getElementById('minRange').disabled = false;
    document.getElementById('maxRange').disabled = false;
    document.getElementById('decimals').disabled = false;

    document.getElementById('minLen').disabled = true;
    document.getElementById('maxLen').disabled = true;
}
