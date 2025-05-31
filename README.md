# Portfolio

> A modern, responsive portfolio website built with React and Vite, featuring clean design and smooth animations to showcase projects and skills.

[![Live Demo](https://github.com/user-attachments/assets/9b7f5c69-eab3-45ee-b355-730fefbd551c)](https://rifandiysf.vercel.app/)


## Features

- **Modern Design** - Clean, minimalist interface with smooth animations
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices  
- **Fast Performance** - Built with Vite for lightning-fast development and builds
- **Interactive Components** - Engaging user interface with React components
- **Dynamic Content** - Showcases projects, skills, and experience
- **SEO Optimized** - Meta tags and structured data for better visibility
- **Developer Experience** - Hot Module Replacement (HMR) for instant updates

## Tech Stack

### Frontend
- **Framework:** [React 19.0.0](https://reactjs.org/) - JavaScript library for building user interfaces
- **Build Tool:** [Vite 6.3.0](https://vitejs.dev/) - Next generation frontend tooling
- **Styling:** [Tailwind CSS 3.4.17](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons:** [Lucide React 0.501.0](https://lucide.dev/) - Beautiful & consistent icons

### **Show your favorite Spotify playlist (or your own)** ![Spotify](https://img.shields.io/badge/Spotify-06cc1a?logo=spotify&logoColor=white)
1. Choose your Spotify playlist
2. Access the share options
3. Select 'copy embed code'
```
<iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/PLAYLIST_ID" className='w-full h-[152px]' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
```
4. Insert the embed code on SpotifyBtn.jsx

That's it!

### Development Tools
- **Linting:** [ESLint 9.22.0](https://eslint.org/) with React plugins
- **Type Checking:** TypeScript definitions for React
- **Package Manager:** npm/yarn/pnpm
- **Version Control:** Git & GitHub

## Quick Start

### Prerequisites
- Node.js 18+ installed on your machine
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rifandiysf/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Lint code with ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Project Structure

```
portfolio-2/
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Footer.jsx
│   │   ├── InfiniteScroll.jsx
│   │   └── SpotifyBtn.jsx
│   ├── pages/             # Page components
│   │   ├── Contact.jsx
│   │   ├── Introduce.jsx
│   │   └── Project.jsx
│   ├── utils/             # Utility components
│   │   └── ShinyText.jsx
│   ├── css/               # Stylesheets
│   │   ├── App.css
│   │   └── output.css
│   ├── assets/            # Local assets
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <p>Made with React and Vite</p>
  <p>© 2025 Rifandi Yusuf. All rights reserved.</p>
</div>
