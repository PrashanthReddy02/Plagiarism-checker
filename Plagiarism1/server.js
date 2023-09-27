const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Define a set of words for users to check against
const userWords = [
    "example",
    "words",
    "for",
    "plagiarism",
    "checking",
    "in",
    "local",
    "server",
];

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route to provide user words
app.get("/user-words", (req, res) => {
    res.json(userWords);
});

// Handle POST request for plagiarism check
app.post("/check-plagiarism", (req, res) => {
    const text = req.body.text;

    // Split the input text into words (you can implement a more robust word tokenizer)
    const inputWords = text.split(/\s+/);

    // Dummy plagiarism detection
    let plagiarismCount = 0;

    for (const inputWord of inputWords) {
        if (userWords.includes(inputWord.toLowerCase())) {
            plagiarismCount++;
        }
    }

    const totalWords = userWords.length;
    const plagiarismPercentage = (plagiarismCount / totalWords) * 100;

    const response = {
        percentage: plagiarismPercentage.toFixed(2),
        message:
            plagiarismPercentage > 30
                ? "Plagiarized content detected!"
                : "No plagiarism detected.",
    };

    res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
