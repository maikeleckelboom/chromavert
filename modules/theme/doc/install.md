### Prettier

```bash
pnpm i -D prettier prettier-plugin-tailwindcss
```

### Material Color Utilities & ChromaJS

```bash
pnpm i -D @material/material-color-utilities pnpm i -D chroma-js @types/chroma-js
```

### Tailwindcss + Plugins

```bash
pnpm i -D tailwindcss @tailwindcss/container-queries @tailwindcss/aspect-ratio tailwind-merge
```

### Vueuse + Add-Ons & Nuxt Viewport

```bash
pnpm i -D @vueuse/core @vueuse/shared @vueuse/math @vueuse/integrations @vueuse/nuxt nuxt-viewport 
```

---

### CVA

```bash
pnpm i -D cva@beta
```

### Webstorm

1. Check the version. Available for WebStorm 2023.1 and later
2. Open the settings. Go to Languages and Frameworks | Style Sheets | Tailwind CSS
3. Add the following to your tailwind configuration

```json
{
  "experimental": {
    "classRegex": [
      "cva\\(([^)]*)\\)",
      "[\"'`]([^\"'`]*).*?[\"'`]"
    ]
  }
}
```

### VSCode

1. Install the “Tailwind CSS IntelliSense” Visual Studio Code extension
2. Add the following to your settings.json:

```json
{
  "tailwindCSS.experimental.classRegex": [
    [
      "cva\\(([^)]*)\\)",
      "[\"'`]([^\"'`]*).*?[\"'`]"
    ],
    [
      "cx\\(([^)]*)\\)",
      "(?:'|\"|`)([^']*)(?:'|\"|`)"
    ]
  ]
}
```

---

