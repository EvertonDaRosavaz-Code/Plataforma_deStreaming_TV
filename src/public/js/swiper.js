//import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js'
      
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  hashNavigation: {
    watchState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  on:{
    slideChange: function (){
      let activeSlideIndex = this.activeIndex;
      console.log(activeSlideIndex+1);
    }
  }
  
});