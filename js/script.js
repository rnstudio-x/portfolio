document.addEventListener('DOMContentLoaded', () => {
    // --- AOS (Animate On Scroll) Initialization ---
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // --- Mobile Menu (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownLinks = document.querySelectorAll('.nav-menu .dropdown .nav-link');

    // Function to toggle the main mobile menu
const toggleMainMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // When closing the main menu, also close any open dropdowns
    if (!navMenu.classList.contains('active')) {
        dropdownLinks.forEach(link => {
            link.parentElement.classList.remove('open');
        });
    }
};

 // Toggle menu when hamburger is clicked
if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMainMenu);
}

// Add click event for dropdowns on mobile
dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if we are in mobile view (hamburger is visible)
        if (window.innerWidth <= 992) {
            e.preventDefault(); // Stop link from navigating
            const dropdown = link.parentElement;
            
            // Close other open dropdowns
            if (!dropdown.classList.contains('open')) {
                dropdownLinks.forEach(l => l.parentElement.classList.remove('open'));
            }

            // Toggle the 'open' class on the clicked dropdown
            dropdown.classList.toggle('open');
        }
    });
});

// Close menu when a non-dropdown link is clicked
document.querySelectorAll('.nav-link:not(.dropdown > .nav-link)').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMainMenu();
        }
    });
});

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('active');
        }
    });

    // --- Scroll to Top Functionality ---
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Testimonial Slider ---
    let slideIndex = 1;
    const slides = document.getElementsByClassName("testimonial-slide");
    const dots = document.getElementsByClassName("testimonial-dot");

    function showSlides(n) {
        if (slides.length === 0) return;
        
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        slides[slideIndex - 1].classList.add('active');
        if (dots.length > 0) {
            dots[slideIndex - 1].classList.add('active');
        }
    }
    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    // Auto-change testimonials if elements exist
    if (slides.length > 0) {
        showSlides(slideIndex);
        setInterval(() => {
            showSlides(++slideIndex);
        }, 5000);
    }

    // --- Page Loader ---
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 500); // Shorter delay for better user experience
        });
    }

    // --- Hero Section Slideshow ---
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        const images = [
            "https://lh3.googleusercontent.com/d/1PUGQDrv3u1L5qsS-AsE5SVfrEfhivM-",
            "https://lh3.googleusercontent.com/d/1c61Qi4HHXz5ZJ8AdXqfS3Tgy0abL8wHt",
            "https://lh3.googleusercontent.com/d/1iu9x3QZ3OBTyCp9DP4BpVBQAb2owBp4v",
            "https://lh3.googleusercontent.com/d/1mOiDk5rypNKL5hgpIBDNNgBSbx5GEmEQ"
        ];
        
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`;
            if (index === 0) {
                slide.classList.add('active');
            }
            slideshowContainer.appendChild(slide);
        });

        const slides = document.querySelectorAll('.slide');
        let currentSlideIndex = 0;

        function nextSlide() {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add('active');
        }

        setInterval(nextSlide, 6000);
    }
    
    // --- Set current year in footer ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
// Array to store selected dates
let dates = [];

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
  const datePicker = document.getElementById('datePicker');
  const today = new Date().toISOString().split('T')[0];
  datePicker.min = today;
  
  // Add event listener for date selection
  datePicker.addEventListener('change', function() {
    const selectedDate = this.value;
    
    // Check if date is already selected
    if (!dates.includes(selectedDate) && selectedDate) {
      // Add to array
      dates.push(selectedDate);
      
      // Update hidden input with all dates
      document.getElementById('allDates').value = dates.join(',');
      
      // Display selected date
      updateSelectedDates();
      
      // Reset the date picker
      this.value = '';
    }
  });
});

// Function to update the display of selected dates
function updateSelectedDates() {
  const container = document.getElementById('selectedDates');
  container.innerHTML = '';
  
  dates.forEach(function(date) {
    // Format date for display (convert from YYYY-MM-DD to more readable format)
    const displayDate = new Date(date);
    const formattedDate = displayDate.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Create date chip
    const dateChip = document.createElement('div');
    dateChip.classList.add('date-chip');
    
    // Create text span
    const dateText = document.createElement('span');
    dateText.textContent = formattedDate;
    dateChip.appendChild(dateText);
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-date');
    removeBtn.innerHTML = '&times;';
    removeBtn.setAttribute('data-date', date);
    removeBtn.addEventListener('click', function() {
      const dateToRemove = this.getAttribute('data-date');
      removeDate(dateToRemove);
    });
    
    dateChip.appendChild(removeBtn);
    container.appendChild(dateChip);
  });
}

// Function to remove a date
function removeDate(dateToRemove) {
  // Filter out the date to remove
  dates = dates.filter(date => date !== dateToRemove);
  
  // Update hidden input
  document.getElementById('allDates').value = dates.join(',');
  
  // Update display
  updateSelectedDates();
}

    // Gallery modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        modalImg.src = imgSrc;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
// Add this near the top of your script section
// Preload key images
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Array of key image paths to preload
const imagesToPreload = [
    'https://drive.google.com/uc?export=view&id=1PUGQDrv3u1L5qsS-AsE5S_VfrEfh_ivM',
    'https://drive.google.com/uc?export=view&id=1c61Qi4HHXz5ZJ8AdXqfS3Tgy0abL8wHt',
    'https://drive.google.com/uc?export=view&id=1iu9x3QZ3OBTyCp9DP4BpVBQAb2owBp4v',
    'https://drive.google.com/uc?export=view&id=1mOiDk5rypNKL5hgpIBDNNgBSbx5GEmEQ'
];

preloadImages(imagesToPreload);
    // Form submission to Google Sheets
 // Form submission to Google Sheets with email notifications
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');

// Replace with your deployed Google Apps Script Web App URL
// IMPORTANT: Make sure to use the correct deployment URL from your Apps Script project
// You need to deploy as "Execute as: Me" and "Who has access: Anyone (even anonymous)"
// Replace with your deployed Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8dPDF1RBFK8QRW3qthkEckBCogr5c4vc0kUdEiLXX7DaMTDeY7zShhLm4BoMYX60Xzg/exec';

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Change button to loading state
  const submitButton = this.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  
  // Get the success message element
  const successMessage = document.getElementById('successMessage');
  
  // Create a FormData object from the form
  const formData = new FormData(this);
  
  // Convert FormData to URL-encoded string for traditional form submission
  const urlEncodedData = new URLSearchParams(formData).toString();
  
  // Use JSONP approach with a hidden iframe for cross-domain submission
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  // Create a form within the iframe that will submit to the Apps Script
  const iframeDocument = iframe.contentWindow.document;
  const iframeForm = iframeDocument.createElement('form');
  iframeForm.action = SCRIPT_URL;
  iframeForm.method = 'post';
  
  // Add all form fields to the iframe form
  for (const [key, value] of formData.entries()) {
    // Skip additionalServices as we'll handle it specially
    if (key !== 'additionalServices') {
      const input = iframeDocument.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      iframeForm.appendChild(input);
    }
  }
  
  // Handle checkboxes (additionalServices) specially
  const checkboxes = formData.getAll('additionalServices');
  if (checkboxes.length > 0) {
    checkboxes.forEach(value => {
      const input = iframeDocument.createElement('input');
      input.type = 'hidden';
      input.name = 'additionalServices';
      input.value = value;
      iframeForm.appendChild(input);
    });
  }
  
  // Listen for message from the iframe
  window.addEventListener('message', function(event) {
    try {
      const data = JSON.parse(event.data);
      if (data && data.result === 'success') {
        // Show success message
        if (data.bookingId) {
          successMessage.innerHTML = `Your booking request has been successfully submitted! Your booking reference is <strong>${data.bookingId}</strong>. We'll contact you shortly to confirm your appointment.`;
        }
        
        successMessage.style.display = 'block';
        
        // Reset form and selected dates
        document.getElementById('bookingForm').reset();
        
        // Clear selected dates
        const selectedDatesElement = document.getElementById('selectedDates');
        if (selectedDatesElement) {
          selectedDatesElement.innerHTML = '';
          // Also reset the hidden input
          document.getElementById('allDates').value = '';
        }
        
        // Scroll to top of form
        const formTop = document.getElementById('bookingForm').getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: formTop - 150,
          behavior: 'smooth'
        });
      } else {
        // Show error message
        successMessage.style.display = 'block';
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.style.borderColor = '#f5c6cb';
        successMessage.innerHTML = `There was an error submitting your booking request. Please try again or contact us directly.`;
      }
    } catch (error) {
      console.error('Error processing response:', error);
    } finally {
      // Restore button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      
      // Remove iframe after processing
      document.body.removeChild(iframe);
      
      // Hide success/error message after some time
      setTimeout(() => {
        successMessage.style.display = 'none';
        successMessage.style.backgroundColor = '#d4edda';
        successMessage.style.color = '#155724';
        successMessage.style.borderColor = '#c3e6cb';
      }, 8000);
    }
  }, false);
  
  // Add a callback field to the form
  const callbackInput = iframeDocument.createElement('input');
  callbackInput.type = 'hidden';
  callbackInput.name = 'callback';
  callbackInput.value = 'handleFormResponse';
  iframeForm.appendChild(callbackInput);
  
  // Append the form to the iframe document and submit it
  iframeDocument.body.appendChild(iframeForm);
  iframeForm.submit();
  
  console.log('Form submitted via iframe');
});

