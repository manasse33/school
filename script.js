
        
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        
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
                // Close mobile menu
                navLinks.classList.remove('active');
            });
        });

        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
        });

        function openModal(modalId) {
            const modal = document.getElementById('galleryModal');
            const caption = document.getElementById('modalCaption');
            
            const captions = {
                'modal1': 'Nos salles de classe modernes offrent un environnement d\'apprentissage optimal avec des équipements technologiques de pointe.',
                'modal2': 'Notre laboratoire informatique dispose d\'ordinateurs récents et de logiciels professionnels pour une formation pratique.',
                'modal3': 'La bibliothèque propose un vaste choix de ressources pédagogiques et des espaces d\'étude silencieux.',
                'modal4': 'Les cérémonies de remise des diplômes célèbrent la réussite de nos étudiants et marquent le début de leur carrière.',
                'modal5': 'Les travaux pratiques permettent aux étudiants de mettre en application leurs connaissances théoriques.',
                'modal6': 'Notre campus moderne situé au cœur de Brazzaville offre un cadre d\'étude exceptionnel.'
            };
            
            caption.textContent = captions[modalId] || '';
            modal.style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('galleryModal').style.display = 'none';
        }

        document.getElementById('galleryModal').addEventListener('click', (e) => {
            if (e.target.id === 'galleryModal') {
                closeModal();
            }
        });

       
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
  