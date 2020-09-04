const button = document.getElementById('generate');
const inputLength = document.getElementById('numbers');
const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const start = document.getElementById('startingC');
const end = document.getElementById('endingC');
const separate = document.getElementById('separateC');
const output = document.querySelector(".result > p");

main();

function main()
{
    button.addEventListener('click', () => {
        var nums = parseInt(inputLength.value);
        var min = parseInt(minRange.value);
        var max = parseInt(maxRange.value);
        genList(nums, min, max);
    });
}

function genList(inputLength, minVal, maxVal)
{
    if(isNaN(inputLength) || isNaN(minVal) || isNaN(maxVal))
    {
        alert("Error: Not a Number");
        return;
    }
    if(inputLength < 1)
    {
        alert("Length must be a positive number");
    }
    if(inputLength > 1000)
    {
        alert("Please enter a length less than 1000");
        return;
    }
    if(minVal >= maxVal)
    {
        alert("Range Error: Min must be less than max");
        return;
    }
    if(maxVal > 1000000000)
    {
        alert("Max is too big, choose a number below 1B");
        return;
    }
    if(minVal < -1000000000)
    {
        alert("Min is too small, choose a number above -1B");
        return;
    }
    var finalList = "";
    var separator = separate.value;
    if(separator === '') separator = " ";
    for(let i = 0; i < inputLength; i++)
    {
        let num = Math.floor(Math.random() * (maxVal - minVal + 1));
        num = num + minVal;
        finalList = finalList.concat(num, separator);
    }
    //there is an extra separator string at the end of the list, so we clip it off.
    finalList = finalList.substring(0, finalList.length - separator.length);
    finalList = start.value + finalList + end.value;
    output.innerHTML = finalList;
}
