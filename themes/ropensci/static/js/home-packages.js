// let ourPackagesBlockTop = document.querySelectorAll('.our-packages__row-block__top');

// ourPackagesBlockTop.forEach((block)=>{
//     block.addEventListener('click', ()=>{
//         if(!(block.closest('.our-packages__row-block').querySelector('.our-packages__row-block__desc').classList.contains('active'))){
//             block.closest('.our-packages__row-block').querySelector('.our-packages__row-block__desc').classList.add('active');
//         }
//         else{
//             block.closest('.our-packages__row-block').querySelector('.our-packages__row-block__desc').classList.remove('active');
//         }
//     })
// })

var acc = document.getElementsByClassName("our-packages__row-block__top");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}