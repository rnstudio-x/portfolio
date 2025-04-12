// Add this near the top of your script section
// Custom cursor follower like Harold Feng's site
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect for interactive elements
document.querySelectorAll('a, button, .gallery-item, .service-card').forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-expanded');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-expanded');
  });
});

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set min date to today for date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('datePicker').setAttribute('min', today);

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      const scrollTop = document.getElementById('scrollTop');
      
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        scrollTop.classList.add('active');
      } else {
        header.classList.remove('scrolled');
        scrollTop.classList.remove('active');
      }
    });

    // Scroll to top functionality
    document.getElementById('scrollTop').addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      });
    });
// Page loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 1000);
  });
  // Add this to your script section
  // Parallax effect
  window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.15;
      const offset = window.pageYOffset * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  });