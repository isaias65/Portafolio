fetch('../projects.json')
    .then(response => response.json())
    .then(data => {
        const projects = data.projects;
        const containerProjects = document.querySelector('#proyectos .container-projects');
        
        projects.forEach((project, index) => {
            const projectHTML = `
                <article class="project">
                    <figure class="project-imagen">
                        <img src="${project.imagePrimary}" alt="${project.title} image">
                    </figure>
                    <div class="project-info">
                        <h2 class="project-title">${project.title}</h2>
                        <p class="project-description">${project.shortDescription}</p>
                        <button class="button-primary" data-index="${index}">Ver Más</button>
                    </div>
                </article>
            `;
            containerProjects.innerHTML += projectHTML;
        });

        document.querySelectorAll('.button-primary').forEach(button => {
            button.addEventListener('click', () => {
                const projectIndex = button.getAttribute('data-index');
                const project = projects[projectIndex];

                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.longDescription;

                // Limpiar tecnologías antes de agregar nuevas
                const technologiesContainer = document.getElementById('modal-languages');
                technologiesContainer.innerHTML = ''; // Limpiar contenido anterior

                // Agregar cada tecnología como una burbuja
                project.technologies.forEach(tech => {
                    const techBubble = document.createElement('span');
                    techBubble.classList.add('tech-bubble');
                    techBubble.textContent = tech;
                    technologiesContainer.appendChild(techBubble);
                });

                let currentImageIndex = 0;
                const carouselImage = document.querySelector('.carousel-image');
                const projectImages = project.images;

                carouselImage.src = projectImages[currentImageIndex];

                function updateCarouselImage(index) {
                    carouselImage.src = projectImages[index];
                }

                document.querySelector('.prev').addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex === 0) ? projectImages.length - 1 : currentImageIndex - 1;
                    updateCarouselImage(currentImageIndex);
                });

                document.querySelector('.next').addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex === projectImages.length - 1) ? 0 : currentImageIndex + 1;
                    updateCarouselImage(currentImageIndex);
                });

                document.getElementById('projectModal').classList.remove('hidden');
            });
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('projectModal').classList.add('hidden');
        });

        document.getElementById('projectModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('projectModal')) {
                document.getElementById('projectModal').classList.add('hidden');
            }
        });
    })
    .catch(error => console.error('Error al cargar los datos del JSON:', error));
