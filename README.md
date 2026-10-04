# Shahin Alam — Product Designer Portfolio

> **"I don't start with Figma. I start with the problem."**

A conversational portfolio website for a product designer. Instead of telling clients "I'm a good designer," the site lets them **experience how I think**: it asks questions, diagnoses a real interface, and walks through case studies organised by the client's problem.

Everything lives in a single, dependency-free HTML file. There is no build step, no framework and no package install.

---

## Table of contents

- [Concept](#concept)
- [Features](#features)
- [Pages and routes](#pages-and-routes)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Customising the site](#customising-the-site)
- [Connecting the contact form](#connecting-the-contact-form)
- [Deployment](#deployment)
- [Design system](#design-system)
- [Accessibility](#accessibility)
- [Browser support](#browser-support)
- [Promo video](#promo-video)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## Concept

The whole site is a progressive conversation between a potential client and the designer:

1. Something is wrong with my product.
2. Can this designer understand my problem?
3. How does he think?
4. Can he actually solve it?
5. Can I trust him?
6. Who is behind the work?
7. How will we work together?
8. What happens next?
9. Let's start a conversation.

**Target audience:** startup founders, SaaS companies, small businesses, product teams and agencies looking for a product designer.

---

## Features

### Interactive experiences
- **Quick diagnosis:** visitors pick what's going wrong and are pointed to the most relevant case study.
- **Design diagnosis:** a fictional transfer screen with three numbered markers (Hierarchy, Cognitive load, Trust). An **Apply the fixes** button redesigns it live.
- **Case-study story:** a client/designer chat with Before, Insight, Exploration and Solution tabs, plus a draggable before/after slider.
- **4D method wheel:** a clickable Discover → Define → Design → Demonstrate cycle that loops back through Iterate.
- **Self-audit tool:** five yes/no questions that return a tailored result for the visitor's own product.
- **Conversational contact form:** progress bar, chip selections, inline validation and a chat-style confirmation.

### Page-level details
- Hero with floating UI fragments, pulsing diagnostic markers and two live cursors ("You" and "Shahin").
- Designer replies that show a typing indicator before the text appears.
- Detailed long-form case-study template with a sticky contents list, scroll-spy and a reading-progress bar.
- Filterable work page and expandable services.
- Dark mode that follows the visitor's system setting.
- Fully responsive layout, with a compact mobile drawer navigation.

---

## Pages and routes

The site uses **hash-based routing**, so it works on any static host with no server configuration.

| Route | Page |
|---|---|
| `#/` | Home (12-section conversation) |
| `#/work` | Work, filterable by type of problem |
| `#/case/1` | Case study 01 · Fintech / SaaS |
| `#/case/2` | Case study 02 · Web product |
| `#/case/3` | Case study 03 · Mobile app |
| `#/thinking` | Five design lenses, self-audit tool, notes |
| `#/about` | Background, beliefs, skills, who I work with |
| `#/services` | Five services with fit, deliverables and process |
| `#/contact` | Conversational project form |

Anchors such as `#diagnosis` or `#thinking` still scroll within the home page.

---

## Tech stack

| Layer | Choice |
|---|---|
| Markup / styling / logic | Plain **HTML, CSS and vanilla JavaScript** (no dependencies) |
| Routing | Hash router in ~20 lines of JS |
| Fonts | [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), [Manrope](https://fonts.google.com/specimen/Manrope) and [Caveat](https://fonts.google.com/specimen/Caveat), loaded from Google Fonts |
| Hosting | Any static host |

---

## Getting started

### Option 1: open the file

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
open index.html        # macOS
# start index.html     # Windows
# xdg-open index.html  # Linux
```

### Option 2: run a local server (recommended)

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

> The file is named `shahin-alam-portfolio.html` in the original export. Rename it to `index.html` so hosting platforms serve it by default.

---

## Project structure

```text
.
├── index.html            # The entire website (HTML + CSS + JS)
├── README.md             # You are here
├── LICENSE               # Add your license
└── assets/               # Optional
    ├── promo-8s.mp4
    ├── promo-15s.mp4
    └── promo-30s.mp4
```

Inside `index.html`, the code is organised in this order:

1. `<style>`: design tokens, then components, then page sections.
2. `<main>`: one `.page` block per route (`home`, `work`, `case`, `thinking`, `about`, `services`, `contact`).
3. `<script>`: interactions, case-study data, self-audit logic and the router.

---

## Customising the site

The site ships with **placeholder content**. Replace these before publishing:

| What | Where to change it |
|---|---|
| **Portrait** | Replace the silhouette `<svg>` inside `.portrait` (Home → About, and the About page) with an `<img>`. |
| **Case-study copy and visuals** | Edit the `CASES` object in the script, and the `.preview` mock-ups in the home page `#case1`, `#case2` and `#case3`. |
| **Proof counts** | The four `00` values in the Evidence section are placeholders. |
| **Findings, timelines, tools** | Dashed **Add** tags mark every place that needs real details. |
| **Email address** | Search for `hello@yourdomain.com`. |
| **Notes (Thinking page)** | Replace the four "Coming soon" titles with your real articles. |
| **Page title and favicon** | The `<title>` tag and the `titles` object in the script. |

> **Keep it honest.** The site is built around evidence. Only add measured results if you actually measured them, and never invent client metrics.

### Changing the colours

All colours are CSS variables at the top of the stylesheet:

```css
:root {
  --paper: #F5F5F2;   /* page background */
  --ink:   #101114;   /* text and dark panels */
  --lime:  #C6F34F;   /* main accent */
  --sun:   #FFD84A;   /* secondary accent */
}
```

Dark-mode values are defined in the `prefers-color-scheme: dark` block directly below.

---

## Connecting the contact form

The form is a **front-end demo**: it validates and shows a confirmation but **does not send anything yet**. Pick one:

**Formspree**

```html
<form class="form" action="https://formspree.io/f/your-id" method="POST" novalidate>
```

**Netlify Forms** (when hosted on Netlify)

```html
<form class="form" name="contact" method="POST" data-netlify="true" novalidate>
```

In either case, adapt the submit handler (search for `form.addEventListener('submit'`) so it calls `fetch()` with the form data and shows the confirmation only after a successful response.

---

## Deployment

Because it's a static file, deployment takes a few minutes.

### GitHub Pages

1. Rename the file to `index.html` and push to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

### Netlify

1. Drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repository.
2. No build command is needed. Set the publish directory to `.`.

### Vercel

```bash
npm i -g vercel
vercel
```

Accept the defaults. It's detected as a static site.

### Custom domain

Add your domain in your host's dashboard, then point a `CNAME` (or `A`) record at the provider.

---

## Design system

| Element | Direction |
|---|---|
| **Style** | Soft off-white surfaces, large rounded cards (28–50px), pill buttons with a circular arrow |
| **Colour** | Ink and paper, one lime accent, a touch of yellow |
| **Typography** | Large, tight Bricolage Grotesque headlines; Manrope for body and UI; Caveat sparingly for handwritten notes |
| **Signature devices** | Quote-mark questions, inline icon chips in headlines, designer reply bubbles, numbered diagnostic markers, live cursors |
| **Motion** | Short, purposeful transitions; typing indicator; sticky stacked case cards; honours `prefers-reduced-motion` |

---

## Accessibility

- Semantic landmarks and heading hierarchy.
- Keyboard support: radio groups use arrow keys; accordions and tabs are real buttons.
- Visible focus states.
- `aria-live` regions for the diagnosis result and process details.
- Respects `prefers-reduced-motion` (animations and typing delays are removed).
- Respects `prefers-color-scheme` for dark mode.

Suggested checks before launch: Lighthouse, axe DevTools, and a quick screen-reader pass.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The site uses `color-mix()`, CSS `clip-path`, `position: sticky` and `IntersectionObserver`.

---

## Promo video

Three short promo cuts (8, 15 and 30 seconds, 1920×1080, silent) were rendered from the same design system. Add music or voice-over in your video editor before posting. Place the files in `assets/` if you want to keep them in the repository.

---

## Roadmap

- [ ] Replace placeholder case studies with real projects
- [ ] Add real portrait and project screens
- [ ] Connect the contact form
- [ ] Publish the first articles on the Thinking page
- [ ] Add testimonials once real quotes are available
- [ ] Add Open Graph and Twitter card meta tags for link previews
- [ ] Add analytics (privacy-friendly, such as Plausible)

---

## License

Choose a license before publishing. For a personal portfolio, a common choice is:

- **Code:** MIT
- **Content, case studies and images:** All rights reserved © Shahin Alam

---

## Contact

**Shahin Alam**, Product Designer

- Portfolio: `https://your-portfolio-url`
- Email: `hello@yourdomain.com`
- LinkedIn: `https://linkedin.com/in/your-handle`

> *So... what are you building?*
