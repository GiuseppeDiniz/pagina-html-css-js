// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
ScrollReveal().reveal('.hero h1, .hero .btn', { delay: 300, origin: 'bottom', distance: '50px' });
ScrollReveal().reveal('.icon', { delay: 300, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.tech-item', { delay: 300, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.project-card', { delay: 300, origin: 'bottom', interval: 200 });

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.elements['name'].value;
    const email = contactForm.elements['email'].value;
    const message = contactForm.elements['message'].value;

    if (name && email && message) {
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Progress bar animation
const progressBars = document.querySelectorAll('.progress');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Trigger progress bar animation when the technologies section is in view
const techSection = document.getElementById('tecnologias');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateProgressBars();
        observer.unobserve(techSection);
    }
}, { threshold: 0.5 });

observer.observe(techSection);

// Fixed header on scroll
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.style.top = '-100px';
    } else {
        header.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Hover effect for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('img').style.transform = 'scale(1.1)';
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('img').style.transform = 'scale(1)';
    });
});

// Lightbox for projects
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const imageSrc = card.querySelector('img').src;

        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="${title}">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="close-lightbox">Fechar</button>
            </div>
        `;

        document.body.appendChild(lightbox);

        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

