// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
// Check if check-in and check-out dates exist and are valid
let formattedCheckinDate; // Declare it outside the block
let formattedCheckoutDate; // Declare it for checkout as well
// Extract 'checkin' and 'checkout' values
const checkin = urlParams.get('checkin');
const checkout = urlParams.get('checkout');
const price = urlParams.get('price');
const room_type = urlParams.get('room_type');
const room_count = urlParams.get('roomCount');
const adults = urlParams.get('adults');
let childs = urlParams.get('childs');

// Provide a default value for children if it's missing from the URL
childs = childs !== null ? childs : 0; // If 'childs' is null, default to 0

// Check if check-in and check-out dates exist and are valid
if (checkin && checkout) {
    // Split the date string into parts
    const [year, month, day] = checkin.split('-');
    const [year1, month1, day1] = checkout.split('-');

    // Format the date as "day / month / year"
    formattedCheckinDate = `${month} / ${day} / ${year}`;
    formattedCheckoutDate = `${month1} / ${day1} / ${year1}`;

    // Display in the booking-summary-details section
    document.querySelector('.checkin-date').textContent = formattedCheckinDate;
    document.querySelector('.checkout-date').textContent = formattedCheckoutDate;
}

// Check if price exists and format it accordingly
if (price) {
    const formattedPrice = parseFloat(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
    });

    // Update the price in the booking total section
    document.querySelector('.booking-total strong').textContent = formattedPrice;

    // Update the label with the pay-now price
    const payNowLabel = document.querySelector('label[for="prepayment"] strong');
    if (payNowLabel) {
        payNowLabel.textContent = `Pay now: ${formattedPrice}`;
    }
}

// Update the room_type in the booking total section, if provided
if (room_type) {
    document.querySelector('.room_type_name').textContent = room_type;
}
if(room_count){
    document.querySelector('.room_count').textContent = room_count;
}
// Update the Adults and Children in the booking total section
if (adults) {
    document.querySelector('.adults').textContent = `${adults} Adults, ${childs} Children`;
}

// Get current date and time, plus one hour for the penalty time
const currentTime = new Date();
currentTime.setHours(currentTime.getHours() + 1);

// Format the date and time (e.g., MM/DD/YYYY at HH:MM)
const formattedTime = currentTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

// Update the cancellation text with the dynamic values
if (price && checkin) {
    document.querySelector('.cancellation-text').textContent = `From ${formattedCheckinDate} at ${formattedTime}: the penalty for cancellation will be THB ${price}`;
}
