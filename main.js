import {list} from './wordlist.js';

// const word = Array.from(list[Math.floor(Math.random() * list.length)].toUpperCase());
const word = ['T','R','A','D','E'];
let checkpoint = [5,10,15,20,25,30];
let checked = [];//if index is included in a checked word, disable backspace for that index and all indices preceeding it

const gameContainer = document.getElementById('game-container');

for(let i=0;i<6;i++){//create grid for the game
    const boxContainer = document.createElement('div');
    boxContainer.className = "row-container";
    gameContainer.appendChild(boxContainer);
    for(let j=0;j<5;j++){
        const box = document.createElement('input');
        box.disabled = true;
        box.className = "row";
        box.style.transitionDelay = `${0.2 * j}s`;
        boxContainer.appendChild(box);
    }
}

const divs = document.querySelectorAll('.row');//returns nodelist
let i = 0;//current character in divs
let isChecked = false;//if 5 letters are entered and checked
let stopFlag = false;//stop the game
let iteration = 0;//total chances completed

document.addEventListener('keydown', (event) => {//for keyboard inputs
    if(stopFlag){
        return;
    }

    else if (!/^[a-zA-Z]$/.test(event.key)) {//only a-z allowed
        return;
    }

    else if(checkpoint.includes(i) && !isChecked){//five characters are already entered...
        handleEnter();
    }

    else{
        handleKeyPress(event.key.toUpperCase());
    }
});

document.addEventListener('keydown', (event) => {
    if(event.key == 'Backspace'){
        handleBackspace();
    }
});

document.addEventListener('keydown', (event) => {
    if(event.key == 'Enter' && checkpoint.includes(i) && !isChecked){
        handleEnter();
    }
});

document.getElementById('backspace').addEventListener('click', () =>{
    handleBackspace();
});

document.getElementById('enter').addEventListener('click', () =>{
    handleEnter();
})

document.querySelectorAll('#keyboard > div').forEach(div => {
    div.addEventListener('click', (event) => {
        if(event.target.className == 'letter'){
            if(stopFlag){
                return;
            }

            else if(checkpoint.includes(i) && !isChecked){
                handleEnter();
            }

            else{
                handleKeyPress(event.target.textContent.toUpperCase());
            }
        } 
    });
})

function handleKeyPress(letter){
    divs[i].value = `${letter}`; 
    i++;
    isChecked = false;
}

function handleEnter(){
    if(checkpoint.includes(i) && !isChecked){
        if(findWord(i-5)){
            wordCheck(i-5);
            isChecked = true;
            checked.push(checkpoint.shift());
            return;
        }
        else{
            alert("Word not in word list");
        }
    }
    
}

function handleBackspace(){
    if(checked.includes(i) || i == 0){
            return;
    }
    divs[i-1].value = "";
    i--;
    return;
}
function wordCheck(index){
    iteration++;
    let letterMap = new Map();
    let localCheck = true;//check whether all characters match

    for(let i = 0 ; i < 5; i++){
        // divs[index].style.backgroundColor = '#B59F3B';
        // divs[index].style.backgroundColor = '#3A3A3C';
        // divs[index].style.backgroundColor = '#538D4E';
        let letterCount = word.reduce((count, item) => {
            return item === word[i] ? count + 1 : count;
            }, 0);

        if(!letterMap.has(word[i])){
            letterMap.set(word[i],letterCount);
        }
    }
    for(let i = 0 ; i < 5; i++, index++){
        if(divs[index].value == word[i]){
            divs[index].style.backgroundColor = '#538D4E';
            fillKey(divs[index].value, '#538D4E');
            letterMap.set(word[i],letterMap.get(word[i])-1);
        }
    }

    index-=5;

    for(let i = 0 ; i < 5; i++, index++){
        if(divs[index].value != word[i]){
            if(!letterMap.has(divs[index].value)){
                divs[index].style.backgroundColor = '#3A3A3C';
                fillKey(divs[index].value, '#3A3A3C');
            }
            else if(letterMap.get(divs[index].value) == 0){
                divs[index].style.backgroundColor = '#3A3A3C';
                fillKey(divs[index].value, '#3A3A3C');
            }
            else if(letterMap.get(divs[index].value) >= 1){
                divs[index].style.backgroundColor = '#B59F3B';
                fillKey(divs[index].value, '#B59F3B');
                letterMap.set(divs[index].value, letterMap.get(divs[index].value) - 1);
            }
        }
    }

    index-=5;

    for(let i = 0 ; i < 5; i++, index++){
        if(divs[index].value != word[i]){
            localCheck = false;
            break;
        }
    }
    if(localCheck){
        stopFlag = true;
        setTimeout(()=>{
            alert("You are a true WordyBoi");
        },1200);
    }
    else if(iteration == 6){
        stopFlag = true;
        setTimeout(()=>{
            alert(`Word is: ${word.join('')}.\nBetter luck next time.`);
        },1200);
    }
}

function findWord(index){
    let str = "";
    for(let i =0;i < 5;i++,index++){
        str += divs[index].value;
    }
    return list.includes(str.toLowerCase());
}

function fillKey(value, color){
    const letters = document.querySelectorAll("#keyboard > div > div");
        for(let letter of letters){
            if(letter.textContent == value){
                console.log("found");
                    if(color == '#3A3A3C'){
                        console.log("color selected is grey");
                        console.log(letter.style.backgroundColor);
                        if(letter.style.backgroundColor == 'rgb(83, 141, 78)' || letter.style.backgroundColor == 'rgb(181, 159, 59)'){
                            console.log("already some other color");
                        return;
                        }
                    }
                console.log("not returned")
                letter.style.backgroundColor = color;
                break;
            }
        }
}