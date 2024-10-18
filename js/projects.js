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
                document.getElementById('modal-languages').textContent = `Technologies: ${project.technologies.join(', ')}`;

                let currentImageIndex = 0;
                const carouselImage = document.querySelector('.carousel-image');
                const projectImages = project.images;

                // Mostrar la primera imagen del carrusel
                carouselImage.src = projectImages[currentImageIndex];

                document.getElementById('projectModal').classList.remove('hidden');
            });
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('projectModal').classList.add('hidden');
        });
    })
    .catch(error => console.error('Error al cargar los datos del JSON:', error));
