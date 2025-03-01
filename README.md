# Marvel Characters App

Este proyecto es una aplicación web desarrollada con ReactJS bajo Next.js que permite explorar personajes del universo Marvel. La aplicación implementa búsquedas, favoritos y detalles de personajes, asegurando una experiencia fluida y eficiente gracias al uso de React, Redux Toolkit, TanStack React Query y estrategias de caché.


## Deploy en Vercel

La aplicación esta desplegada y se pude ver en [Marvel Characters App](https://marvel-rouge-delta.vercel.app/characters)


## Tecnologías utilizadas

- React: Biblioteca para construir la interfaz de usuario de manera declarativa.

- Next.js: Framework de React que proporciona renderizado del lado del servidor (SSR) y generación estática (SSG).

- TypeScript: Tipado estático para mejorar la mantenibilidad y robustez del código.

- Redux Toolkit: Gestión de estado global, permitiendo un flujo de datos más predecible y eficiente.

- React Query: Manejador de datos asíncronos y caché para optimizar peticiones a la API.

- CSS Modules: Estilización modular y eficiente.

- Jest + React Testing Library: Pruebas unitarias y de integración.


## Arquitectura y patrones

El desarrollo sigue principios de arquitectura limpia y modularidad:

### 1. Estructura modular basada en componentes. 

La aplicación está dividida en módulos independientes:

- app/: Rutas principales de la aplicación en Next.js.

- components/: Componentes reutilizables de UI definidos como base para atomic design.

- services/: Manejadores de datos como marvelService.ts para la API de Marvel.

- store/: Almacenamiento de estado con Redux Toolkit.

- hooks/: Hooks personalizados para encapsular lógica de negocio.

- utils/: constantes y demas logica de tipo helper.

Esta organización permite escalabilidad y reutilizabilidad, facilitando futuras modificaciones o expansiones.


### 2. Gestión de estado eficiente con Redux y TanStack React Query

- Redux Toolkit: Se usa para estados globales ligeros como el almacenamiento de favoritos.

- tanstack React Query: Maneja el fetching y caching de datos de la API, minimizando peticiones innecesarias y mejorando la eficiencia.


### 3. Uso de caché para optimizar rendimiento

Se implementa caché en distintos niveles:

- Client-side caching con TanStack React Query, evitando peticiones redundantes a la API de Marvel.

- Session Storage para persistencia de búsquedas recientes.

- Revalidación de datos: La API refresca datos de forma controlada según estrategias configuradas en queryClient.

Esto reduce tiempos de carga y mejora la experiencia del usuario.


## Decisiones de diseño

Separación de responsabilidades: Cada módulo tiene su propósito claro (UI, estado, lógica de negocio).

Uso de hooks personalizados: Para encapsular lógica reutilizable como useFetchCharacters.

Optimización de rendimiento: Uso de caché en TanStack React Query y Redux Toolkit en lugar de un Redux complejo.


## Ejemplo de Tests

El proyecto incluye pruebas unitarias y de integración con Jest y React Testing Library. Ejemplo de test para el componente de búsqueda:

```bash
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

test('You must update the input when the user types', async () => {
  render(<SearchBar onSearch={() => {}} />);
  const input = screen.getByPlaceholderText('Search...');
  await userEvent.type(input, 'Spider-Man');
  expect(input).toHaveValue('Spider-Man');
});
```


## Instalación y ejecución

Clonar el repositorio:
```bash
git clone https://github.com/javierldiazg/marvel.git
cd marvel
```

Instalar dependencias:
```bash
npm install
```

Ejecutar en desarrollo:
```bash
npm run dev
```


Abrir [http://localhost:3000](http://localhost:3000) con su navegador para ver la App.


Ejecutar tests:
```bash
npm test
```


## Conclusión

Este proyecto demuestra buenas prácticas en modularidad, gestión de estado y optimización de rendimiento, asegurando una arquitectura escalable y eficiente. Las decisiones tomadas permiten un desarrollo mantenible y fácil de extender en el futuro.
