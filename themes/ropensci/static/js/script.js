let burgerMenu = document.querySelector('.burger-menu');
let mobileMenu = document.querySelector('.mobile-menu');
let menu = document.querySelector('.header__top-bar__nav-col');
let logoCol = document.querySelector('.header__top-bar__logo-col');
let headerTopBar = document.querySelector('.header__top-bar');

mobileMenu.addEventListener('click', ()=>{
    if(!(menu.classList.contains('active'))){
        menu.classList.add('active');
        burgerMenu.classList.add('active');
        logoCol.classList.add('active');
        headerTopBar.classList.add('active');
        document.querySelector('body').style.overflowY = 'hidden';
    }
    else{
        menu.classList.remove('active');
        burgerMenu.classList.remove('active');
        logoCol.classList.remove('active');
        headerTopBar.classList.remove('active');
        document.querySelector('body').style.overflowY = 'scroll';
    }
})

function getBodyScrollTop()
{
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

if(document.documentElement.offsetWidth < 991){
    window.onscroll = function(){
        if(getBodyScrollTop() > 0){
            document.querySelector('.header__top-bar').classList.add('sticky');
        }
        else{
            document.querySelector('.header__top-bar').classList.remove('sticky');
        }
    }
}