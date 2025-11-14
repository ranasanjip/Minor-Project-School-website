document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.grid-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.image-caption h3');
    const lightboxDesc = document.querySelector('.image-caption p');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.grid-item:not(.hidden)'));
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (this.style.display !== 'none') {
                currentImageIndex = parseInt(this.getAttribute('data-index')) - 1;
                updateLightbox();
                lightboxModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    }
    
    function updateLightbox() {
        const currentItem = images[currentImageIndex];
        lightboxImage.src = currentItem.querySelector('img').src;
        lightboxCaption.textContent = currentItem.querySelector('.image-overlay h3').textContent;
        lightboxDesc.textContent = currentItem.querySelector('.image-overlay p').textContent;
    }
    
    // Load More functionality
    const loadMoreBtn = document.querySelector('.load-more button');
    const hiddenItems = document.querySelectorAll('.grid-item.hidden');
    
    if (loadMoreBtn && hiddenItems.length > 0) {
        loadMoreBtn.addEventListener('click', function() {
            // Show next 4 hidden items
            const itemsToShow = Array.from(hiddenItems).slice(0, 4);
            itemsToShow.forEach(item => {
                item.classList.remove('hidden');
            });
            
            // Update images array for lightbox
            images.push(...itemsToShow);
            
            // Hide button if no more items
            if (document.querySelectorAll('.grid-item.hidden').length === 0) {
                this.style.display = 'none';
            }
        });
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
});