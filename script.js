// This is the updated JavaScript for your website (script.js)

const form = document.getElementById('booking-form');
const courseSelect = document.getElementById('course-select');
const formMessage = document.getElementById('form-message');
const scriptURL = "https://script.google.com/macros/s/AKfycbyAuZa3oc4GwUqgqH9Hx0sejVK8aCYdmXgIXv3LpM7mjX8AD2ADdE3cgLwf1LOqR8zoUw/exec"; // PASTE YOUR GOOGLE SCRIPT URL HERE

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the page from reloading
    const submitButton = form.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Saving...';
    formMessage.style.display = 'block';

    // 1. Send data to Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            console.log('Success! Data saved to sheet.', response);
            
            // 2. Calculate the 40% enrollment fee
            const selectedOption = courseSelect.options[courseSelect.selectedIndex];
            const courseName = selectedOption.value;
            const fullFee = parseInt(selectedOption.getAttribute('data-fee'));
            const enrollmentFee = fullFee * 0.40;

            // 3. Redirect to the payment page with course and fee info
            // Example: payment.html?course=Tailoring&fee=800
            window.location.href = `payment.html?course=${courseName}&fee=${enrollmentFee}`;

        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Oops! Something went wrong. Please try again.');
            submitButton.disabled = false;
            submitButton.textContent = 'Save My Spot & Proceed to Pay';
            formMessage.style.display = 'none';
        });
});
// --- Testimonial Slider Logic ---

// This function runs when the whole page is loaded
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        
        // Show the first slide initially
        slides[currentSlideIndex].classList.add('active');

        function showNextSlide() {
            // Hide the current slide
            slides[currentSlideIndex].classList.remove('active');
            
            // Move to the next slide index
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            
            // Show the new slide
            slides[currentSlideIndex].classList.add('active');
        }
        
        // Change slide every 5 seconds (5000 milliseconds)
        setInterval(showNextSlide, 5000);
    }
});
