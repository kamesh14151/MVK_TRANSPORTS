document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year automatically
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

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
      const formData = {
        name: this.querySelector('#name').value.trim(),
        phone: this.querySelector('#phone').value.trim(),
        vehicle: this.querySelector('#vehicle').value,
        details: this.querySelector('#details').value.trim()
      };
      
      // Validation
      if (!formData.name || !formData.phone || !formData.vehicle) {
        showAlert('Please fill in all required fields', 'error');
        return;
      }

      if (!/^[0-9]{10}$/.test(formData.phone)) {
        showAlert('Please enter a valid 10-digit phone number', 'error');
        return;
      }

      // Format WhatsApp message
      const whatsappMessage = `New Transport Request:%0A%0A` +
                             `*Name:* ${formData.name}%0A` +
                             `*Phone:* ${formData.phone}%0A` +
                             `*Vehicle:* ${getVehicleName(formData.vehicle)}%0A` +
                             `*Details:* ${formData.details || 'Not specified'}`;
      
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/916381986801?text=${whatsappMessage}`, '_blank');
      
      // Reset form
      this.reset();
      
      // Show confirmation
      showAlert(`Thank you, ${formData.name}! Your request has been received. We'll contact you shortly.`, 'success');
    });

    // Helper function to get vehicle name
    function getVehicleName(value) {
      const vehicles = {
        'bolero': 'Mahindra Bolero Pickup',
        'eicher': 'Eicher Truck',
        'not-sure': 'Need Advice'
      };
      return vehicles[value] || value;
    }

    // Custom alert function
    function showAlert(message, type) {
      const alertBox = document.createElement('div');
      alertBox.className = `alert-box ${type}`;
      alertBox.textContent = message;
      document.body.appendChild(alertBox);
      
      setTimeout(() => {
        alertBox.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(alertBox);
        }, 300);
      }, 5000);
    }
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
      const vehicleName = vehicleType === 'bolero' ? 
        'Mahindra Bolero Pickup' : 'Eicher Truck';
      showAlert(`Viewing gallery for ${vehicleName}`, 'info');
    });
  });

  // Sticky header on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .vehicle, .testimonial');
    const screenPosition = window.innerHeight / 1.2;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  }

  // Initialize animations
  document.querySelectorAll('.card, .vehicle, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
  });

  // Run animations on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});
