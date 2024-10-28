document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let checkin = urlParams.get('checkin');
    let checkout = urlParams.get('checkout');
    let adults = urlParams.get('adults'); // Get the number of adults from URL
    let childs = urlParams.get('childs'); // Get the number of children from URL

    // Set default dates if they are not provided in the query string
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    checkin = checkin || today;
    checkout = checkout || tomorrow;

    document.getElementById('checkin').value = checkin;
    document.getElementById('checkout').value = checkout;

    fetchAvailableRooms(checkin, checkout, adults, childs);
});

function fetchAvailableRooms(checkin, checkout, adults, childs) {
    // Pass checkin and checkout as query parameters in the fetch request
    fetch(`https://lantaajresort.onrender.com/available-rooms?checkin=${checkin}&checkout=${checkout}&adults=${adults}&childs=${childs}`)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data); // Debugging line
        const roomList = document.getElementById('room-list');
        // Ensure it picks up the images from the available room
        
        roomList.innerHTML = ''; // Clear previous results
        if (data.length === 0) {
            roomList.innerHTML = '<p>No available rooms for the selected dates.</p>';
        } else {
            data.forEach(room => {

                console.log('Room Images:', room.images); // Debugging line
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                // Use the first image as the main image on the room card
                const imageUrls = Array.isArray(room.images) ? room.images : [];
                const firstImage = room.images.length > 0 ? room.images[0] : '/pictures/logoaj.jpg';
                roomCard.innerHTML = `
                <div class="image-container">
                    <img src="${firstImage}" alt="Room Image" class="room-image" />
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
                    <p class="room-meta">Sleeps 2 | 1 King Bed</p>
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
                        <p>Number of Rooms</p>
            
                        <select id="room-count-${room.room_type.replace(/\s+/g, '-')}" class="room-count-select">
                            ${[...Array(Math.min(4, room.available_rooms)).keys()].map(i => `<option value="${i + 1}">${i + 1} Room${i > 0 ? 's' : ''}</option>`).join('')}
                        </select>

                        <p>1 night, 1 person</p>
                        <p class="price">THB ${room.price}</p>
                        <button class="select-button">Select</button>
                    </div>
                </div>
                `;

                // Attach event listener to the Select button
                const selectButton = roomCard.querySelector('.select-button'); 
                // Log the available rooms
                console.log(`Available Rooms for ${room.room_type} : ${room.available_rooms}`);
                selectButton.addEventListener('click', () => {
                    const roomCount = parseInt(document.getElementById(`room-count-${room.room_type.replace(/\s+/g, '-')}`).value, 10);
                
                    // Log the room count selected for debugging
                    console.log(`Selected Rooms: ${roomCount}`);
                
                    // Check room availability before proceeding
                    checkRoomAvailability(room.room_type, checkin, checkout, roomCount)
                        .then(response => {
                            if (response.available) {
                                // Redirect to confirm.html with room details as query parameters
                                window.location.href = `confirm.html?room_type=${encodeURIComponent(room.room_type)}&price=${room.price}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&childs=${childs}&room_count=${roomCount}`;
                            } else {
                                alert(`Not enough rooms available. Only ${response.availableRooms} rooms are available.`);
                            }
                        })
                        .catch(error => {
                            console.error('Error checking availability:', error);
                            alert('An error occurred while checking room availability. Please try again later.');
                        });
                });

                // Attach event listener to the Gallery button
                const galleryButton = roomCard.querySelector('.gallery-button');
                galleryButton.addEventListener('click', () => openGallery(imageUrls));

                roomList.appendChild(roomCard);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching rooms:', error);
        document.getElementById('room-list').innerHTML = '<p>Failed to load available rooms. Please try again later.</p>';
    });
}
// Add the checkRoomAvailability function here
async function checkRoomAvailability(roomType, checkin, checkout, roomCount) {
    try {
        const response = await fetch(`https://lantaajresort.onrender.com/check-room-availability?roomType=${encodeURIComponent(roomType)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}&roomCount=${encodeURIComponent(roomCount)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching room availability:', error);
        throw error;
    }
}

// Open the gallery modal with multiple images
function openGallery(imageUrls) {
    console.log('Image URLs:', imageUrls); // Verify the array is received correctly

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
