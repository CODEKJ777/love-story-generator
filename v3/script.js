document.getElementById("loveForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;
    let memory = document.getElementById("memories").value;

    let storyOutput = document.getElementById("storyOutput");
    storyOutput.innerHTML = "✨ Generating your love story... 💕";
    storyOutput.classList.remove("hidden");

    let prompt = `Write a romantic love story about ${name1} and ${name2}. 
    They share this special memory: "${memory}". 
    Make it poetic, heartfelt, and magical.`;

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key= API ID`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        let data = await response.json();
        
        // Check if response contains generated text
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let story = data.candidates[0].content.parts[0].text;
            storyOutput.innerText = story;
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error("Error:", error);
        storyOutput.innerText = "❌ Failed to generate story. Try again later.";
    }
});
      // 🎵 Music Player Toggle Button
document.getElementById("musicToggle").addEventListener("click", function() {
    let bgMusic = document.getElementById("bgMusic");
    let songName = document.getElementById("songName");

    if (bgMusic.paused) {
        bgMusic.play();
        this.innerHTML = "🔇"; // Change icon to mute
        songName.style.display = "block"; // Show song name
    } else {
        bgMusic.pause();
        this.innerHTML = "🎵"; // Change icon back to play
        songName.style.display = "none"; // Hide song name
    }
});

// Ensure song name is hidden when page loads
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("songName").style.display = "none";
});

