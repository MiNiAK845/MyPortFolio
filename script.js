// =======================
// 1. Typing Effect
// =======================
const words = ["Web Developer", "Front-End Enthusiast", "Creative Designer"];
let i = 0, j = 0, currentWord = "", isDeleting = false;
const typingSpeed = 150;

const type = () => {
    const el = document.getElementById("typing-text");
    if (!el) return; // Exit if element not found on page
    if (i >= words.length) i = 0;
    const fullWord = words[i];

    if (!isDeleting) {
        currentWord = fullWord.substring(0, j + 1);
        j++;
    } else {
        currentWord = fullWord.substring(0, j - 1);
        j--;
    }

    el.textContent = currentWord;

    if (!isDeleting && j === fullWord.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i++;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
    }
};

type();

// =======================
// 2. Fade-in Sections
// =======================
const sections = document.querySelectorAll(".section");
const reveal = () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) sec.classList.add("visible");
    });
};
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// =======================
// 3. Floating Particles (with multiple sizes)
// =======================
const particlesContainer = document.getElementById("particles");
if (particlesContainer) {
    const particleCount = 50;
    const particleTypes = ['small', 'medium', 'large']; // define types

    const createParticle = () => {
        const p = document.createElement("div");
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        p.classList.add("particle", type);

        p.style.left = `${Math.random() * window.innerWidth}px`;
        p.style.top = `${Math.random() * window.innerHeight}px`;
        p.style.background = `rgba(0,255,224,${Math.random() * 0.5 + 0.3})`;
        p.style.animationDuration = `${5 + Math.random() * 10}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(p);
    };

    for (let i = 0; i < particleCount; i++) createParticle();
}

// =======================
// 4. Floating Animation for Project Cards
// =======================
const cards = document.querySelectorAll('.project-card');
cards.forEach((card, index) => {
    const floatOffset = Math.random() * 20;
    const animate = () => {
        card.style.transform = `translateY(${Math.sin(Date.now() / 500 + index) * floatOffset}px)`;
        requestAnimationFrame(animate);
    };
    animate();
});

// =======================
// 5. DOMContentLoaded - Hamburger Menu & Navigation
// =======================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('#nav-links a');

    // Hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
    }

    // Auto-set active link
    if (links.length > 0) {
        // UPDATED: home.html → index.html
        let currentPage = window.location.pathname.split("/").pop() || "index.html";

        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentPage);
        });
    }

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Mouse move parallax for particles
const particles = document.querySelectorAll(".particle");
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach((p, index) => {
        const speed = (index % 5 + 1) * 0.02;
        const x = (window.innerWidth / 2 - mouseX) * speed;
        const y = (window.innerHeight / 2 - mouseY) * speed;
        p.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add glow to header on scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
