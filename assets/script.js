var menu_bar = document.querySelector('.menu-bar')
var menu = document.querySelector('.menu')
menu_bar.onclick = () => {
    menu.classList.toggle('block')
}