// Global callback function for JSONP response
window.handleFormResponse = function(data) {
  window.postMessage(JSON.stringify(data), '*');
};
// Add this to your script section
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
 //Script part for slideshow
 
    document.addEventListener('DOMContentLoaded', function() {
      // Array of image paths - replace with your own images
      const images = [
    'https://lh3.googleusercontent.com/d/1PUGQDrv3u1L5qsS-AsE5S_VfrEfh_ivM',
    'https://lh3.googleusercontent.com/d/1c61Qi4HHXz5ZJ8AdXqfS3Tgy0abL8wHt',
    'https://lh3.googleusercontent.com/d/1iu9x3QZ3OBTyCp9DP4BpVBQAb2owBp4v',
    'https://lh3.googleusercontent.com/d/1mOiDk5rypNKL5hgpIBDNNgBSbx5GEmEQ'
      ];
      
      const slideshowContainer = document.querySelector('.slideshow-container');
      
      // Create slide elements for each image
      images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${image}')`;
        
        // Make the first slide active initially
        if (index === 0) {
          slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
      });
      
      // Set up the slideshow functionality
      const slides = document.querySelectorAll('.slide');
      let currentSlide = 0;
      
      function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide or back to first slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
      }
      
      // Change slides every 6 seconds (6000ms)
      setInterval(nextSlide, 6000);
    });
 
 // <!-- Add this right before closing </body> tag -->

// script for service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/portfolio/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
