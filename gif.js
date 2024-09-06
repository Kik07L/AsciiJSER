document.getElementById('gifInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/gif') {
        const gifReader = new GIF();
        const reader = new FileReader();

        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            gifReader.load(arrayBuffer);

            gifReader.on('finished', function(frames) {
                animateGIF(frames);
            });
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
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = frame.dims.width;
        canvas.height = frame.dims.height;
        context.putImageData(frame.patch, 0, 0);

        const image = new Image();
        image.src = canvas.toDataURL();

        asciifyImage(image, {
            fit: 'box',
            width: 80, // Ajustez cette valeur pour contrôler la taille de l'ASCII art
            height: 40
        }, function(asciiArt) {
            asciiContainer.innerHTML = asciiArt;
            frameIndex = (frameIndex + 1) % frames.length;
            setTimeout(displayFrame, frame.delay * 10); // Ajuste la vitesse d'animation
        });
    }

    displayFrame();
}
