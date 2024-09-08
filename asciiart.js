document.getElementById("fileInput").addEventListener("change", handleFile);

const asciiArtContainer = document.getElementById("ascii-art");

// Liste de caractères pour simuler les niveaux de gris en ASCII (inversée)
const asciiCharacters = " .'`^\",:;Il!i<>~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZwmqpdbkhao%#MW&8B@$";

function handleFile(event) {
    const file = event.target.files[0];
    if (!file || !file.type.match("image/gif")) {
        alert("Veuillez sélectionner un fichier GIF.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const gifArrayBuffer = e.target.result;
        const gifDecoder = new GifReader(new Uint8Array(gifArrayBuffer));

        const frames = [];

        // Décoder chaque frame du GIF
        for (let i = 0; i < gifDecoder.numFrames(); i++) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d", { willReadFrequently: true });
            canvas.width = gifDecoder.width;
            canvas.height = gifDecoder.height;

            // Créer un tableau pour les pixels
            const imageData = context.createImageData(gifDecoder.width, gifDecoder.height);
            gifDecoder.decodeAndBlitFrameRGBA(i, imageData.data);
            context.putImageData(imageData, 0, 0);

            // Convertir cette frame en ASCII avec couleurs
            const asciiFrame = convertImageToAsciiWithColor(imageData);
            frames.push(asciiFrame);
        }

        // Lancer l'animation ASCII
        startAsciiAnimation(frames, gifDecoder);
    };
    reader.readAsArrayBuffer(file);
}

function convertImageToAsciiWithColor(imageData) {
    const { width, height, data } = imageData;
    let asciiImage = '';

    const pixelStepX = 10; // Augmenter le nombre de pixels à sauter horizontalement
    const pixelStepY = 10; // Augmenter le nombre de pixels à sauter verticalement

    for (let y = 0; y < height; y += pixelStepY) {
        for (let x = 0; x < width; x += pixelStepX) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const brightness = (r + g + b) / 3;

            // Calcul de l'index ASCII inversé (pixels sombres -> caractères foncés)
            const asciiIndex = Math.floor((brightness / 255) * (asciiCharacters.length - 1));
            const asciiChar = asciiCharacters[asciiIndex];

            // Ajouter un <span> avec une couleur RGB correspondant au pixel original
            asciiImage += `<span style="color: rgb(${r},${g},${b})">${asciiChar}</span>`;
        }
        asciiImage += "<br>"; // Utiliser un saut de ligne après chaque ligne d'ASCII
    }

    return asciiImage;
}

function startAsciiAnimation(frames, gifDecoder) {
    let currentFrame = 0;

    function renderFrame() {
        // Afficher la frame ASCII actuelle
        asciiArtContainer.innerHTML = frames[currentFrame];  // Utilisation de innerHTML pour gérer les <span> avec couleurs

        // Calculer la durée d'affichage de la frame actuelle en ms
        const delay = gifDecoder.frameInfo(currentFrame).delay * 10; // Le delay est en centièmes de seconde

        // Passer à la frame suivante, ou revenir à la première
        currentFrame = (currentFrame + 1) % frames.length;

        // Lancer la prochaine frame
        setTimeout(renderFrame, delay);
    }

    // Démarrer l'animation
    renderFrame();
}
