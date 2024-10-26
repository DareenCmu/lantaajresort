// JavaScript to toggle the side menu
document.getElementById('hamburgerMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.right = '0';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('sideMenu').style.right = '-250px';
});

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    let slideInterval;

    // Get the slides and dots elements
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Ensure there are slides and dots available, if not, exit the script and stop the interval
    if (slides.length === 0) {
        console.error("No slides available. Exiting slideshow script.");
        return;
    }

    if (dots.length === 0) {
        console.error("No dots available. Exiting slideshow script.");
        return;
    }

    // Show the first slide
    showSlides(slideIndex);

    // Automatic slide change every 3 seconds, but store the interval so we can clear it later
    slideInterval = setInterval(function() {
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

        // If n is greater than the number of slides, reset to the first slide
        if (n > slides.length) {
            slideIndex = 1;
        }
        // If n is less than 1, set to the last slide
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

        // Show the current slide and activate the corresponding dot
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        } else {
            console.error("No slides available, stopping the slideshow.");
            clearInterval(slideInterval); // Stop the slideshow if no slides are available
        }
    }

    
});



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