// 222222222222222222222222222222222222222222222222222222222222222222222222222
let rightSlideIndex4 = 1;
showRightSlides4(rightSlideIndex4);

function plusRightSlides4(n4) {
    showRightSlides4(rightSlideIndex4 += n4);
    console.log("Right side");
}

function currentRightSlide4(n4) {
    showRightSlides4(rightSlideIndex4 = n4);
    console.log("Left side");
}

function showRightSlides4(n4) {
    let i4;
    let slides4 = document.getElementsByClassName("rightSlide");
    if (n4 > slides4.length) {rightSlideIndex4 = 1}
    if (n4 < 1) {rightSlideIndex4 = slides4.length}
    
    // Hide all slides
    for (i4 = 0; i4 < slides4.length; i4++) {
        slides4[i4].style.display = "none";  
    }
    
    // Show the current slide
    slides4[rightSlideIndex4-1].style.display = "block";  
    
}
