// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('active');
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
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

// Google Forms Integration for Contact Form
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfFormID/formResponse';

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value
    };
    
    // Send email to omegariyazz@gmail.com using EmailJS-style approach
    const emailContent = `
New Inquiry from Al-Baith Interiors Website!

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}

Message:
${formData.message}

---
Sent from Al-Baith Interiors Contact Form
    `.trim();
    
    // For now, show success message and open email client
    const mailtoLink = `mailto:omegariyazz@gmail.com?subject=New Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailContent)}`;
    
    alert(`Thank you ${formData.name}! Mohamed Riyaz will get back to you soon.\n\nFor immediate response, you can also WhatsApp: 9629941092`);
    
    // Open user's email client as backup
    window.location.href = mailtoLink;
    
    contactForm.reset();
  });
}

// Navbar background change on scroll
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

// Gallery Modal Functionality with ALL IMAGES
const galleryImages = [
  // Portfolio images (showing on homepage)
  'https://ik.imagekit.io/albaithinteriors/20260103_182406.jpg',
  'https://ik.imagekit.io/albaithinteriors/20260103_182438.jpg',
  'https://ik.imagekit.io/albaithinteriors/20260103_182410.jpg',
  'https://ik.imagekit.io/albaithinteriors/IMG-20260106-WA0111.jpg',
  'https://ik.imagekit.io/albaithinteriors/IMG-20251227-WA0113.jpg',
  'https://ik.imagekit.io/albaithinteriors/IMG-20260106-WA0142.jpg', // Fixed Portfolio 6 - using hero image
  
  // Additional gallery images (rest of the portfolio)
  'https://ik.imagekit.io/albaithinteriors/Al-baith.png',
  'https://ik.imagekit.io/albaithinteriors/al-baith-logo.png'
  
  // TO ADD MORE: Upload images to ImageKit and add URLs here like:
  // 'https://ik.imagekit.io/albaithinteriors/YOUR-IMAGE-NAME.jpg',
];

let currentImageIndex = 0;

function openGalleryModal(imageIndex) {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImage');
  const caption = document.getElementById('modalCaption');
  
  if (!modal || !modalImg || !caption) return;
  
  currentImageIndex = imageIndex;
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

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openGalleryModal(index);
    });
    
    // Add cursor pointer style
    item.style.cursor = 'pointer';
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal && modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        changeImage(-1);
      } else if (e.key === 'ArrowRight') {
        changeImage(1);
      } else if (e.key === 'Escape') {
        closeGalleryModal();
      }
    }
  });
});
