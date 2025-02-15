let selectedCategory = "artists"; 
let selectedReferenceImage = ""; 

const artistData = {
    artists: [
        { name: "Julian Kane", avatar: "artist1_avatar", reference: "artist1_reference" },
        { name: "Sienna Harper", avatar: "artist2_avatar", reference: "artist2_reference" },
        { name: "Elias Monroe", avatar: "artist3_avatar", reference: "artist3_reference" },
        { name: "Celeste Morgan", avatar: "artist4_avatar_v3", reference: "artist4_reference" }
    ],
    collections: [
        { name: "Neon Dreamscape", avatar: "artist5_avatar", reference: "artist5_reference" },
        { name: "Abstract Codex", avatar: "artist6_avatar", reference: "artist6_reference" }
    ]
};

function loadOptions(category) {
    const container = document.querySelector(".artist-selection");
    container.innerHTML = "";

    artistData[category].forEach(item => {
        const option = document.createElement("div");
        option.classList.add("artist-option");
        option.setAttribute("data-name", item.name);
        option.setAttribute("data-ref", `https://raw.githubusercontent.com/MauiDiver/public-assets/main/images/${category}/references/${item.reference}.png`);

        option.innerHTML = `
            <img src="https://raw.githubusercontent.com/MauiDiver/public-assets/main/images/${category}/avatars/${item.avatar}.png" class="artist-avatar" alt="${item.name}">
            <p class="artist-name">${item.name}</p>
        `;

        option.addEventListener("click", function () {
            document.getElementById("featured-avatar").src = this.querySelector(".artist-avatar").src;
            document.getElementById("selected-artist-name").textContent = this.getAttribute("data-name");
            selectedReferenceImage = this.getAttribute("data-ref");
        });

        container.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedCategory = this.getAttribute("data-category");
            loadOptions(selectedCategory);
        });
    });

    document.getElementById("generate-button").addEventListener("click", async () => {
        if (!selectedReferenceImage) {
            alert("Please select an artist or collection first!");
            return;
        }

        document.getElementById("spinner").style.display = "block";

        console.log("Generating with:", selectedReferenceImage); // Debugging
    });

    loadOptions(selectedCategory);
});
