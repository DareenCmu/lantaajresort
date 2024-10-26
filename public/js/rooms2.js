// Garden view
let rightSlideIndex3 = 1;
showRightSlides3(rightSlideIndex3);

function plusRightSlides3(n3) {
    showRightSlides3(rightSlideIndex3 += n3);
    console.log("Right side");
}

function currentRightSlide3(n3) {
    showRightSlides3(rightSlideIndex3 = n3);
    console.log("Left side");
}

function showRightSlides3(n3) {
    let i3;
    let slides3 = document.getElementsByClassName("rightSlide3");
    if (n3 > slides3.length) {rightSlideIndex3 = 1}
    if (n3 < 1) {rightSlideIndex3 = slides3.length}
    
    // Hide all slides
    for (i3 = 0; i3 < slides3.length; i3++) {
        slides3[i3].style.display = "none";  
    }
    
    // Show the current slide
    slides3[rightSlideIndex3-1].style.display = "block";  
    
}
