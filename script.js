'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});
// Select necessary elements
const openCameraButton = document.getElementById('openCamera');
const cameraStream = document.getElementById('cameraStream');
const captureButton = document.getElementById('captureImage');
const cameraCanvas = document.getElementById('cameraCanvas');
let stream;

// Open the camera feed when the button is clicked
openCameraButton.addEventListener('click', async () => {
  try {
    // Access the user's camera
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraStream.srcObject = stream;
    cameraStream.classList.remove('hidden');  // Show the video feed
    captureButton.classList.remove('hidden'); // Show the capture button
  } catch (error) {
    alert("Error accessing camera: " + error.message);
    console.error("Camera error:", error);
  }
});

// Capture the image from the video stream
captureButton.addEventListener('click', () => {
  if (cameraStream.srcObject) {
    // Match canvas size to the video stream
    cameraCanvas.width = cameraStream.videoWidth;
    cameraCanvas.height = cameraStream.videoHeight;
    const context = cameraCanvas.getContext('2d');

    // Draw the current video frame onto the canvas
    context.drawImage(cameraStream, 0, 0);

    // Display the captured image in the preview area
    const imagePreview = document.querySelector('.camera-section .image-preview');
    imagePreview.src = cameraCanvas.toDataURL('image/png');
    imagePreview.classList.remove('hidden');  // Show the captured image preview

    // Stop the video stream and hide video elements
    cameraStream.classList.add('hidden');    // Hide the video stream
    captureButton.classList.add('hidden');   // Hide the capture button
    stream.getTracks().forEach(track => track.stop()); // Stop the camera
  }
});
