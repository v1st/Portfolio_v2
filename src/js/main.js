const toTop = document.getElementById('scrollBtn');
const viewProjects = document.getElementById('work');
const portfolio = document.getElementById('portfolio');

function scroll(anchor) {
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: anchor,
  });
}

// Smooth scroll from top of page
viewProjects.addEventListener('click', () => {
  scroll(portfolio.offsetTop);
});

// Scroll back to top of page
toTop.addEventListener('click', () => scroll(0));
