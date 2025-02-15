document.addEventListener("DOMContentLoaded", function () {
    let selectedReferenceImage = "";

    // Attach event listeners to all artist selection buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Get selected artist from button data attribute
            let selectedArtist = this.getAttribute("data-artist");

            // Set the correct avatar URL from Netlify hosting
            selectedReferenceImage = `https://creative-donut-2f8907.netlify.app/avatars/${selectedArtist}_avatar.png`;

            console.log("Selected Reference Image:", selectedReferenceImage);

            // Update UI to show the selected avatar
            document.getElementById("selected-image").src = selectedReferenceImage;
            document.getElementById("selected-image").style.display = "block";
        });
    });

    // Handle "Bake Image" button click
    document.getElementById("generate-button").addEventListener("click", async () => {
        if (!selectedReferenceImage) {
            alert("Please select an artist or collection first!");
            return;
        }

        document.getElementById("result").style.display = "none";
        document.getElementById("spinner").style.display = "block";

        console.log("Generating with:", selectedReferenceImage);

        try {
            const response = await fetch("https://your-backend-url.com/generate", {  // ⬅️ Calls your backend API
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    referenceImage: selectedReferenceImage,
                    character: document.getElementById("character").value,
                    pattern: document.getElementById("pattern").value,
                    setting: document.getElementById("setting").value,
                    mood: document.getElementById("mood").value
                }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            // Update UI with generated image, rarity, and description
            document.getElementById("generated-image").src = data.imageUrl;
            document.getElementById("rarity-score").textContent = `Rarity Score: ${data.rarity}`;
            document.getElementById("ai-analysis").textContent = data.description;

            document.getElementById("spinner").style.display = "none";
            document.getElementById("result").style.display = "block";
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("spinner").style.display = "none";
            alert("Failed to generate image.");
        }
    });
});
