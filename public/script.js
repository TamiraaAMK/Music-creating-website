// Wait for the DOM to fully load before executing the code
document.addEventListener("DOMContentLoaded", function () {

    // Form Validation: Check if all fields are filled before submitting
    const form = document.querySelector("form");  // Get the form element
    form.addEventListener("submit", function (event) {
        // Get the values of the form inputs
        const title = document.getElementById("title").value;
        const artist = document.getElementById("artist").value;
        const genre = document.getElementById("genre").value;
        const releaseYear = document.getElementById("releaseYear").value;

        // Simple validation: check if any field is empty
        if (!title || !artist || !genre || !releaseYear) {
            event.preventDefault(); // Prevent form from being submitted
            alert("Please fill out all fields.");  // Show an alert if any field is empty
        }
    });

    // Display success message after form submission
    const successMessage = document.getElementById("success-message");
    if (successMessage) {
        // Hide the success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = "none";  // Hide success message
        }, 3000);
    }

    // AJAX: Handle review form submission without reloading the page
    const reviewForm = document.getElementById("review-form");  // Get the review form
    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            event.preventDefault();  // Prevent the form from submitting normally

            // Create a FormData object from the form inputs
            const formData = new FormData(this);

            // Send the form data to the server via AJAX (using fetch)
            fetch(`/music/${this.dataset.musicId}/review`, {
                method: "POST",  // HTTP method to use
                body: formData,  // The form data to send
            })
                .then((response) => response.json())  // Parse the JSON response from the server
                .then((data) => {
                    if (data.success) {
                        alert("Review added successfully!");  // Show success message
                        location.reload();  // Reload the page to show the new review
                    }
                })
                .catch((error) => {
                    console.error("Error submitting review:", error);  // Log any errors
                });
        });
    }

});
