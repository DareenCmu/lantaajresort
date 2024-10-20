document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let checkin = urlParams.get('checkin');
    let checkout = urlParams.get('checkout');

    // Set default dates if they are not provided in the query string
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    checkin = checkin || today;
    checkout = checkout || tomorrow;

    document.getElementById('checkin').value = checkin;
    document.getElementById('checkout').value = checkout;

    fetchAvailableRooms(checkin, checkout);
});

function fetchAvailableRooms(checkin, checkout) {
    // Pass checkin and checkout as query parameters in the fetch request
    fetch(`http://127.0.0.1:4000/available-rooms?checkin=${checkin}&checkout=${checkout}`)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);  // Debugging line
        const roomList = document.getElementById('room-list');
        roomList.innerHTML = ''; // Clear previous results
        if (data.length === 0) {
            roomList.innerHTML = '<p>No available rooms for the selected dates.</p>';
        } else {
            data.forEach(room => {
                console.log('Room Images:', room.images);  // Debugging line
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                roomCard.innerHTML = `
                <div class="image-container">
                    <img src="${room.image_url}" alt="Room Image" class="room-image" />
                    <button class="gallery-button">
                        <i class="fa fa-images"></i> 
                    </button>
                    <ul class="amenities">
                        <li><i class="fas fa-smoking-ban"></i> Non-smoking</li>
                        <li><i class="fas fa-wifi"></i> Free Wifi</li>
                        <li><i class="fas fa-snowflake"></i> Air Conditioning</li>
                        <li><i class="fas fa-couch"></i> Sitting Area</li>
                    </ul>
                </div>
                <div class="room-details">
                    <h3>${room.room_type}</h3>
                    <p class="room-meta">Sleeps 2 | 1 Single Bed 
                    <p>${room.description}</p>
                    <a href="#" class="room-details-link">Room details</a>
            
                    <div class="offer-section">
                        <p><strong>ROOM ONLY DEAL - Exclusive Offer</strong></p>
                        <ul>
                            <li>Breakfast not included</li>
                            <li>Non-cancellable, non-modifiable</li>
                            <li>Pay later</li>
                        </ul>
                    </div>
            
                    <div class="price-section">
                        <p>1 night, 1 person</p>
                        <p class="price">THB ${room.price}</p>
                        <button class="select-button">Select</button>
                    </div>
                </div>
            `;
            
                
                // Attach event listener to the Gallery button
                const galleryButton = roomCard.querySelector('.gallery-button');
                galleryButton.addEventListener('click', () => openGallery(room.images));
    
                roomList.appendChild(roomCard);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching rooms:', error);
        document.getElementById('room-list').innerHTML = '<p>Failed to load available rooms. Please try again later.</p>';
    });
}

// Open the gallery modal with multiple images
function openGallery(imageUrls) {
    console.log('Image URLs:', imageUrls);  // Verify the array is received correctly

    const modal = document.getElementById('galleryModal');
    const slidesContainer = document.getElementById('slidesContainer');
    modal.style.display = 'block';
    slidesContainer.innerHTML = ''; // Clear any previous slides

    // Create slide elements for each image
    imageUrls.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.display = 'none'; // Hide all slides initially
        slide.innerHTML = `<img src="${url}" alt="Room Image" class="slide-image" />`;
        slidesContainer.appendChild(slide);
    });

    // Show the first slide
    if (imageUrls.length > 0) {
        slidesContainer.querySelector('.slide').style.display = 'block';
        currentSlideIndex = 0;
    }
}

// Close the modal when the user clicks the X button
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('galleryModal').style.display = 'none';
});

// Close the modal if the user clicks anywhere outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Slide navigation logic
let currentSlideIndex = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    slides[currentSlideIndex].style.display = 'none'; // Hide current slide
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length; // Update slide index
    slides[currentSlideIndex].style.display = 'block'; // Show new slide
}
