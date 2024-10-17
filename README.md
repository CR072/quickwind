# Quickwind 🚀

**Quickwind** is a lightning-fast and efficient build tool for [Tailwind CSS](https://tailwindcss.com), designed to simplify your workflow and make your Tailwind experience smoother. No more slow builds or manual configuration headaches. **Quickwind** gets you up and running in seconds, helping you focus on what matters – building great user interfaces!

## Features ✨

- 🏎️ **Blazing Fast**: Uses Just-in-Time (JIT) compilation to ensure instant builds, even for large projects.
- ⚙️ **Zero Dependencies**: No external libraries required! Quickwind is fully self-contained, keeping your project lightweight.
- 🛠️ **Simple Setup**: Automatically generates your `tailwind.config.js` with optimized settings.
- 📂 **Flexible Output**: Easily specify output files or directories for your compiled CSS.
- 🔄 **Worker Threads**: Automatically handles large numbers of files using multi-threading for faster performance.
- 🧠 **Smart Matching**: Efficiently scans and processes only relevant files with customizable patterns.

## Installation 📦

Getting started with **Quickwind** is a breeze. Install it in your project as a development dependency:

```bash
npm i -D quickwind
```

## Quickstart 🚀

### Initialize Your Tailwind Project

You can quickly set up your Tailwind configuration with a single command:

```bash
npx quickwind init
```

This creates a default `tailwind.config.js` file in your project. If you already have one, Quickwind will detect it and skip this step.

### Build Your CSS ⚡

After setting up the configuration, building your Tailwind CSS is as simple as running:

```bash
npx quickwind
```

By default, Quickwind will look for the output file specified in `tailwind.config.js`. However, you can also specify a custom output path using the `-o` flag:

```bash
npx quickwind -o ./src/output.css
```

Quickwind automatically detects if you have a large project and uses worker threads to speed up the build process for hundreds of files.

## Configuration 🛠️

**Quickwind** respects your `tailwind.config.js` file and allows you to customize your build as needed. The default configuration includes Just-in-Time (JIT) mode and an optimized file structure:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./views/**/*.{html,js,jsx,tsx}",
  ],
  output: './dist/tailwind.css',  // Customizable output path
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF'
      }
    },
  },
  plugins: [],
};
```

## Advanced Usage 🚀

Quickwind is designed to be flexible and adapt to your project's needs:

- **Custom File Patterns**: Define your own patterns for file scanning in `content` inside `tailwind.config.js`.
- **Multi-threading**: Automatically handles large projects using worker threads for optimized performance when building hundreds of files.
  
### Run Without Tailwind Config

If you haven't defined an output in `tailwind.config.js`, specify it during the build:

```bash
npx quickwind -o ./dist/output.css
```

## Why Quickwind? 🌪️

- **Ultra-Fast Builds**: Build times are kept to a minimum, even for large projects.
- **Zero Hassle**: No complex setup required—just install and start building.
- **Fully Tailwind-Compatible**: Integrates seamlessly with your existing Tailwind CSS projects.
- **Efficient**: Only processes the files you care about, thanks to flexible file-matching and efficient recursive scanning.

## Contributing 🤝

We welcome contributions to make Quickwind even better! Feel free to submit issues or pull requests on [GitHub](https://github.com/CR072/quickwind).

---

**Quickwind** – The faster way to build Tailwind CSS projects.
