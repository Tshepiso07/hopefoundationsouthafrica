# hopefoundationsouthafrica

# Hope Foundation South Africa

A responsive, static website concept for a fictional community charity in Gqeberha, South Africa. This academic demonstration presents sample programmes, contact details, and forms; it is not a real organisation and does not store form submissions.

## Pages
| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Introduction, focus areas, call to action |
| About | `pages/about.html` | Mission, vision and values |
| Programmes | `pages/services.html` | Programme descriptions with search |
| Get involved | `pages/enquiry.html` | Demonstration involvement form |
| Contact | `pages/contact.html` | Contact form and illustrative location links |

## Project structure
```text
├── index.html
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── enquiry.html
│   └── contact.html
├── assets/
│   ├── css/style.css
│   └── js/script.js
├── sitemap.xml
├── robots.txt
├── .gitattributes
└── README.md
.


## Features
- Responsive layout for mobile, tablet and desktop
- Mobile navigation menu toggle
- Client-side programme search
- Client-side form validation on the enquiry and contact forms
- Forms prepare an email in the visitor's default mail app (no backend)
- Skip-to-content link and semantic HTML landmarks
- Skip-to-content link and semantic HTML landmarks
- Meta tags, sitemap and robots file for SEO

## Technologies used
- HTML5, CSS3, JavaScript (vanilla, no frameworks)
- Google Fonts (DM Sans, Manrope)
- Unsplash for demonstration photography
- GitHub Pages for hosting

## Design decisions
- Relative links throughout so the site works from a project subdirectory.
- A single shared stylesheet and script for consistency.
- Warm, people-centred typography and layout to suit a community charity.
## Accessibility and SEO
- Skip link, `aria-label` and `aria-expanded` on navigation controls
- Descriptive `alt` text on images and `lang="en-ZA"` on the document
- Page titles, meta descriptions and keywords on each page
- `sitemap.xml` and `robots.txt` included
Shared styles and behaviour are in `assets/css/style.css` and `assets/js/script.js`.

## Preview locally:
Open `index.html` in a browser, or serve the folder with a static server:

Open `index.html` in a browser, or serve this folder using a local static web server. The site uses relative asset and page links, so it can also be hosted from a project subdirectory such as GitHub Pages.

Form submission validates in the browser and prepares an email using the visitor's default email application. No backend is configured; do not enter real personal information into this demonstration.

## Deployment:

The sitemap and robots file currently target the GitHub Pages project URL `https://tshepiso07.github.io/hopefoundationsouthafrica/`. Update those URLs if the repository name, account, or hosting domain changes.

## Version :
Work was committed incrementally using short, descriptive messages (for example `feat:`, `style:`, `docs:`, `fix:`).

## Limitations
No backend is configured. Do not enter real personal information into the demonstration forms.




