const wrapper = document.querySelector('.wrapper');
let score = document.querySelector('.score');
let over = document.querySelector('.over');
let finalScore = document.querySelector('.score-fin');
let btnLeaderboard = document.querySelector('.leaderboard-btn');
let btnClose = document.querySelector('.over-close');
let boardClose = document.querySelector('.board-close');
let leaderboard = document.querySelector('.leaderboard');
let btnName = document.querySelector('.name-btn');
let inputName = document.querySelector('.name-input');
let boardRows =document.querySelectorAll('.board-row');
const getData = [
    {imgSrc:"./assets/img/cards/card1.jpg", imgName: "card1"},
    {imgSrc:"./assets/img/cards/card1.jpg", imgName: "card1"},
    {imgSrc:"./assets/img/cards/card2.jpg", imgName: "card2"},
    {imgSrc:"./assets/img/cards/card2.jpg", imgName: "card2"},
    {imgSrc:"./assets/img/cards/card3.jpg", imgName: "card3"},
    {imgSrc:"./assets/img/cards/card3.jpg", imgName: "card3"},
    {imgSrc:"./assets/img/cards/card4.jpg", imgName: "card4"},
    {imgSrc:"./assets/img/cards/card4.jpg", imgName: "card4"},
    {imgSrc:"./assets/img/cards/card5.jpg", imgName: "card5"},
    {imgSrc:"./assets/img/cards/card5.jpg", imgName: "card5"},
    {imgSrc:"./assets/img/cards/card6.jpg", imgName: "card6"},
    {imgSrc:"./assets/img/cards/card6.jpg", imgName: "card6"},
    {imgSrc:"./assets/img/cards/card7.jpg", imgName: "card7"},
    {imgSrc:"./assets/img/cards/card7.jpg", imgName: "card7"},
    {imgSrc:"./assets/img/cards/card8.jpg", imgName: "card8"},
    {imgSrc:"./assets/img/cards/card8.jpg", imgName: "card8"},
    {imgSrc:"./assets/img/cards/card9.jpg", imgName: "card9"},
    {imgSrc:"./assets/img/cards/card9.jpg", imgName: "card9"},
    {imgSrc:"./assets/img/cards/card10.jpg", imgName: "card10"},
    {imgSrc:"./assets/img/cards/card10.jpg", imgName: "card10"},
];
let cardsData = getData.sort(()=>{return Math.random() - 0.5});

cardsData.forEach(n =>{
    let card = document.createElement('div');
    card.classList = 'item';
    card.setAttribute('id', n.imgName)
    let face = document.createElement('img');
    face.classList = 'face-card';
    face.src = n.imgSrc;  
    let back = document.createElement('div');
    back.classList = 'back-card';
    wrapper.appendChild(card);
    card.appendChild(face); 
    card.appendChild(back);  

    card.addEventListener('click', (e) =>{
        let flippedCard = document.querySelectorAll('.flip');
        if(flippedCard.length < 2){
            card.classList.add('flip');
            checkFlipped(e);
            checkOff();
        }
        
    })
})

let face = document.querySelectorAll('.face-card')
let coint = 0;
function checkFlipped(e){ 
    e.target.parentElement.classList.add('flip');  
    let flippedCard = document.querySelectorAll('.flip');  
    if (flippedCard.length == 2){        
        coint++;
        score.textContent = coint;
        if (flippedCard[0].getAttribute('id') == flippedCard[1].getAttribute('id')){
            flippedCard.forEach(i => {
                i.classList.add('off');
                i.classList.remove('flip'); 
            })
        }
        else{
            setTimeout(()=>{flippedCard.forEach(i => {
                i.classList.remove('flip')});
            }, 800)
        }
    }
    
} 
btnName.addEventListener('click', getName);
function getName(){
    let name = inputName.value;   
    inputName.placeholder = name;
    let result = {userName:inputName.value, score: coint};
    let prevScores = localStorage.getItem('leaders') || '[]';
    const leaders = [...JSON.parse(prevScores), result];
    leaders.sort((a, b) => a.score- b.score);
    leaders.slice(0, 10);
    console.log (leaders);
    localStorage.setItem('leaders', JSON.stringify(leaders));    
}

function checkOff(){
    let cards = document.querySelectorAll('.item');
    let cardsOff = document.querySelectorAll('.off');
    if (cards.length === cardsOff.length){
        setTimeout(()=>{        
            over.classList.remove('hidden');
        }, 1000)
        
        finalScore.textContent = coint;
    }
}
btnClose.addEventListener('click', reFresh)
function reFresh(){
    let cards = document.querySelectorAll('.item');
    over.classList.add('hidden');
    cards.forEach(i => i.classList.remove('off'));
    let newData = getData.sort(()=>{return Math.random() - 0.5});
    newData.forEach((n, i) =>{
        face[i].src = n.imgSrc;
        face[i].parentElement.setAttribute('id', n.imgName)
    })
    coint = 0;
    score.textContent = coint;
    inputName.value = '';
    inputName.placeholder = "Enter your name";
}

btnLeaderboard.addEventListener('click',()=>{
    over.classList.add('hidden');
    leaderboard.classList.remove('hidden');
    //leaderboard.removeChild();
    let results = JSON.parse(localStorage.getItem('leaders'));
    results.forEach((obj, i) =>{
        let name = document.createElement('div');
        let score = document.createElement('div');
        if (boardRows[i+1].childElementCount === 1){
            boardRows[i+1].appendChild(name);
            boardRows[i+1].appendChild(score);
            name.textContent = obj.userName;
            score.textContent = obj.score;  
        }
         console.log(boardRows[i+1].childElementCount)   
    })
})
boardClose.addEventListener('click', () =>{
    leaderboard.classList.add('hidden');
    reFresh();
})





