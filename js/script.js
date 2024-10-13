let menuResponsive = document.querySelector(".nav-check-btn");
menuResponsive.onclick = function (){
    navMenu = document.querySelector(".nav-menu");
    navMenu.classList.toggle("active");
}