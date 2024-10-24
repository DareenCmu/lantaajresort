// JavaScript to toggle the side menu
document.getElementById('hamburgerMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.right = '0';
   
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('sideMenu').style.right = '-250px';
});

let slideIndex = 1;
showSlides(slideIndex);

// Automatic slide change every 3 seconds
setInterval(function() {
    plusSlides(1);
}, 3000); // 3000 milliseconds = 3 seconds

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    console.log("Slides: ", slides); // Check if slides are found
    console.log("Dots: ", dots);     // Check if dots are found
    console.log("Below Dots.");
    // Ensure there are slides and dots available
    if (slides.length === 0) {
        console.error("No slides available.");
        return;
    }

    if (dots.length === 0) {
        console.error("No dots available.");
        return;
    }

    if (n > slides.length) { 
        slideIndex = 1;
    }
    if (n < 1) { 
        slideIndex = slides.length; 
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // Remove "active" class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Check the value of slideIndex before using it
     console.log("WOW.");
    console.log("Current slideIndex: ", slideIndex);

    // Only try to access the slide and dot if they exist
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    } else {
        console.error("Slide index out of bounds");
    }

    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    } else {
        console.error("Dot index out of bounds");
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const guestInput = document.getElementById('guests');
    const guestOptions = document.querySelector('.guest-options');
    const guestSummary = document.getElementById('guest-summary');

    const roomMinusBtn = document.getElementById('room-minus');
    const roomPlusBtn = document.getElementById('room-plus');
    const roomCountInput = document.getElementById('room-count');

    const adultMinusBtn = document.getElementById('adult-minus');
    const adultPlusBtn = document.getElementById('adult-plus');
    const adultCountInput = document.getElementById('adult-count');

    const childMinusBtn = document.getElementById('child-minus');
    const childPlusBtn = document.getElementById('child-plus');
    const childCountInput = document.getElementById('child-count');

    guestInput.addEventListener('click', function() {
        guestOptions.style.display = guestOptions.style.display === 'block' ? 'none' : 'block';
    });

    roomPlusBtn.addEventListener('click', function() {
        roomCountInput.value = parseInt(roomCountInput.value) + 1;
    });

    roomMinusBtn.addEventListener('click', function() {
        if (parseInt(roomCountInput.value) > 1) {
            roomCountInput.value = parseInt(roomCountInput.value) - 1;
        }
    });

    adultPlusBtn.addEventListener('click', function() {
        adultCountInput.value = parseInt(adultCountInput.value) + 1;
    });

    adultMinusBtn.addEventListener('click', function() {
        if (parseInt(adultCountInput.value) > 1) {
            adultCountInput.value = parseInt(adultCountInput.value) - 1;
        }
    });

    childPlusBtn.addEventListener('click', function() {
        childCountInput.value = parseInt(childCountInput.value) + 1;
    });

    childMinusBtn.addEventListener('click', function() {
        if (parseInt(childCountInput.value) > 0) {
            childCountInput.value = parseInt(childCountInput.value) - 1;
        }
    });

    window.confirmGuestSelection = function() {
        const rooms = roomCountInput.value;
        const adults = adultCountInput.value;
        const children = childCountInput.value;
        guestSummary.textContent = `${rooms} Room${rooms > 1 ? 's' : ''}, ${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children != 1 ? 'ren' : ''}`;
        guestOptions.style.display = 'none';
    };
});


// events
let rightSlideIndex = 1;
showRightSlides(rightSlideIndex);

function plusRightSlides(n) {
    showRightSlides(rightSlideIndex += n);
    console.log("Right side");
}

function currentRightSlide(n) {
    showRightSlides(rightSlideIndex = n);
    console.log("Left side");
}

function showRightSlides(n) {
    let i;
    let slides = document.getElementsByClassName("rightSlide");
    
    if (n > slides.length) {rightSlideIndex = 1}
    if (n < 1) {rightSlideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Show the current slide
    if (slides.length > 0) {
        slides[0].style.display = "block"; // Example of accessing the first slide
    } else {
        console.log("No slides found");
    }
    
}

document.addEventListener("DOMContentLoaded", function() {
    // Get today's date in yyyy-mm-dd format
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').value = today;

    // Set check-out date to tomorrow's date
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('checkout').value = tomorrowDate;
});
