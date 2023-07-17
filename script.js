const value = document.querySelector('.input').value
const cardBlock = document.querySelector('.card_block')
const URL = 'http://api.codeoverdose.space';
const emoji = '/api/emoji/v1';
const find = '/api/emoji/v1/find/?query='; //?query=SEARCH_VALUE
const select = document.getElementById('counter');
function createCards(data) {
    cardBlock.insertAdjacentHTML('beforeend', `<div class="card">
        <div class="emoji">${data.symbol}</div>
        <span class="name">${data.title}</span>
        <span class="discription">${data.keywords}</span>
        </div>`)
}
function removeCards () {
while(cardBlock.lastChild) {
    cardBlock.lastChild.remove()
}
}
function getCards() {
    removeCards();
    fetch(URL + emoji).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < select.value; i++) {
            createCards(data[i])
        }
    }).catch(function (err) {
        console.log('Fetch Error :', err);
    })
}
document.addEventListener('load', getCards())
select.addEventListener('change', ()=> {getCards()}) //не работает без стрелочной функции, если просто вызвать getCards. Почему?
