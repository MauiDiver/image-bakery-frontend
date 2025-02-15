document.addEventListener("DOMContentLoaded", function () {
    let selectedReferenceImage = "";

    // Handle artist selection buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Ensure dataset contains the reference image URL
            selectedReferenceImage = this.dataset.image;
        });
    });

    // Generate Image Button Click
    document.getElementById("generate-button").addEventListener("click", async () => {
        if (!selectedReferenceImage) {
            alert("Please select an artist or collection first!");
            return;
        }

        document.getElementById("result").style.display = "none";
        document.getElementById("spinner").style.display = "block";

        console.log("Generating with:", selectedReferenceImage);

        try {
            const response = await fetch("https://ainft-backend.onrender.com/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: document.getElementById("character").value + " in a " + 
                            document.getElementById("setting").value + " with a " + 
                            document.getElementById("pattern").value + " pattern, feeling " + 
                            document.getElementById("mood").value,
                    reference_image_url: selectedReferenceImage,
                    style_strength: 0.5,
                    chaos: 0.5
                }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            if (data.image_url) {
                document.getElementById("generated-image").src = data.image_url;
                document.getElementById("rarity-score").textContent = `Rarity Score: ${data.rarity}`;
                document.getElementById("ai-analysis").textContent = data.description;
                document.getElementById("result").style.display = "block";
            } else {
                throw new Error("No image URL returned from backend.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to generate image.");
        } finally {
            document.getElementById("spinner").style.display = "none";
        }
    });

    // Load Avatars from Public Folder
    function loadAvatars() {
        const avatarContainer = document.getElementById("avatar-selection");
        const avatarFilenames = ["artist1_avatar.png", "artist2_avatar.png", "artist3_avatar.png", "artist4_avatar.png"];

        avatarFilenames.forEach(filename => {
            let img = document.createElement("img");
            img.src = `/avatars/${filename}`;
            img.classList.add("avatar");
            img.dataset.image = `/avatars/${filename}`;
            img.addEventListener("click", function () {
                document.querySelectorAll('.avatar').forEach(avatar => avatar.classList.remove('selected'));
                img.classList.add('selected');
                selectedReferenceImage = img.dataset.image;
                console.log("Selected reference image:", selectedReferenceImage);
            });

            avatarContainer.appendChild(img);
        });
    }

    loadAvatars();
});
