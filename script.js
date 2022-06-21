const cards = document.querySelectorAll('.card')
let hasflippedcard = false;
let firstcard, secondcard;
let lockBoard = false;


function flipcard() {
    if(lockBoard) return;
    if(this === firstcard) return;

    this.classList.add('flip');
    if(!hasflippedcard) {
        hasflippedcard = true;
        firstcard = this;
        return;
    }

    secondcard = this;
    hasflippedcard = false;
    checkformath();
}

function checkformath() {
    if(firstcard.dataset.card === secondcard.dataset.card) {
        disablecards();
        return;
    }

    unflipcards();
}

function disablecards() {
    firstcard.removeEventListener('click', flipcard);
    secondcard.removeEventListener('click', flipcard);

    resetboard();
}

//funcão que desvira as cartas
function unflipcards() {
    lockBoard = true;

    setTimeout(() => {
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');

        resetboard();
    }, 1500);
}

function resetboard() {
    [hasflippedcard, lockBoard] = [false, false];
    [firstcard, secondcard] = [null, null];
}


(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })})();

cards.forEach((card) => {
    card.addEventListener('click', flipcard)
})

