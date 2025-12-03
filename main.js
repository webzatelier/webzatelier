// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('.header');
    
    // Service toggle function
    window.toggleService = function(serviceId) {
        console.log('Toggle service called with:', serviceId);
        const description = document.getElementById(serviceId + '-description');
        const serviceItem = event.currentTarget;
        
        console.log('Description element:', description);
        console.log('Service item:', serviceItem);
        
        if (!description) {
            console.error('Description not found for:', serviceId);
            return;
        }
        
        // Close all other descriptions
        const allDescriptions = document.querySelectorAll('.service-description');
        const allServiceItems = document.querySelectorAll('.service-item');
        
        allDescriptions.forEach(desc => {
            if (desc !== description) {
                desc.classList.remove('show');
            }
        });
        
        allServiceItems.forEach(item => {
            if (item !== serviceItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current description
        const isShowing = description.classList.contains('show');
        console.log('Currently showing:', isShowing);
        
        if (isShowing) {
            description.classList.remove('show');
            serviceItem.classList.remove('active');
        } else {
            description.classList.add('show');
            serviceItem.classList.add('active');
        }
        
        console.log('After toggle - show class:', description.classList.contains('show'));
    };
    
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
    
    // Mobile menu functionality
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking on a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
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

    // Initialize animation states
    const animatedCards = document.querySelectorAll('.value-card, .service-card');
    animatedCards.forEach(card => {
        if (!card.classList.contains('animate')) {
            card.classList.add('animate');
            observer.observe(card);
        }
    });

    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scroll down
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scroll up
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
            
            // Add shadow when scrolled
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Add loaded class to body when everything is ready
    document.body.classList.add('loaded');

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});
