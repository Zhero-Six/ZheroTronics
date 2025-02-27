// Particles.js Configuration (Starfield Effect)
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 150, "density": { "enable": true, "value_area": 1000 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "star", "star": { "nb_sides": 5 } },
        "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.3 } },
        "size": { "value": 2, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.5 } },
        "line_linked": { "enable": false },
        "move": { 
            "enable": true, 
            "speed": 1, 
            "direction": "none", 
            "random": true, 
            "straight": false, 
            "out_mode": "out", 
            "bounce": false,
            "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "repulse" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "repulse": { "distance": 80, "duration": 0.4 },
            "push": { "particles_nb": 3 }
        }
    },
    "retina_detect": true
});

// Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll Animation for Sections
function handleScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercent + '%';

    const hue = scrollTop / docHeight * 360;
    document.body.style.background = `hsl(${hue}, 50%, 10%)`;
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Initialize Vanilla Tilt for Service Cards
VanillaTilt.init(document.querySelectorAll('.service-card'), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// Typing Animation for Motto
document.addEventListener('DOMContentLoaded', () => {
    new Typed('#typed-motto', {
        strings: ["Your IT Software and Hardware Experts"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000
    });
});

// Form Validation and Formspree Integration
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    nameInput.addEventListener('input', () => validateField(nameInput, 'name-error', 'Name must be at least 2 characters'));
    emailInput.addEventListener('input', () => validateField(emailInput, 'email-error', 'Please enter a valid email'));
    messageInput.addEventListener('input', () => validateField(messageInput, 'message-error', 'Message must be at least 10 characters'));

    function validateField(input, errorId, errorMsg) {
        const errorElement = document.getElementById(errorId);
        let isValid = true;

        if (input.id === 'name' && input.value.length < 2) isValid = false;
        if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) isValid = false;
        if (input.id === 'message' && input.value.length < 10) isValid = false;

        errorElement.textContent = isValid ? '' : errorMsg;
        errorElement.classList.toggle('active', !isValid);
        return isValid;
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            const isNameValid = validateField(nameInput, 'name-error', 'Name must be at least 2 characters');
            const isEmailValid = validateField(emailInput, 'email-error', 'Please enter a valid email');
            const isMessageValid = validateField(messageInput, 'message-error', 'Message must be at least 10 characters');

            if (isNameValid && isEmailValid && isMessageValid) {
                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        formMessage.textContent = 'Message sent successfully!';
                        formMessage.classList.remove('error');
                        formMessage.classList.add('show');
                        form.reset();
                    } else {
                        throw new Error('Submission failed');
                    }
                } catch (error) {
                    formMessage.textContent = 'Failed to send message. Please try again.';
                    formMessage.classList.add('error', 'show');
                }

                setTimeout(() => {
                    formMessage.classList.remove('show', 'error');
                }, 3000);
            } else {
                formMessage.textContent = 'Please fix the errors above.';
                formMessage.classList.add('error', 'show');
                setTimeout(() => {
                    formMessage.classList.remove('show', 'error');
                }, 3000);
            }
        });
    }
});