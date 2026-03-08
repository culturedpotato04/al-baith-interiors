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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Mohamed Riyaz will get back to you soon.');
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

// Gallery Modal Functionality
const galleryImages = [
  'https://ik.imagekit.io/albaithinteriors/20260103_182406.jpg',
  'https://ik.imagekit.io/albaithinteriors/20260103_182438.jpg',
  'https://ik.imagekit.io/albaithinteriors/20260103_182410.jpg',
  'https://ik.imagekit.io/albaithinteriors/IMG-20260106-WA0111.jpg',
  'https://ik.imagekit.io/albaithinteriors/IMG-20251227-WA0113.jpg',
  'https://ik.imagekit.io/albaithinteriors/IMG-20251230-WA0156.jpg'
  // ADD MORE IMAGES HERE - Just copy the line above and change the filename
  // Example: 'https://ik.imagekit.io/albaithinteriors/YOUR-IMAGE-NAME.jpg',
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
