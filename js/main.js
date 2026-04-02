document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Back to Top visibility
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Highlight active nav link based on scroll section
        updateActiveLink();
    });

    // 2. Active Link Highlighting
    function updateActiveLink() {
        let fromTop = window.scrollY + 100;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 3. Reveal Animations on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Smooth Scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Back to Top Click
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Form Submission (Simulated)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // 7. Interactive Comparison Sliders
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.handle');
        let isDragging = false;

        const move = (e) => {
            if (!isDragging && e.type !== 'mousemove' && e.type !== 'touchmove') return;
            
            // For continuous movement without clicking (optional, but standard for these sliders is move on hover or click-drag)
            // We'll use click-drag for better control on touch
            if (!isDragging) return;

            const rect = slider.getBoundingClientRect();
            const x = (e.pageX || e.touches[0].pageX) - rect.left - window.scrollX;
            let percent = (x / rect.width) * 100;
            
            if (percent < 0) percent = 0;
            if (percent > 100) percent = 100;
            
            slider.style.setProperty('--clip', `${percent}%`);
        };

        const startDragging = () => isDragging = true;
        const stopDragging = () => isDragging = false;

        slider.addEventListener('mousedown', startDragging);
        slider.addEventListener('touchstart', startDragging);
        
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('touchend', stopDragging);
        
        slider.addEventListener('mousemove', move);
        slider.addEventListener('touchmove', move);
    });
});
