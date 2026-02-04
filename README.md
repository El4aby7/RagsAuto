# Rags Auto

Luxury automotive gallery website.

## Features

- **Branding**: Rags Auto custom branding.
- **Dark Mode**: Fully supported dark theme with toggle.
- **Localization**: English and Arabic support (RTL layout) with toggle.
- **Currency**: Toggle between Egyptian Pounds (L.E) and US Dollars (USD).
- **Responsive**: Fully responsive design for mobile, tablet, and desktop.

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Content Management

All website content is managed in `src/data/content.json`. This makes it easy to update text and images without touching the code.

### Updating Text
- **English**: Edit the `en` object in `src/data/content.json`.
- **Arabic**: Edit the `ar` object in `src/data/content.json`.
- **Structure**: The JSON is organized by page and section. For example, `hero.title` changes the main title on the homepage.

### Updating Images
1.  Add your image files to the `public/images/` folder.
2.  In `src/data/content.json`, update the `image` field to point to your new file.
    - Example: `"image": "/images/new-car.jpg"`

### Updating Inventory (Cars)
- The list of cars is in the `cars` array in `src/data/content.json`.
- To add a car, duplicate an existing object and update the fields:
    ```json
    {
      "id": 7,
      "make": "New Make",
      "model": "New Model",
      "year": 2024,
      "mileage": "0 mi",
      "price": 30000000,
      "image": "/images/new-car.jpg",
      "tag": "justArrived"
    }
    ```
- **Price**: Enter the price in **EGP** (Egyptian Pounds). The website handles conversion to USD automatically based on the exchange rate setting.

### Settings
- **Exchange Rate**: Update `settings.exchangeRate` in `content.json` to adjust the EGP to USD conversion.

## Deployment

The project is configured for GitHub Pages (relative paths enabled).

1.  Build the project:
    ```bash
    npm run build
    ```
2.  The output will be in the `dist` folder.
3.  Deploy the `dist` folder to your hosting provider or GitHub Pages branch.
