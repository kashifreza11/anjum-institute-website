// This is the updated JavaScript for your website (script.js)

const form = document.getElementById('booking-form');
const courseSelect = document.getElementById('course-select');
const formMessage = document.getElementById('form-message');
const scriptURL = "https://script.google.com/macros/s/AKfycbyKqUxUb4_P8oayBZiOO3sBJMPfTTf8vbv2FDLbMfASPNUnBFvwzfSvLNcGJHJNxHrwdA/exec"; // PASTE YOUR GOOGLE SCRIPT URL HERE

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