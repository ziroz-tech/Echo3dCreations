document.addEventListener('DOMContentLoaded', () => {
    // Load content.html
    fetch('content.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            initializeContent();
        });

    function initializeContent() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });

        function smoothScroll(event) {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Filter gallery items
        const filterButtons = document.querySelectorAll('.filter-buttons button');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const tags = item.getAttribute('data-tags').split(',');
                    if (filter === 'all' || tags.includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });

        // Gallery pagination
        const galleryPrevButton = document.querySelector('.gallery-prev');
        const galleryNextButton = document.querySelector('.gallery-next');
        let currentPage = 0;
        const itemsPerPage = 8;
        const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

        function showPage(page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            galleryItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        }

        function updateGallery() {
            showPage(currentPage + 1);
        }

        galleryPrevButton.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                updateGallery();
            } else {
                currentPage = totalPages - 1;
                updateGallery();
            }
        });

        galleryNextButton.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateGallery();
            } else {
                currentPage = 0;
                updateGallery();
            }
        });

        // Open portfolio popup
        const galleryImages = document.querySelectorAll('.gallery-item img');
        const portfolioPopup = document.getElementById('portfolio-popup');
        const portfolioPopupImage = document.getElementById('portfolio-popup-image');

        galleryImages.forEach(image => {
            image.addEventListener('click', (event) => {
                event.stopPropagation();
                const largeImageSrc = image.getAttribute('data-large');
                portfolioPopupImage.src = largeImageSrc;
                portfolioPopup.classList.add('show');
            });
        });

        portfolioPopup.addEventListener('click', (event) => {
            if (event.target === portfolioPopup) {
                portfolioPopup.classList.remove('show');
            }
        });

        // Initialize 3D models
        init3DModels();

        // Initialize hero 3D model
        initHero3DModel();

        // Services hover effect
        const servicesSection = document.querySelector('.services');
        const serviceItems = document.querySelectorAll('.service-item');
        let backgroundTimer = null;

        serviceItems.forEach(item => {
            const bgId = item.getAttribute('data-bg-id');
            let backgroundImage;

            switch (bgId) {
                case 'background-models':
                    backgroundImage = 'url(\'background-models.jpg\')';
                    break;
                case 'character-models':
                    backgroundImage = 'url(\'character-models.jpg\')';
                    break;
                case 'prop-models':
                    backgroundImage = 'url(\'prop-models.jpg\')';
                    break;
                default:
                    backgroundImage = 'none';
            }

            item.addEventListener('mouseenter', () => {
                servicesSection.style.backgroundImage = backgroundImage;
                clearTimeout(backgroundTimer);
            });

            item.addEventListener('mouseleave', () => {
                backgroundTimer = setTimeout(() => {
                    servicesSection.style.backgroundImage = 'none';
                }, 2000);
            });
        });

        // Open news popup
        const readMoreLinks = document.querySelectorAll('.read-more');
        const newsPopup = document.getElementById('news-popup');
        const newsPopupContent = document.getElementById('news-popup-content');
        const closeNewsPopupButton = newsPopup.querySelector('.close-popup');

        readMoreLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const articleId = link.getAttribute('data-article');
                const article = document.getElementById(articleId);
                newsPopupContent.innerHTML = article.innerHTML;
                newsPopup.classList.add('show');
            });
        });

        closeNewsPopupButton.addEventListener('click', () => {
            newsPopup.classList.remove('show');
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
});

function init3DModels() {
    const modelContainers = document.querySelectorAll('.gallery-item-3d');

    modelContainers.forEach(container => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const modelPath = container.getAttribute('data-model');
        const loader = new THREE.GLTFLoader();
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            animate();
        });

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    });
}

function initHero3DModel() {
    const container = document.getElementById('hero-3d-model');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xf0f0f0, 1);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    let currentModelIndex = 0;
    const heroModels = [
        '3d-models/hero-model-1.glb',
        '3d-models/hero-model-2.glb',
        '3d-models/hero-model-3.glb'
    ];

    const loader = new THREE.GLTFLoader();
    let heroModel;

    function loadHeroModel(modelPath) {
        loader.load(modelPath, (gltf) => {
            if (heroModel) {
                scene.remove(heroModel);
            }
            heroModel = gltf.scene;
            scene.add(heroModel);
            animate();
        });
    }

    loadHeroModel(heroModels[currentModelIndex]);

    camera.position.set(0, 0, 4);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 30;

    let isTextVisible = true;
    let textTimer = null;

    container.addEventListener('mousemove', () => {
        if (isTextVisible) {
            isTextVisible = false;
            document.querySelector('.hero-content').classList.add('hide');
        }
        clearTimeout(textTimer);
        textTimer = setTimeout(() => {
            isTextVisible = true;
            document.querySelector('.hero-content').classList.remove('hide');
        }, 3000);
    });

    const prevButton = document.querySelector('.prev-model');
    const nextButton = document.querySelector('.next-model');

    prevButton.addEventListener('click', () => {
        currentModelIndex = (currentModelIndex - 1 + heroModels.length) % heroModels.length;
        loadHeroModel(heroModels[currentModelIndex]);
    });

    nextButton.addEventListener('click', () => {
        currentModelIndex = (currentModelIndex + 1) % heroModels.length;
        loadHeroModel(heroModels[currentModelIndex]);
    });

    let initialAnimationPlayed = false;
    const initialModelPosition = new THREE.Vector3(0, 0, -6);
    const finalModelPosition = new THREE.Vector3(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        if (!initialAnimationPlayed) {
            const rotationSpeed = 0.035;
            const scaleSpeed = 0.005;
            const positionSpeed = 0.02;
            const targetRotationY = Math.PI * 2;
            const targetScale = 1;

            heroModel.rotation.y += rotationSpeed;
            heroModel.scale.x += scaleSpeed;
            heroModel.scale.y += scaleSpeed;
            heroModel.scale.z += scaleSpeed;
            heroModel.position.lerp(finalModelPosition, positionSpeed);

            if (heroModel.rotation.y >= targetRotationY && heroModel.scale.x >= targetScale) {
                initialAnimationPlayed = true;
                heroModel.rotation.y = 0;
            }
        }

        renderer.render(scene, camera);
    }
}
