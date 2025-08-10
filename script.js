
        // Animation des particules
        // function createParticle() {
        //     const particle = document.createElement('div');
        //     particle.className = 'particle';
        //     particle.style.left = Math.random() * 100 + '%';
        //     particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        //     particle.style.animationDelay = Math.random() * 2 + 's';
        //     document.querySelector('.particles').appendChild(particle);
            
        //     setTimeout(() => {
        //         particle.remove();
        //     }, 20000);
        // }

        // Créer des particules continuellement
        // setInterval(createParticle, 500);

        // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Navigation sticky
        // let lastScrollTop = 0;
        // window.addEventListener('scroll', () => {
        //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        //     const navbar = document.querySelector('.navbar');
            
        //     if (scrollTop > 100) {
        //         navbar.classList.add('scrolled');
        //     } else {
        //         navbar.classList.remove('scrolled');
        //     }
            
            // Masquer/afficher la navbar selon le scroll
        //     if (scrollTop > lastScrollTop && scrollTop > 200) {
        //         navbar.style.transform = 'translateY(-100%)';
        //     } else {
        //         navbar.style.transform = 'translateY(0)';
        //     }
        //     lastScrollTop = scrollTop;
        // });

        // Scroll fluide
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation des compteurs
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                let count = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = counter.textContent.replace(/\d+/, target);
                        clearInterval(timer);
                    } else {
                        counter.textContent = counter.textContent.replace(/\d+/, Math.floor(count));
                    }
                }, 20);
            });
        }

        // Observer pour déclencher l'animation des compteurs
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Effet de parallaxe léger
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero::before, .stats-section::before');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Cursor personnalisé (désactivé sur mobile)
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                document.body.style.setProperty('--cursor-x', e.clientX + 'px');
                document.body.style.setProperty('--cursor-y', e.clientY + 'px');
            });
        }

        // Suppression de l'écran de chargement
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.querySelector('.loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.remove(), 500);
                }
            }, 1500);
        });

        // Animation d'écriture pour le titre
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Effet de glassmorphism dynamique
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.program-card, .testimonial-card, .stat-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                } else {
                    card.style.transform = '';
                }
            });
        });

        // Optimization des performances
        let ticking = false;
        function updateAnimations() {
            // Logique d'animation optimisée
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        // Gestion responsive du menu mobile
        function createMobileMenu() {
            if (window.innerWidth <= 768) {
                // Logique pour menu mobile
                const navbar = document.querySelector('.navbar');
                const navLinks = document.querySelector('.nav-links');
                
                // Convertir en menu hamburger si nécessaire
                if (!document.querySelector('.mobile-menu-toggle')) {
                    const mobileToggle = document.createElement('button');
                    mobileToggle.className = 'mobile-menu-toggle';
                    mobileToggle.innerHTML = '☰';
                    navbar.querySelector('.nav-container').appendChild(mobileToggle);
                    
                    mobileToggle.addEventListener('click', () => {
                        navLinks.classList.toggle('mobile-active');
                    });
                }
            }
        }

        window.addEventListener('resize', createMobileMenu);
        createMobileMenu();

        // Preloader amélioré
        const preloaderMessages = [
            'Chargement de l\'excellence...',
            'Initialisation du futur...',
            'Préparation de l\'innovation...',
            'Activation des technologies...',
            'Lancement de NEXUS Academy...'
        ];

        let messageIndex = 0;
        const loadingText = document.querySelector('.loading-text');
        
        const messageInterval = setInterval(() => {
            if (loadingText && messageIndex < preloaderMessages.length - 1) {
                messageIndex++;
                loadingText.textContent = preloaderMessages[messageIndex];
            } else {
                clearInterval(messageInterval);
            }
        }, 400);

        // Nettoyage et optimisation
        window.addEventListener('beforeunload', () => {
            // Nettoyage des event listeners et animations
            clearInterval(messageInterval);
        });
    