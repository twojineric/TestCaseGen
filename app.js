const button = document.getElementById('generate');
const inputLength = document.getElementById('numbers');
const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const output = document.querySelector(".result > p");

main();

function main()
{
    button.addEventListener('click', () => {
        var nums = parseInt(inputLength.value);
        var min = parseInt(minRange.value);
        var max = parseInt(maxRange.value);
        if(isNaN(nums) || isNaN(min) || isNaN(max))
        {
            alert("Error: Not a Number");
            return;
        }
        if(nums > 1000)
        {
            alert("Please enter a length less than 1000");
            return;
        }
        if(min >= max)
        {
            alert("Range Error: Min must be less than max");
            return;
        }
        if(max > 1000000000)
        {
            alert("Max is too big, choose a number below 1B");
            return;
        }
        if(min < -1000000000)
        {
            alert("Min is too small, choose a number above -1B");
            return;
        }
        genList(nums, min, max);
    });
}
function genList(inputLength, minVal, maxVal)
{
    var finalList = "";
    for(let i = 0; i < inputLength; i++)
    {
        let num = Math.floor(Math.random() * (maxVal - minVal + 1));
        num = num + minVal;
        finalList = finalList.concat(' ', num);
    }
    output.innerHTML = finalList;
}
