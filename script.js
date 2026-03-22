window.addEventListener('load', () => {
    // 1. Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Start hero animations after load
        initTypewriter();
        initParticles();
    }, 2000); // 2 seconds loading simulation
});

// 2. Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth follow effect
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Hover effects for cursor
const hoverableElements = document.querySelectorAll('a, button, .project-card, .social-btn');

hoverableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    });
});

// 3. Typewriter Effect
const textToType = "A passionate developer learning Frontend & Backend technologies, crafting clean, interactive, and animated digital experiences.";
const typeWriterElement = document.getElementById('typewriter');
let i = 0;

function initTypewriter() {
    if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(initTypewriter, 50); // Speed of typing
    }
}

// 4. Hero Particle Animation (Canvas)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 1.5) - 0.75;
        this.speedY = (Math.random() * 1.5) - 0.75;
        this.color = 'rgba(0, 242, 234, 0.5)'; // Accent color
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 242, 234, ${1 - distance/100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
// Start animation loop
animateParticles();

// 5. Scroll Reveal & Skill Progress
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            // Text/Section Reveals
            if (entry.target.classList.contains('reveal-text')) {
                entry.target.classList.add('visible');
            }

            // Circular Progress Bars used in Skills
            if (entry.target.querySelector('.circular-progress')) {
                const progressBars = entry.target.querySelectorAll('.circular-progress');
                progressBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    const circle = bar.querySelector('.progress');
                    // Calculate stroke-dashoffset: 440 - (440 * percent / 100)
                    // If 'Basic' is passed for non-numeric, we handle carefully
                    let numericPercent = parseInt(percent);
                    if (isNaN(numericPercent)) numericPercent = 30; // Fallback for 'Basic' ~30%
                    
                    const offset = 440 - (440 * numericPercent / 100);
                    circle.style.strokeDashoffset = offset;
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-text, .section').forEach(el => observer.observe(el));

// 6. Sticky Nav on Scroll
const nav = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.padding = '1rem 5%';
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

// 7. Parallax Tilt Effect for Hero Content (Mouse Move)
const heroContent = document.querySelector('.hero-content');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    
    heroContent.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});
