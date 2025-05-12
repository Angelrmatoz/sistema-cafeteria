# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Estructura del proyecto

```
src/
├── _index.scss           # Archivo principal de estilos (importado en main.jsx)
├── App.jsx
├── main.jsx
│
├── api/                  # Lógica para consumir la API (axios, endpoints, etc.)
├── assets/               # Imágenes, íconos, fuentes, etc.
│   ├── icons/
│   └── img/
├── components/           # Componentes reutilizables (Botón, Modal, QRScanner, etc.)
│   └── QRScanner.jsx
├── features/             # Módulos principales de la app
│   ├── billing/
│   ├── employees/
│   ├── history/
│   ├── menu/
│   └── orders/
├── hooks/                # Custom hooks de React
├── layouts/              # Layouts generales (POSLayout, AuthLayout, etc.)
├── pages/                # Páginas principales (Home, Login, POS, Historial, etc.)
├── routes/               # Definición de rutas (react-router)
├── styles/               # Estilos globales, variables, mixins, helpers
│   ├── _global.scss
│   ├── _mixins.scss
│   └── _variables.scss
├── utils/                # Funciones utilitarias y helpers generales
```

Esta estructura es modular, escalable y facilita el mantenimiento del proyecto. Puedes agregar o quitar carpetas según crezcan las necesidades del sistema de cafetería.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](./LICENSE) para más detalles.
