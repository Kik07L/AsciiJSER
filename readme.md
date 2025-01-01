# ASCII Art GIF Converter

This project converts GIF images into ASCII art with colors and displays them as an animation on a webpage.

## How to Implement

Follow these steps to quickly integrate the ASCII art converter into your website:

1. **Clone the Repository**

   Clone this repository to your local machine using the following command:
   ```sh
   git clone https://github.com/yourusername/AsciiJSER.git
   ```

2. **Include Required Files**

   Copy the `asciiart.js` file to your project directory. Then, include it in your HTML file:

   ```html
   <script src="path/to/asciiart.js"></script>
   ```

3. **Add HTML Elements**

   Add the following HTML elements to your webpage where you want the file input and ASCII art to appear:

   ```html
   <input type="file" id="fileInput" accept="image/gif">
   <div id="ascii-art"></div>
   ```

4. **Install Dependencies**

   Ensure you have the `GifReader` library included in your project. You can install it via npm:

   ```sh
   npm install omggif
   ```

   Then, include it in your HTML file:

   ```html
   <script src="node_modules/omggif/omggif.js"></script>
   ```

5. **Run Your Project**

   Open your HTML file in a web browser. Select a GIF file using the file input, and the ASCII art animation will be displayed in the `#ascii-art` div.

## Usage

- Select a GIF file using the file input.
- The GIF will be converted to ASCII art with colors and displayed as an animation.

## License

This project is licensed under the MIT License.