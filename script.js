document.addEventListener("DOMContentLoaded", function () {
    let selectedReferenceImage = "";

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.getElementById("generate-button").addEventListener("click", async () => {
        if (!selectedReferenceImage) {
            alert("Please select an artist or collection first!");
            return;
        }

        document.getElementById("result").style.display = "none";
        document.getElementById("spinner").style.display = "block";

        console.log("Generating with:", selectedReferenceImage);

        try {
            const response = await fetch("https://your-api-endpoint.com/generate", {
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
