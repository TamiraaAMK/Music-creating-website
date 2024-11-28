// Wait for the DOM to fully load before executing the code
document.addEventListener("DOMContentLoaded", function () {

    // Form Validation: Check if all fields are filled before submitting
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            // Get the values of the form inputs
            const title = document.getElementById("title").value;
            const artist = document.getElementById("artist").value;
            const genre = document.getElementById("genre").value;
            const releaseYear = document.getElementById("releaseYear").value;

            // Simple validation: check if any field is empty
            if (!title || !artist || !genre || !releaseYear) {
                event.preventDefault(); // Prevent form from being submitted

                // Clear existing error messages
                document.querySelectorAll(".error").forEach((el) => el.remove());

                // Display error messages next to empty fields
                if (!title) showError("title", "Title is required.");
                if (!artist) showError("artist", "Artist is required.");
                if (!genre) showError("genre", "Genre is required.");
                if (!releaseYear) showError("releaseYear", "Release year is required.");
            }
        });

        // Helper function to show error messages
        function showError(fieldId, message) {
            const inputField = document.getElementById(fieldId);
            const error = document.createElement("span");
            error.textContent = message;
            error.classList.add("error");
            error.style.color = "red";
            error.style.fontSize = "0.9em";
            inputField.parentElement.appendChild(error);
        }
    }

    // Display success message after form submission
    const successMessage = document.getElementById("success-message");
    if (successMessage) {
        setTimeout(() => {
            successMessage.style.transition = "opacity 0.5s";
            successMessage.style.opacity = "0";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 500);
        }, 3000);
    }

    // AJAX: Handle review form submission without reloading the page
    const reviewForm = document.getElementById("review-form");
    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent normal submission

            const formData = new FormData(this);
            const submitButton = reviewForm.querySelector("button");
            submitButton.disabled = true; // Disable the button during submission

            fetch(`/music/${this.dataset.musicId}/review`, {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Failed to submit review");
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        alert("Review added successfully!");
                        location.reload();
                    } else {
                        alert(data.message || "Failed to add review. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting review:", error);
                    alert("An error occurred while submitting the review.");
                })
                .finally(() => {
                    submitButton.disabled = false; // Re-enable the button
                });
        });
    }

});
