

const dropDowns = document.querySelectorAll('.extra-sections');

dropDowns.forEach(dropDown => {
    const divs = dropDown.querySelectorAll('div');
    divs.forEach(div => {
        div.addEventListener('click', () => {
            const content = div.querySelectorAll('.extra-text');
            content.forEach(text => {
                text.classList.toggle('visible');
            });
        })
    })
})