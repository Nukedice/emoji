const searchItem = document.querySelector('.input') //.value не вешается
const cardBlock = document.querySelector('.card_block')
const URL = 'http://api.codeoverdose.space';
const EVERY_EMOJI = '/api/emoji/v1';
const FIND_EMOJI = '/api/emoji/v1/find/?query='; 
const select = document.getElementById('counter');

function createCards(data) {
    cardBlock.insertAdjacentHTML('beforeend', `<div class="card">
        <div class="emoji">${data.symbol}</div>
        <span class="name">${data.title}</span>
        <span class="discription">${removeDublicates(data.keywords)}</span>
        </div>`)
}
function removeDublicates(str) {
    str = Array.from(new Set(str.split(' '))).join(' ');
    return str;
}
function removeCards() {
    while (cardBlock.lastChild) {
        cardBlock.lastChild.remove()
    }
}
function getCards() {
    removeCards();
    fetch(URL + EVERY_EMOJI).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < select.value; i++) {
            createCards(data[i])
        }
    }).catch(function (err) {
        console.log('Fetch Error :', err);
    })
}
function search() {
    removeCards();
    fetch(URL + FIND_EMOJI + searchItem.value).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < select.value; i++) {
            createCards(data[i])
        }
    }).catch(function (err) {
        console.log(err)
    })
}
document.addEventListener('load', getCards())
select.addEventListener('change', getCards)
searchItem.addEventListener('input', search)