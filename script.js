// JavaScript for slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // The site is ready for JavaScript code
    console.log('Site loaded successfully');
    
    // Setup carousel without animation but with working controls
    const productDealsSlider = document.getElementById('productDealsSlider');
    if (productDealsSlider) {
        // Make sure transitions work but without animation
        const carousel = new bootstrap.Carousel(productDealsSlider, {
            interval: 4000,
            wrap: true,
            keyboard: true,
            pause: false
        });
        
        // Force cycling with a manual timer
        setInterval(function() {
            carousel.next();
        }, 4000);
        
        // Ensure next/prev buttons work
        const prevButton = productDealsSlider.querySelector('.carousel-control-prev');
        const nextButton = productDealsSlider.querySelector('.carousel-control-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                carousel.prev();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                carousel.next();
            });
        }
    }
    
    // Function to fetch electronics product data from mock API
    function fetchElectronicsProductData() {
        fetch('https://run.mocky.io/v3/ae80074c-b081-47b8-a205-94a9aa905ebc')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateSecondarySliderProducts(data);
            })
            .catch(error => {
                console.error('Error fetching electronics product data:', error);
            });
    }

    // Function to update the secondary slider with electronics product data
    function updateSecondarySliderProducts(products) {
        const carouselInner = document.querySelector('#productDealsSlider .carousel-inner');
        if (!carouselInner || !products || products.length === 0) return;
        
        // Clear existing content
        carouselInner.innerHTML = '';
        
        // Add each product as a carousel item
        products.forEach((product, index) => {
            // The provided URLs are to Pexels pages, not to the actual images
            // We need to convert URLs like "https://www.pexels.com/photo/handheld-gaming-console-on-suitcase-indoors-31609214/"
            // to actual image URLs
            
            // Extract photo ID from the URL
            let photoId = '';
            const urlMatch = product.ProductImage.match(/\/photo\/[^\/]+-(\d+)\/$/);
            if (urlMatch && urlMatch[1]) {
                photoId = urlMatch[1];
            }
            
            // Use a direct Pexels image URL or a placeholder if extraction fails
            const imageUrl = photoId ? 
                `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=220&h=220` :
                'https://via.placeholder.com/220x220?text=Image+Not+Found';
            
            const itemHtml = `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <div class="product-deal-card">
                        <div style="width: 50%; padding-right: 12px; display: flex; align-items: center; justify-content: flex-start; padding-left: 0;">
                            <img src="${imageUrl}" class="img-fluid" alt="${product.ProductName}" style="margin-left: -20px;">
                        </div>
                        <div style="width: 50%; display: flex; flex-direction: column; justify-content: center; height: 100%; padding-right: 10px;">
                            <div style="display: flex; flex-direction: column; margin-bottom: 2px;">
                                <div class="text-primary" style="font-size: 0.9rem; margin-bottom: 3px;">Peşin fiyatına 9 taksit*</div>
                                <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 3px;">${product.ProductName}</div>
                                <div class="text-muted" style="font-size: 0.9rem; margin-bottom: 3px;">Stok: ${product.ProductStok}</div>
                                <div class="fw-bold" style="font-size: 1.2rem;">${product.ProductPrice}</div>
                            </div>
                            <button class="btn btn-light w-100 border py-1">Sepete Ekle</button>
                        </div>
                    </div>
                </div>
            `;
            
            carouselInner.innerHTML += itemHtml;
        });
    }
    
    // Function to fetch slider data from API
    function fetchSliderData() {
        fetch('https://run.mocky.io/v3/e6ea1a57-331c-4218-b7df-66499a609d86')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateMainSlider(data);
                updateSecondarySlider(data);
            })
            .catch(error => {
                console.error('Error fetching slider data:', error);
                document.querySelectorAll('.slider-image-container img, #secondarySlider img').forEach(img => {
                    img.src = 'https://via.placeholder.com/800x350?text=Failed+to+Load+API+Data';
                });
            });
    }
    
    // Function to fetch box data from API
    function fetchBoxData() {
        fetch('https://run.mocky.io/v3/708a363a-3911-4d5c-b3b4-0cc7624aa9eb')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateBoxes(data);
            })
            .catch(error => {
                console.error('Error fetching box data:', error);
            });
    }
    
    // Function to fetch product data from API
    function fetchProductData() {
        fetch('https://run.mocky.io/v3/3f3245f1-b940-4c3e-a580-e46d834f9bb6')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateProducts(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }
    
    // Function to update products with API data
    function updateProducts(data) {
        const productContainer = document.querySelector('.recommendation-container .row');
        if (!productContainer) return;
        
        // Clear existing content
        productContainer.innerHTML = '';
        
        // Add product cards based on API data
        data.forEach(product => {
            // Extract photo ID from the URL
            // Format example: "https://www.pexels.com/photo/close-up-shot-of-a-black-computer-mouse-on-a-white-surface-9058886/"
            let photoId = '';
            const urlParts = product.ProductImage.split('/');
            
            // Find the numeric ID (last numeric part in the URL)
            for (let i = urlParts.length - 1; i >= 0; i--) {
                if (urlParts[i] && !isNaN(parseInt(urlParts[i]))) {
                    photoId = urlParts[i];
                    break;
                }
            }
            
            // If we couldn't find a numeric ID, try extracting from the last part
            if (!photoId) {
                const lastPart = urlParts[urlParts.length - 2];  // Last non-empty part (due to trailing slash)
                if (lastPart) {
                    const match = lastPart.match(/\d+$/);
                    if (match) {
                        photoId = match[0];
                    }
                }
            }
            
            // Use a direct Pexels image URL
            const imageUrl = photoId ? 
                `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=300&h=300` :
                'https://via.placeholder.com/300x300?text=Image+Not+Found';
            
            // Generate stars based on rating
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= product.ProductRating) {
                    starsHtml += '★'; // Filled star
                } else {
                    starsHtml += '☆'; // Empty star
                }
            }
            
            // Generate rating text
            const ratingText = `(${Math.floor(Math.random() * 400) + 50})`; // Random number of reviews
            
            const productHtml = `
                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                    <div class="product-card" data-product-id="${product.ProductID}" data-product-name="${product.ProductName}" 
                         data-product-price="${product.ProductPrice}" data-product-rating="${product.ProductRating}" 
                         data-product-image="${imageUrl}" data-rating-text="${ratingText}" data-stars-html="${starsHtml}">
                        <div class="product-image-container">
                            <img src="${imageUrl}" class="product-image" alt="${product.ProductName}">
                            <button class="favorite-btn" aria-label="Add to favorites">♡</button>
                        </div>
                        <div class="product-details">
                            <h5 class="product-name">${product.ProductName}</h5>
                            <div class="product-rating">
                                <span class="stars">${starsHtml}</span>
                                <span class="rating-count">${ratingText}</span>
                            </div>
                            <div class="product-price">
                                <span class="price">${product.ProductPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            productContainer.innerHTML += productHtml;
        });
        
        // Add click event handlers to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't open popup if favorite button was clicked
                if (e.target.classList.contains('favorite-btn') || e.target.closest('.favorite-btn')) {
                    return;
                }
                
                // Get product data from data attributes
                const productId = this.getAttribute('data-product-id');
                const productName = this.getAttribute('data-product-name');
                const productPrice = this.getAttribute('data-product-price');
                const productRating = this.getAttribute('data-product-rating');
                const productImage = this.getAttribute('data-product-image');
                const ratingText = this.getAttribute('data-rating-text');
                const starsHtml = this.getAttribute('data-stars-html');
                
                // Show popup with product details
                showProductPopup(productId, productName, productPrice, productRating, productImage, ratingText, starsHtml);
            });
        });
        
        // Re-initialize favorite buttons after updating products
        initFavoriteButtons();
    }
    
    // Function to show product popup
    function showProductPopup(productId, productName, productPrice, productRating, productImage, ratingText, starsHtml) {
        // Set popup content
        document.getElementById('popupImage').src = productImage;
        document.getElementById('popupName').textContent = productName;
        document.getElementById('popupStars').innerHTML = starsHtml;
        document.getElementById('popupRatingCount').textContent = ratingText;
        document.getElementById('popupPrice').textContent = productPrice;
        
        // Show popup
        document.getElementById('productPopup').classList.add('active');
    }
    
    // Initialize product popup
    function initProductPopup() {
        const popup = document.getElementById('productPopup');
        const closeBtn = document.getElementById('closePopup');
        const popupFavoriteBtn = document.getElementById('popupFavoriteBtn');
        
        // Close popup when clicking the close button
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        
        // Close popup when clicking outside the popup content
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
        
        // Toggle favorite button in popup
        popupFavoriteBtn.addEventListener('click', function() {
            if (this.innerHTML === '♡') {
                this.innerHTML = '♥';
                this.classList.add('active');
            } else {
                this.innerHTML = '♡';
                this.classList.remove('active');
            }
        });
    }
    
    // Function to update boxes with API data
    function updateBoxes(data) {
        const boxesContainer = document.querySelector('.boxes-container');
        if (!boxesContainer) return;
        
        // Clear existing content
        boxesContainer.innerHTML = '';
        
        // Add boxes based on API data
        data.forEach(box => {
            let boxContent = '';
            
            if (box.BoxImageLink) {
                // Box with image
                boxContent = `
                    <div class="box-item">
                        <a href="${box.BoxLink}" class="box-link">
                            <div class="orange-box">
                                <div class="blue-line">${box.BoxBlueText}</div>
                                <img src="${box.BoxImageLink}" alt="${box.BoxName}" class="box-image">
                            </div>
                            <div class="box-title">${box.BoxName}</div>
                        </a>
                    </div>
                `;
            } else {
                // Box with text
                boxContent = `
                    <div class="box-item">
                        <a href="${box.BoxLink}" class="box-link">
                            <div class="orange-box">
                                <div class="blue-line">${box.BoxBlueText}</div>
                                <div class="promo-text">${box.BoxText}</div>
                            </div>
                            <div class="box-title">${box.BoxName}</div>
                        </a>
                    </div>
                `;
            }
            
            boxesContainer.innerHTML += boxContent;
        });
    }
    
    // Function to update main slider with API data
    function updateMainSlider(data) {
        const carouselInner = document.querySelector('#mainSlider .carousel-inner');
        if (!carouselInner) return;
        
        // Clear existing content
        carouselInner.innerHTML = '';
        
        // Add slider items
        data.forEach((item, index) => {
            // Extract photo ID from the URL
            // Format example: "https://www.pexels.com/photo/man-in-yellow-shirt-and-brown-pants-5869616/"
            let photoId = '';
            const urlParts = item.slider1Image.split('/');
            
            // Find the numeric ID (last numeric part in the URL)
            for (let i = urlParts.length - 1; i >= 0; i--) {
                if (urlParts[i] && !isNaN(parseInt(urlParts[i]))) {
                    photoId = urlParts[i];
                    break;
                }
            }
            
            // If we couldn't find a numeric ID, try extracting from the last part
            if (!photoId) {
                const lastPart = urlParts[urlParts.length - 2];  // Last non-empty part (due to trailing slash)
                const match = lastPart.match(/\d+$/);
                if (match) {
                    photoId = match[0];
                }
            }
            
            // Use a direct Pexels image URL
            const imageUrl = photoId ? 
                `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=800&h=350` :
                'https://via.placeholder.com/800x350?text=Image+Not+Found';
            
            console.log(`Processing slide ${index+1}:`, item.slider1Image, '→', imageUrl);
            
            const slideHtml = `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <div class="slider-split-content">
                        <div class="slider-image-container">
                            <img src="${imageUrl}" alt="${item.slider1Title}" onerror="this.src='https://via.placeholder.com/800x350?text=Failed+to+Load'">
                        </div>
                        <div class="slider-orange-box">
                            <h3>${item.slider1Title}</h3>
                            <p>${item.slider1Text}</p>
                        </div>
                    </div>
                    <div class="slide-counter">${item.slider1Index}/10</div>
                </div>
            `;
            
            carouselInner.innerHTML += slideHtml;
        });
        
        // Initialize the main carousel with 5 second interval for auto sliding
        const mainCarousel = new bootstrap.Carousel(document.getElementById('mainSlider'), {
            interval: 5000,
            pause: 'hover'
        });
    }
    
    // Function to update secondary slider with API data
    function updateSecondarySlider(data) {
        const carouselInner = document.querySelector('#secondarySlider .carousel-inner');
        if (!carouselInner || !data || data.length < 3) return;
        
        // We'll use only the first item for the secondary slider - just showing one static item
        const item = data[0];
        
        // Clear existing content
        carouselInner.innerHTML = '';
        
        // Extract photo ID using the same logic as main slider
        let photoId = '';
        const urlParts = item.slider1Image.split('/');
        
        for (let i = urlParts.length - 1; i >= 0; i--) {
            if (urlParts[i] && !isNaN(parseInt(urlParts[i]))) {
                photoId = urlParts[i];
                break;
            }
        }
        
        if (!photoId) {
            const lastPart = urlParts[urlParts.length - 2];
            const match = lastPart.match(/\d+$/);
            if (match) {
                photoId = match[0];
            }
        }
        
        const imageUrl = photoId ? 
            `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=800&h=350` :
            'https://via.placeholder.com/800x350?text=Image+Not+Found';
        
        const slideHtml = `
            <div class="carousel-item active">
                <img src="${imageUrl}" class="d-block w-100" alt="${item.slider1Title}" onerror="this.src='https://via.placeholder.com/800x350?text=Failed+to+Load'">
            </div>
        `;
        
        carouselInner.innerHTML = slideHtml;
        
        // Remove controls from the secondary slider
        const prevButton = document.querySelector('#secondarySlider .carousel-control-prev');
        const nextButton = document.querySelector('#secondarySlider .carousel-control-next');
        const indicators = document.querySelector('#secondarySlider .carousel-indicators');
        
        if (prevButton) prevButton.remove();
        if (nextButton) nextButton.remove();
        if (indicators) indicators.remove();
        
        // Completely disable carousel functionality
        const secondarySlider = document.getElementById('secondarySlider');
        if (secondarySlider) {
            // Remove data attributes that Bootstrap uses to initialize carousel
            secondarySlider.removeAttribute('data-bs-ride');
            secondarySlider.removeAttribute('data-bs-interval');
        }
    }
    
    // Initialize favorite buttons
    function initFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the card click event from triggering
                
                // Toggle between empty and filled heart
                if (button.innerHTML === '♡') {
                    button.innerHTML = '♥';
                    button.classList.add('active');
                } else {
                    button.innerHTML = '♡';
                    button.classList.remove('active');
                }
            });
        });
    }
    
    // Call the functions to fetch and update data
    fetchSliderData();
    fetchBoxData();
    fetchProductData();
    fetchElectronicsProductData();
    
    // Initialize interactive elements
    initFavoriteButtons();
    initProductPopup();
    
    // Helper function to prevent scrolling the page when scrolling inside carousel
    const sliderContainers = document.querySelectorAll('.carousel-item .d-flex');
    sliderContainers.forEach(container => {
        container.addEventListener('wheel', function(e) {
            if (this.scrollWidth > this.clientWidth) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    });
}); 