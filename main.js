const gameBoard = document.querySelector(".game-board");
const msgPart = document.querySelector(".msg-part");

let col = 4;
let row = 2;

let correctPos = [
    ['1', '5'],
    ['2', '6'],
    ['3', '7'],
    ['4', '8'],
    ['5', '1'],
    ['6', '2'],
    ['7', '3'],
    ['8', '4']
];

let fliped = [];

let selected = [];

let index = 0;

let imagesIndex = [1, 2, 3, 4];

function GameInital() {
    msgPart.style.display = "none";
    for (let i = 1; i <= row; i++) {
        displayCards();
    }
    shuffleCards();
}

window.onload = GameInital;

function displayCards() {
    for (let i = 1; i <= col; i++) {
        index++;
        const card = document.createElement('div');
        card.className = `card card-number${i}`;
        gameBoard.appendChild(card)
        card.setAttribute("data-index", index);
        
        const cardInner = document.createElement('div');
        cardInner.className = "card-inner";
        card.appendChild(cardInner);

        const cardFront = document.createElement('div');
        cardFront.className = "front-part";
        cardInner.appendChild(cardFront);

        const cardFrontImg = document.createElement('img');
        cardFrontImg.src = "Images/back-flip.png";
        cardFront.appendChild(cardFrontImg);

        const cardBack = document.createElement('div');
        cardBack.className = "back-part";
        cardInner.appendChild(cardBack);

        const cardBackImg = document.createElement('img');
        cardBackImg.src = generatePictures(i);
        cardBack.appendChild(cardBackImg);

        
        card.addEventListener("mouseover", flipCard(i))
    }
}

function flipCard(index) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.onclick = () => {
            checkCorrect(card.dataset.index);
            card.querySelector(".card-inner").style.transform = "rotateY(180deg)";
        }
    })
    
}

function generatePictures(i) {
    let src = "Images/";
    src += `memo ${i}.png`;
    return src;
}

function shuffleCards() {
    let randStore = [];
    let randCol = Math.floor(Math.random() * col) + 1;
    let randRow = Math.floor(Math.random() * row) + 1;


    for (let i = 1; i <= 4; i++) {
        document.querySelector(`.card[data-index='${i}']`).style = `grid-column: ${randCol}; grid-row: ${randRow}`
        
        randStore.push([randCol, randRow]);
        while (randStore.some(pair => pair[0] === randCol && pair[1] === randRow)) {
            randCol = Math.floor(Math.random() * col) + 1;
            randRow = Math.floor(Math.random() * row) + 1;
        }

    }
}

function checkCorrect(index) {
    selected.push(index);

    if (selected.length > 1) {
        for (let i = 0; i < correctPos.length; i++) {
            if (correctPos.some(subArry => subArry.length === selected.length && subArry.every((value, index) => value === selected[index]))) {
                selected = [];
                fliped.push(index);
                checkWin();
                console.log(fliped);
                break;
            }
            else {
                unflip(selected[0], selected[1]);
                break;
            }
        }
    }
}

function unflip(card1, card2) {
    console.log("not correct");
    
    const cards = document.querySelectorAll(".card");
    
    cards.forEach((card) => {
        const cardIndex = card.getAttribute('data-index');

        if (cardIndex == card1 || cardIndex == card2) {
            // console.log(cardIndex);
            setTimeout(() => {
                card.querySelector(".card-inner").style.transform = "rotateY(0deg)";
            }, 1200);
        }
    });
    selected = []
}

function checkWin() {
    if (fliped.length == 4) {
        setTimeout(() => {
            won();
        }, 802)
    }
}

function won() {
    msgPart.style.display = "block"
}

function restart() {
    window.location.reload();
}