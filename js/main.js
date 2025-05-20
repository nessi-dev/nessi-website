document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // If mobile menu is not already appended to DOM
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone nav links and CTA buttons for mobile menu
                const navLinksClone = navLinks.cloneNode(true);
                const ctaButtonsClone = ctaButtons.cloneNode(true);
                
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(ctaButtonsClone);
                
                // Insert after header
                const header = document.querySelector('header');
                header.parentNode.insertBefore(mobileMenu, header.nextSibling);
                
                // Add styles for mobile menu
                mobileMenu.style.position = 'fixed';
                mobileMenu.style.top = header.offsetHeight + 'px';
                mobileMenu.style.left = '0';
                mobileMenu.style.width = '100%';
                mobileMenu.style.backgroundColor = 'white';
                mobileMenu.style.padding = '20px';
                mobileMenu.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                mobileMenu.style.zIndex = '999';
                mobileMenu.style.display = 'none';
                
                // Make sure the nav links are visible in the mobile menu
                navLinksClone.style.display = 'flex';
                navLinksClone.style.flexDirection = 'column';
                navLinksClone.style.alignItems = 'center';
                navLinksClone.style.marginBottom = '20px';
                
                // Make sure the CTA buttons are visible in the mobile menu
                ctaButtonsClone.style.display = 'flex';
                ctaButtonsClone.style.flexDirection = 'column';
                ctaButtonsClone.style.alignItems = 'center';
                ctaButtonsClone.style.gap = '10px';
                
                // Get all links in mobile menu
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.style.display = 'block';
                    link.style.padding = '10px 0';
                    link.style.fontSize = '18px';
                    link.style.textAlign = 'center';
                    link.style.width = '100%';
                });
            }
            
            // Toggle mobile menu visibility
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                    mobileMenu.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                } else {
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = ''; // Allow scrolling
                }
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = ''; // Allow scrolling
                mobileMenuBtn.classList.remove('active');
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just "#"
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .integration-card, .section-header, .architecture-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.feature-card, .integration-card, .section-header, .architecture-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
