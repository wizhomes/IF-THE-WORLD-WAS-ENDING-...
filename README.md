# Stephanie Love Experience

A romantic, premium static website built with HTML, CSS, and Vanilla JavaScript for Stephanie.

## Project structure

- index.html — page structure and content
- style.css — luxury romantic styling, glassmorphism, animation, and responsive layout
- script.js — music controls, timed captions, floating hearts, and final surprise reveal
- assets/song.mp3 — upload your song here
- assets/images/ — add personal photos and memories here
- assets/fonts/ — add custom fonts here if you want

## How to run it in GitHub Codespaces

1. Open the project folder in Codespaces.
2. Start a simple static server from the project root:
   - python3 -m http.server 8000
3. Open the preview URL or visit http://localhost:8000.

## Where to put the song file

Upload the audio file to:

- assets/song.mp3

The page already loads the file from that path.

## How to edit Stephanie's name

Open index.html and replace every instance of "Stephanie ❤️" with the name you want.

## How to add pictures

Open index.html and replace the sample memory card content with your own image or photo markup. For example:

```html
<img src="assets/images/my-photo.jpg" alt="Stephanie and me" />
```

## How to change the WhatsApp number

In script.js, update the link target:

```js
whatsappButton.href = `https://wa.me/233509470007?text=${encoded}`;
```

Replace 233509470007 with the number you want to use.

## Deployment on GitHub Pages

1. Push the project to GitHub.
2. Open the repository settings.
3. Under Pages, choose the main branch and the root folder.
4. Save the settings and wait for the site to publish.
