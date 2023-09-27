// script.js
document.addEventListener("DOMContentLoaded", () => {
    const plagiarismForm = document.getElementById("plagiarismForm");
    const textToCheck = document.getElementById("textToCheck");
    const percentageValue = document.getElementById("percentageValue");
    const plagiarismMessage = document.getElementById("plagiarismMessage");

    plagiarismForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = textToCheck.value;

        // Send the text to the backend for plagiarism checking
        const response = await fetch("/check-plagiarism", {
            method: "POST",
            body: JSON.stringify({ text }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            percentageValue.textContent = `${data.percentage}%`;
            plagiarismMessage.textContent = data.message;
        } else {
            console.error("Error checking for plagiarism");
        }
    });
});
