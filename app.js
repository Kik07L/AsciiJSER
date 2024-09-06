document.getElementById('gifInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/gif') {
        const reader = new FileReader();

        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const gif = new GifReader(new Uint8Array(arrayBuffer));  // Utilisation correcte de GifReader

            const frames = [];
            for (let i = 0; i < gif.numFrames(); i++) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // Configure la taille du canvas pour correspondre à la frame du GIF
                canvas.width = gif.width;
                canvas.height = gif.height;

                const imageData = context.createImageData(gif.width, gif.height);
                gif.decodeAndBlitFrameRGBA(i, imageData.data);
                context.putImageData(imageData, 0, 0);

                frames.push({
                    canvas: canvas,
                    delay: gif.frameInfo(i).delay
                });
            }

            animateGIF(frames);
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Veuillez télécharger un fichier GIF.');
    }
}

function animateGIF(frames) {
    let frameIndex = 0;
    const asciiContainer = document.getElementById('asciiContainer');

    function displayFrame() {
        const frame = frames[frameIndex];
        const image = new Image();
        image.src = frame.canvas.toDataURL();

        asciifyImage(image, {
            fit: 'box',
            width: 80,  // Ajuste cette valeur pour la largeur de l'ASCII art
            height: 40  // Ajuste cette valeur pour la hauteur de l'ASCII art
        }, function(asciiArt) {
            asciiContainer.innerHTML = asciiArt;
            frameIndex = (frameIndex + 1) % frames.length;
            setTimeout(displayFrame, frame.delay * 10);  // Ajuste la vitesse d'animation
        });
    }

    displayFrame();
}
