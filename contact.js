document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle current FAQ
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.classList.add('show');
            } else {
                answer.classList.remove('show');
            }
            
            // Close other FAQs if this one is being opened
            if (this.classList.contains('active')) {
                faqQuestions.forEach(q => {
                    if (q !== this && q.classList.contains('active')) {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('show');
                    }
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (if provided)
            if (phone && !/^[\d\s+-]+$/.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Create form data object
            const formData = {
                name,
                email,
                phone: phone || 'Not provided',
                subject,
                message,
                timestamp: new Date().toISOString()
            };
            
            // In a real implementation, you would send this data to a server
            console.log('Form submission:', formData);
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Initialize form validation on blur
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.required && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
            
            // Special validation for email
            if (this.type === 'email' && this.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            }
        });
    });
});