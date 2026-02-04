# Rags Auto

Luxury automotive gallery website.

## Features

- **Branding**: Rags Auto custom branding.
- **Dark Mode**: Fully supported dark theme with toggle.
- **Localization**: English and Arabic support (RTL layout) with toggle.
- **Currency**: Toggle between Egyptian Pounds (L.E) and US Dollars (USD).
- **Architecture**: No-Build architecture (HTML5 + ES Modules + CDN React/Tailwind).
- **Responsive**: Fully responsive design for mobile, tablet, and desktop.

## Usage

This project uses a "No-Build" architecture. You do **not** need `npm`, `node`, or any build tools.

1.  **Clone** the repository.
2.  **Open** the folder.
3.  **Run**: You need a simple local server to serve the ES modules (browsers block file:// imports for modules).
    *   Python: `python3 -m http.server`
    *   VS Code: Use "Live Server" extension.
4.  Navigate to `localhost:8000` (or whatever port your server uses).

## Content Management

All website content is managed in `content.js`. This makes it easy to update text and images without digging into the application logic.

### Updating Text
1.  Open `content.js`.
2.  Edit the `CONTENT` object.
    - **English**: Update the `en` section.
    - **Arabic**: Update the `ar` section.
3.  Save the file and refresh the page.

### Updating Images
1.  Add your image files to the `images/` folder.
2.  In `content.js`, update the `image` path to point to your new file.
    - Example: `"image": "images/new-car.jpg"`

### Updating Inventory (Cars)
- The list of cars is in the `cars` array in `content.js`.
- To add a car, duplicate an existing object and update the fields:
    ```javascript
    {
      id: 7,
      make: "New Make",
      model: "New Model",
      year: 2024,
      mileage: "0 mi",
      price: 30000000,
      image: "images/new-car.jpg",
      tag: "justArrived"
    }
    ```
- **Price**: Enter the price in **EGP** (Egyptian Pounds). The website handles conversion to USD automatically based on the exchange rate setting.

### Settings
- **Exchange Rate**: Update `settings.exchangeRate` in `content.js` to adjust the EGP to USD conversion.

## Deployment

Since there is no build step, deployment is simple:

1.  Upload all files (`index.html`, `app.js`, `content.js`, `images/`) to your web server or GitHub Pages.
2.  Ensure your server serves `.js` files with the correct MIME type (`application/javascript`).
