// Set active navbar link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'home-eng.html')) {
      link.classList.add('active');
    }
  });
});

 document.getElementById("back-home").addEventListener("click", () => {
      window.location.href = "../pages/home-eng.html"; 
    });