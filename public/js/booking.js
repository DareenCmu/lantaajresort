document.getElementById('check-availability-btn').addEventListener('click', function() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guestSummary = document.getElementById('guest-summary').innerText;
    const adults = document.getElementById('adult-count').value;
    const childs = document.getElementById('child-count').value;

    console.log('Check-in Date:', checkin);
    console.log('Check-out Date:', checkout);
    console.log('Guest Summary:', guestSummary);
    console.log('Adults:', adults);
    console.log('childs:', adults);

    const url = `available-rooms.html?checkin=${checkin}&checkout=${checkout}&guests=${guestSummary}&adults=${adults}&childs=${childs}`;
    window.location.href = url;
});


// Add event listener for the "Book Now" button
document.querySelectorAll('.book-now-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Get check-in and check-out values
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const guestSummary = document.getElementById('guest-summary').innerText;
        const adults = document.getElementById('adult-count').value;
        const childs = document.getElementById('child-count').value;

        console.log('Check-in Date:', checkin);
        console.log('Check-out Date:', checkout);
        console.log('Guest Summary:', guestSummary);
        console.log('Adults:', adults);
        console.log('Children:', childs);

        // Create the URL with query parameters
        const url = `available-rooms.html?checkin=${checkin}&checkout=${checkout}&guests=${guestSummary}&adults=${adults}&childs=${childs}`;

        // Redirect to available-rooms.html with the parameters
        window.location.href = url;
    });
});