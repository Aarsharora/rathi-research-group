const newsSwiper = new Swiper('.newsSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

// Get the button
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
    scrollBtn.classList.remove("hide");
  } else {
    scrollBtn.classList.add("hide");
    setTimeout(() => {
      scrollBtn.classList.remove("show");
    }, 300); // hide after animation
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



function toggleBio(bioId) {
  const bioDetails = document.getElementById(bioId);
  const card = bioDetails.closest('.jl-member-card');
  const btn = card.querySelector('.jl-read-bio-btn');

  if (bioDetails.classList.contains('jl-show')) {
    bioDetails.classList.remove('jl-show');
    btn.textContent = 'Read Bio';
  } else {
    bioDetails.classList.add('jl-show');
    btn.textContent = 'Hide Bio';
  }
}




