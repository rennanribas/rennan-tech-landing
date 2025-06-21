# Rennan Tech Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features smooth animations, a clean design, and showcases projects and skills in web development.

## ✨ Features

- **Modern Stack**: Built with React 19.1, TypeScript, and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Powered by Motion (Framer Motion) for engaging user interactions
- **Icon Library**: Comprehensive icon set using React Icons
- **Type Safety**: Full TypeScript support for better development experience
- **Fast Development**: Lightning-fast HMR with Vite
- **Code Quality**: ESLint configuration for consistent code standards

## 🚀 Tech Stack

- **Frontend Framework**: [React 19.1](https://react.dev/) <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>
- **Build Tool**: [Vite 6.3](https://vite.dev/) <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/) <mcreference link="https://medium.com/@nedopaka/setup-a-react-vite-project-with-typescript-prettier-vitest-2024-9bb6e919ac8f" index="1">1</mcreference>
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Animations**: [Motion 12.18](https://motion.dev/) (Framer Motion)
- **Icons**: [React Icons 5.5](https://react-icons.github.io/react-icons/) <mcreference link="https://medium.com/@nedopaka/setup-a-react-vite-project-with-typescript-prettier-vitest-2024-9bb6e919ac8f" index="1">1</mcreference>
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting**: [ESLint 9.25](https://eslint.org/) with TypeScript support

## 📋 Prerequisites

Before running this project, make sure you have the following installed: <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>

- **Node.js**: Version 18+ or 20+ (required by Vite)
- **pnpm**: Latest version (recommended package manager)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rennan-tech
   ```

2. **Install dependencies** <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>
   ```bash
   pnpm install
   ```

## 🚀 Development

**Start the development server** <mcreference link="https://codeparrot.ai/blogs/a-beginners-guide-to-using-vite-react" index="3">3</mcreference>
```bash
pnpm dev
```

The application will be available at `http://localhost:5173` with instant Hot Module Replacement (HMR). <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>

## 🏗️ Build

**Create a production build**
```bash
pnpm build
```

**Preview the production build locally**
```bash
pnpm preview
```

## 🧹 Code Quality

**Run ESLint to check code quality**
```bash
pnpm lint
```

## 📁 Project Structure

```
rennan-tech/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, and other assets
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── sections/         # Section components
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🔧 Configuration

### TypeScript
The project uses TypeScript with strict type checking enabled. Configuration files: <mcreference link="https://medium.com/@karpov-kir/simple-react-app-with-vite-typescript-linting-formatting-f0a3ee41dd2c" index="5">5</mcreference>
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - App-specific config
- `tsconfig.node.json` - Node.js config for build tools

### Vite
Vite is configured with: <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>
- React SWC plugin for fast refresh
- TypeScript support
- Optimized build settings

### ESLint
ESLint is configured with: <mcreference link="https://medium.com/@nedopaka/setup-a-react-vite-project-with-typescript-prettier-vitest-2024-9bb6e919ac8f" index="1">1</mcreference>
- TypeScript ESLint parser
- React Hooks rules
- React Refresh rules
- Modern ES2020+ support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies** <mcreference link="https://vite.dev/guide/" index="4">4</mcreference>
