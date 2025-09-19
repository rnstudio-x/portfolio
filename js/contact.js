// --- Code to add to your existing script.js file ---

document.addEventListener('DOMContentLoaded', () => {

    // ... (All your existing code like hamburger menu, etc. should be here) ...

    // ===== Floating Label and Focus Animation for Contact Form =====
    // Check if we are on the contact page before running this code
    if (document.querySelector('.contact-form')) {
        const formGroups = document.querySelectorAll('.contact-form .form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');

            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    group.classList.remove('focused');
                }
            });

            // Keep label floated if input has value on page load
            if(input.value !== '') {
                group.classList.add('focused');
            }
        });
    }

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});
