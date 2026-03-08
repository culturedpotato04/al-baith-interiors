// Mobile Menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when link clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form - EmailJS Integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Create email body
        const subject = `New Inquiry from ${name} - Al-Baith Interiors`;
        const body = `New Website Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;
        
        // Open mailto link
        window.location.href = `mailto:omegariyazz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        alert(`Thank you ${name}! Mohamed Riyaz will contact you soon.\n\nYou can also WhatsApp: 9629941092`);
        contactForm.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// GALLERY MODAL - ALL IMAGES
const galleryImages = [
    'https://ik.imagekit.io/albaithinteriors/20260103_182406.jpg',
    'https://ik.imagekit.io/albaithinteriors/20260103_182438.jpg',
    'https://ik.imagekit.io/albaithinteriors/20260103_182410.jpg',
    'https://ik.imagekit.io/albaithinteriors/IMG-20260106-WA0111.jpg',
    'https://ik.imagekit.io/albaithinteriors/IMG-20251227-WA0113.jpg',
    'https://ik.imagekit.io/albaithinteriors/IMG-20260106-WA0142.jpg',
    'https://ik.imagekit.io/albaithinteriors/Al-baith.png',
    'https://ik.imagekit.io/albaithinteriors/al-baith-logo.png'
];

let currentImageIndex = 0;

function openGalleryModal(index) {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    if (!modal || !modalImg || !caption) return;
    
    currentImageIndex = index;
    modal.style.display = 'flex';
    modalImg.src = galleryImages[currentImageIndex];
    caption.textContent = `Image ${currentImageIndex + 1} of ${galleryImages.length}`;
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    if (!modalImg || !caption) return;
    
    modalImg.src = galleryImages[currentImageIndex];
    caption.textContent = `Image ${currentImageIndex + 1} of ${galleryImages.length}`;
}

// Wait for page load then attach click handlers
window.addEventListener('load', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            openGalleryModal(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('galleryModal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') changeImage(-1);
            else if (e.key === 'ArrowRight') changeImage(1);
            else if (e.key === 'Escape') closeGalleryModal();
        }
    });
});
