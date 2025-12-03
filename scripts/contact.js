// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // FAQ toggle function
    window.toggleFAQ = function(faqId) {
        console.log('Toggle FAQ called with:', faqId);
        const answer = document.getElementById(faqId);
        const question = event.currentTarget;
        
        console.log('Answer element:', answer);
        console.log('Question element:', question);
        
        if (!answer) {
            console.error('FAQ answer not found for:', faqId);
            return;
        }
        
        // Close all other answers
        const allAnswers = document.querySelectorAll('.faq-answer');
        const allQuestions = document.querySelectorAll('.faq-question');
        
        allAnswers.forEach(ans => {
            if (ans !== answer) {
                ans.classList.remove('show');
            }
        });
        
        allQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
            }
        });
        
        // Toggle current answer
        const isShowing = answer.classList.contains('show');
        console.log('Currently showing:', isShowing);
        
        if (isShowing) {
            answer.classList.remove('show');
            question.classList.remove('active');
        } else {
            answer.classList.add('show');
            question.classList.add('active');
        }
        
        console.log('FAQ toggle completed');
    };
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            const requiredFields = ['name', 'email', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                emailInput.classList.add('error');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            this.reset();
        });
    }
    
    // Success message function
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button class="btn btn--accent" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 5000);
    }
    
    // Form field interactions
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        // Remove error class on input
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
        
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Contact method animations
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.animationDelay = `${index * 0.1}s`;
        method.classList.add('slide-in-up');
    });
    
    // Intersection Observer for scroll animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Observe all elements with .animate class
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .slide-in-up {
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .success-content {
            background: white;
            padding: 3rem;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
            margin: 0 1rem;
        }
        
        .success-content i {
            font-size: 3rem;
            color: #4CAF50;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: var(--dark);
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: var(--gray-600);
            margin-bottom: 2rem;
        }
        
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #ff4444;
        }
        
        .form-group.focused label {
            color: var(--accent);
        }
    `;
    document.head.appendChild(style);
});
