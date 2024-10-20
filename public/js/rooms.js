// 222222222222222222222222222222222222222222222222222222222222222222222222222
let rightSlideIndex2 = 1;
showRightSlides2(rightSlideIndex2);

function plusRightSlides2(n2) {
    showRightSlides2(rightSlideIndex2 += n2);
}

function currentRightSlide2(n2) {
    showRightSlides2(rightSlideIndex2 = n2);
}

function showRightSlides2(n2) {
    let i2;
    let slides2 = document.getElementsByClassName("rightSlide2");
    if (n2 > slides2.length) {rightSlideIndex2 = 1}
    if (n2 < 1) {rightSlideIndex2 = slides2.length}
    
    // Hide all slides
    for (i2 = 0; i2 < slides2.length; i2++) {
        slides2[i2].style.display = "none";  
    }
    
    // Show the current slide
    slides2[rightSlideIndex2-1].style.display = "block";  
    
}
