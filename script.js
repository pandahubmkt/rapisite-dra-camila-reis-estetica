document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations with IntersectionObserver
    const revealOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navDrawer = document.querySelector('.nav-drawer');
    const drawerLinks = document.querySelectorAll('.nav-drawer a');

    if (menuBtn && navDrawer) {
        menuBtn.addEventListener('click', () => {
            navDrawer.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navDrawer.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden';
            } else {
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = '';
            }
            lucide.createIcons();
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                navDrawer.classList.remove('active');
                menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
                document.body.style.overflow = '';
                lucide.createIcons();
            });
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('h4');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Optional: close other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
            lucide.createIcons();
        });
    });

    // Navbar transparency on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
