document.getElementById("fileInput").addEventListener("change", handleFile);

const asciiArtContainer = document.getElementById("ascii-art");

// Liste de caractères pour simuler les niveaux de gris en ASCII
const asciiCharacters = "@#%&8MW$B%oahkbdpqwmZO0QLCJYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

function handleFile(event) {
    const file = event.target.files[0];
    if (!file || !file.type.match("image/gif")) {
        alert("Veuillez sélectionner un fichier GIF.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const gif = new Image();
        gif.src = e.target.result;

        gif.onload = function() {
            convertGifToAscii(gif);
        };
    };
    reader.readAsDataURL(file);
}

function convertGifToAscii(gif) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = gif.width;
    canvas.height = gif.height;

    // Extraire les frames du GIF (simple simulation pour la démo)
    const frames = [];
    const totalFrames = 10; // Pour simplifier l'exemple

    for (let i = 0; i < totalFrames; i++) {
        context.drawImage(gif, 0, 0, gif.width, gif.height);
        const imageData = context.getImageData(0, 0, gif.width, gif.height);
        const asciiFrame = convertImageToAscii(imageData);
        frames.push(asciiFrame);
    }

    startAsciiAnimation(frames);
}

function convertImageToAscii(imageData) {
    const { width, height, data } = imageData;
    let asciiImage = '';

    for (let y = 0; y < height; y += 6) {
        for (let x = 0; x < width; x += 3) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const brightness = (r + g + b) / 3;

            const asciiIndex = Math.floor((brightness / 255) * (asciiCharacters.length - 1));
            asciiImage += asciiCharacters[asciiIndex];
        }
        asciiImage += "\n";
    }

    return asciiImage;
}

function startAsciiAnimation(frames) {
    let currentFrame = 0;

    function renderFrame() {
        asciiArtContainer.textContent = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
        setTimeout(renderFrame, 100);
    }

    renderFrame();
}
