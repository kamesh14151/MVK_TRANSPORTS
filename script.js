document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('#mainNav');
  
  mobileMenuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.innerHTML = mainNav.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = this.querySelector('#name').value;
      const phone = this.querySelector('#phone').value;
      const vehicle = this.querySelector('#vehicle').value;
      const details = this.querySelector('#details').value;
      
      // Simple validation
      if (!name || !phone || !vehicle) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Format WhatsApp message
      const whatsappMessage = `New Transport Request:%0A%0A` +
                             `*Name:* ${name}%0A` +
                             `*Phone:* ${phone}%0A` +
                             `*Vehicle:* ${vehicle}%0A` +
                             `*Details:* ${details || 'Not specified'}`;
      
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/916381986801?text=${whatsappMessage}`, '_blank');
      
      // Reset form
      this.reset();
      
      // Show confirmation
      alert(`Thank you, ${name}! Your booking request has been received. We'll contact you shortly on ${phone}.`);
    });
  }

  // Phone number validation
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  // View More Photos buttons
  document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', function() {
      const vehicleType = this.getAttribute('data-vehicle');
      // In a real implementation, this would open a modal or gallery
      alert(`Showing more photos of ${vehicleType === 'bolero' ? 'Mahindra Bolero Pickup' : 'Eicher Truck'}`);
    });
  });

  // Sticky header on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'var(--white)';
      header.style.boxShadow = 'var(--shadow)';
    }
  });

  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .vehicle, .testimonial');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animated elements
  document.querySelectorAll('.card, .vehicle, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});
