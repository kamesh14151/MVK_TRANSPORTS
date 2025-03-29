// Mobile menu toggle (for future use)
document.addEventListener('DOMContentLoaded', function() {
    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.elements[0].value;
        const phone = this.elements[1].value;
        const vehicle = this.elements[2].value;
        const details = this.elements[3].value;
        
        // Here you would typically send data to server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your booking request for ${vehicle} has been received. We'll call you at ${phone} shortly.`);
        
        // Reset form
        this.reset();
        
        // In a real app, you might send this to:
        // 1. Your email (using FormSubmit.co)
        // 2. WhatsApp (using WhatsApp API)
        // 3. Firebase database
      });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#book') return; // Don't scroll for booking
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });