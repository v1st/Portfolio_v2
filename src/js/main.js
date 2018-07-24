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

viewProjects.addEventListener('click', () => {
  scroll(portfolio.offsetTop);
});

toTop.addEventListener('click', () => scroll(0));
