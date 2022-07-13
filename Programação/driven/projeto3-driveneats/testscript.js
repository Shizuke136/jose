function addListenersToCards(){
    const n = document.querySelectorAll('');
    for (let i = 0; i < n.length; i++) {
        n[i].addEventListener('click', (event) => {
            event.target.classList.toggle('selecionado')
            console.log(event.target)
        });
    }
}

addListenersToCards();