import {list} from './wordlist.js';

const word = Array.from(list[Math.floor(Math.random() * list.length)].toUpperCase());
console.log("selected word: ",word);

let checkpoint = [5,10,15,20,25,30];
let checked = [];

const gameContainer = document.getElementById('game-container');
for(let i=0;i<6;i++){
    const boxContainer = document.createElement('div');
    boxContainer.className = "row-container";
    gameContainer.appendChild(boxContainer);
    for(let j=0;j<5;j++){
        const box = document.createElement('input');
        box.className = "row";
        box.style.transitionDelay = `${0.2 * j}s`;
        boxContainer.appendChild(box);
        // box.addEventListener("transitionend", (event) => {
        //     if (event.propertyName === "background-color") { 
        //         box.style.transform = 'translateX(20px)';
        //     }
        // });
    }
    
}

const divs = document.querySelectorAll('.row');
let i = 0;
let isChecked = false;
let stopFlag = false;
let iteration = 0;
document.addEventListener('keydown', (event) => {
    if(stopFlag){
        return;
    }
    if(event.key == 'Backspace'){
        if(checked.includes(i) || i == 0){
            return;
        }
        divs[i-1].value = "";
        i--;
        return;
    }
    else if(event.key == 'Enter' && checkpoint.includes(i) && !isChecked){
        if(findword(i-5)){
            wordcheck(i-5);
            isChecked = true;
            checked.push(checkpoint.shift());
            return;
        }
        else{
            alert("Word not in word list");
        }

    }
    else if (!/^[a-zA-Z]$/.test(event.key)) {
        return;
    }
    else if(checkpoint.includes(i) && !isChecked){
        if(findword(i-5)){
            wordcheck(i-5);
            isChecked = true;
            checked.push(checkpoint.shift());
            return;
        }
        else{
            alert("Word not in word list");
        }
    }
    else{
        divs[i].value = event.key.toUpperCase(); 
        i++;
        isChecked = false;
    }
});

function wordcheck(index){
    iteration++;
    let letterMap = new Map();
    let localCheck = true;
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
            letterMap.set(word[i],letterMap.get(word[i])-1);
        }
    }
    index-=5;
    for(let i = 0 ; i < 5; i++, index++){
        if(divs[index].value != word[i]){
            if(!letterMap.has(divs[index].value)){
                divs[index].style.backgroundColor = '#3A3A3C';
            }
            else if(letterMap.get(divs[index].value) == 0){
                divs[index].style.backgroundColor = '#3A3A3C';
            }
            else if(letterMap.get(divs[index].value) >= 1){
                divs[index].style.backgroundColor = '#B59F3B';
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
function findword(index){
    let str = "";
    for(let i =0;i < 5;i++,index++){
        str += divs[index].value;
    }
    return list.includes(str.toLowerCase());
}