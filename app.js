const button = document.getElementById('generate');
const resetButton = document.getElementById('reset');
const formData = document.getElementById('everything').elements;

const output = document.querySelector(".result > p");

main();

function main()
{
    document.getElementById('datatype2').onchange = function() {
        document.getElementById('minLen').disabled = !this.checked;
        document.getElementById('maxLen').disabled = !this.checked;
    };
    document.getElementById('datatype1').onchange = function() {
        document.getElementById('minRange').disabled = !this.checked;
        document.getElementById('maxRange').disabled = !this.checked;
        document.getElementById('decimals').disabled = !this.checked;
    };

    button.addEventListener('click', () => {
        genList();
    });

    resetButton.addEventListener('click', () => {
        hardReset();
    });
}

function genList()
{
    let elemList = [];
    let delimiter = formData.namedItem('separateC').value;
    let maxVal = parseInt(formData.namedItem('maxRange').value);
    let minVal = parseInt(formData.namedItem('minRange').value);
    let inputLength = parseInt(formData.namedItem('numbers').value);

    while(inputLength > 0 && elemList.length != inputLength)
    {
        if(formData.namedItem('datatype1').checked)
        {
            let num = Math.random() * (maxVal - minVal);
            if(!formData.namedItem('decimals').value) {
                num = Math.floor(num);
            }
            else {
                num = num.toFixed(formData.namedItem('decimals').value);
            }
            num = minVal + num;
            elemList.push(num);
        }
        if(formData.namedItem('datatype2').checked)
        {
            elemList = ["String things coming soon!"]; //soon!
            break;
        }
    }
    let finalList = elemList.join(delimiter);
    finalList = formData.namedItem('startingC').value + finalList + formData.namedItem('endingC').value;
    output.innerHTML = finalList;
}

function hardReset()
{
    document.getElementById('minRange').disabled = false;
    document.getElementById('maxRange').disabled = false;
    document.getElementById('decimals').disabled = false;

    document.getElementById('minLen').disabled = true;
    document.getElementById('maxLen').disabled = true;
}
