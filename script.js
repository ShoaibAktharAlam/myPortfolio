// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navbar = document.querySelector('.navbar');

// Function to update header styles based on current theme and scroll position
function updateHeaderStyles() {
    const scrolled = window.scrollY > 50;
    const isDarkMode = body.classList.contains('dark-theme');
    
    if (scrolled) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Apply theme-specific styles immediately
    if (isDarkMode) {
        navbar.classList.add('dark-mode');
    } else {
        navbar.classList.remove('dark-mode');
    }
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
    
    // Immediately update header styles after theme change
    updateHeaderStyles();
});

// Scroll event listener
window.addEventListener('scroll', updateHeaderStyles);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Initial header style update
    updateHeaderStyles();
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation
const typingText = document.getElementById('typing-animation');
const texts = ['Data Analyst', 'Problem Solver', 'Web Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation
if (typingText) {
    typeWriter();
}

// Tab functionality for about section
function opentab(tabname, event) {
    const tablinks = document.querySelectorAll('.tab-links');
    const tabcontents = document.querySelectorAll('.tab-contents');
    
    tablinks.forEach(link => {
        link.classList.remove('active-link');
        link.setAttribute('aria-selected', 'false');
    });
    tabcontents.forEach(content => content.classList.remove('active-tab'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active-link');
        event.currentTarget.setAttribute('aria-selected', 'true');
    }
    document.getElementById(tabname).classList.add('active-tab');
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counterSection);
}

// Add this to your existing JavaScript to ensure proper stacking
document.addEventListener('DOMContentLoaded', function() {
    // Ensure theme toggle is always on top
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.style.zIndex = '9999';
    }
    
    // Fix any stacking issues on scroll
    window.addEventListener('scroll', function() {
        // Ensure theme toggle stays on top during scroll
        if (themeToggle) {
            themeToggle.style.zIndex = '9999';
        }
    });
});

function animateCertifications() {
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
                
        if(cardPosition < screenPosition) {
            card.classList.add('visible');
        }
    });
}
        
// Initialize on scroll
window.addEventListener('scroll', animateCertifications);
// Initialize on page load
window.addEventListener('load', animateCertifications);