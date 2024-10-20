document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let checkin = urlParams.get('checkin');
    let checkout = urlParams.get('checkout');
    let adults = urlParams.get('adults');  // Get the number of adults from URL
    let childs = urlParams.get('childs');  // Get the number of adults from URL

    // Set default dates if they are not provided in the query string
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    checkin = checkin || today;
    checkout = checkout || tomorrow;

    document.getElementById('checkin').value = checkin;
    document.getElementById('checkout').value = checkout;



    

    fetchAvailableRooms(checkin, checkout,adults,childs);
});

function fetchAvailableRooms(checkin, checkout,adults,childs) {
    // Pass checkin and checkout as query parameters in the fetch request
    fetch(`http://127.0.0.1:4000/available-rooms?checkin=${checkin}&checkout=${checkout}&adults=${adults}&childs=${childs}`)
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
                        <li><i class="fas fa-tv"></i> Smart TV</li>
                        <li><i class="fas fa-wifi"></i> Free Wifi</li>
                        <li><i class="fas fa-snowflake"></i> Air Conditioning</li>
                        <li><i class="fas fa-couch"></i> Sitting Area</li>
                    </ul>
                </div>
                <div class="room-details">
                    <h3>${room.room_type}</h3>
                    <p class="room-meta">Sleeps 2 | 1 King Bed 
                    <p>${room.description}</p>
                   
            
                    <div class="offer-section">
                        <p><strong>ROOM ONLY DEAL </strong></p>
                        <ul>
                            <li><i class="fas fa-utensils"></i> Breakfast included</li>
                            <li><i class="fas fa-ban"></i> Non-cancellable, non-modifiable</li>
                            <li><i class="fas fa-credit-card"></i> Pay Now</li>
                        </ul>
                    </div>
            
                    <div class="price-section">
                        <p>1 night, 1 person</p>
                        <p class="price">THB ${room.price}</p>
                        <button class="select-button">Select</button>
                    </div>
                </div>
            `;
                 // Attach event listener to the Select button
                const selectButton = roomCard.querySelector('.select-button');
                selectButton.addEventListener('click', () => {
                    // Redirect to confirm.html with room details as query parameters
                    window.location.href = `confirm.html?room_type=${encodeURIComponent(room.room_type)}&price=${room.price}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&childs=${childs}`;
                });

                roomList.appendChild(roomCard);
            
                
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
