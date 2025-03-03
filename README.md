# Marvel Characters App

Este proyecto es una aplicación web desarrollada con ReactJS bajo Next.js que permite explorar personajes del universo Marvel. La aplicación implementa búsquedas, favoritos y detalles de personajes, asegurando una experiencia fluida y eficiente gracias al uso de React, Context API, TanStack React Query y estrategias de caché.


## Deploy en Vercel

La aplicación esta desplegada y se pude ver en [Marvel Characters App](https://marvel-rouge-delta.vercel.app/characters)


## Tecnologías utilizadas

- React: Biblioteca para construir la interfaz de usuario de manera declarativa.

- Next.js: Framework de React que proporciona renderizado del lado del servidor (SSR) y generación estática (SSG).

- TypeScript: Tipado estático para mejorar la mantenibilidad y robustez del código.

- Context API: Gestión de estado global, permitiendo un flujo de datos más predecible y eficiente.

- React Query: Manejador de datos asíncronos y caché para optimizar peticiones a la API.

- CSS Modules: Estilización modular y eficiente.

- Jest + React Testing Library: Pruebas unitarias y de integración.


## Arquitectura y diseño

Para una arquitectura escalable y basada en patrones de diseño modernos, se considera lo siguiente:

### 1. Domain-Driven Design (DDD)

Identificación y organización de la aplicación en módulos según los siguientes dominios Characters, Favorites y Common. Cada uno de estos dominios tiene su propia estructura y lógica de negocio bien definida.

- Characters Domain: Encargado de los personajes de Marvel.

- Favorite Domain: Maneja la funcionalidad de marcar personajes o cómics como favoritos.

- Common Domain: Maneja funcionalidades transversales (a futuro).


### Estructura de Directorios según DDD 

Permite que el modelo de código refleje de forma precisa los conceptos del negocio, cada módulo tiene su propósito claro (UI, estado, lógica de negocio).

```bash
src/
├── app/                    # Rutas principales
│   ├── characters/         # Lógica y servicios para los personajes
│   ├── favorites/          # Lógica y servicios de favoritos
│   ├── common/             # Lógica compartida entre dominios
├── components/             # Componentes UI
├── context/                # Almacenamiento de estado
├── hooks/                  # Hooks personalizados
├── lib/                    # Libs personalizados
├── services/               # Integración con APIs externas
├── utils/                  # Utilidades generales, funciones auxiliares
```

### Desacople de los Componentes UI de la Lógica de Negocio

El código UI (como CharacterCard, ComicCard, Favorite, FavoriteButton, Header o SearchBar) se mantiene dentro de components/. Estos componentes reciben datos a través de props o contextos y no tienen lógica de negocio compleja.


### Contexto y Estado Global

El contexto (context/) puede seguir utilizándose para manejar el estado global, esto permitira estructurarlo según los contextos de dominio. Por ejemplo, actualmente se maneja el estado relacionado con los favoritos FavoriteContext y a futuro se podría tener un CharacterContext para manejar el estado relacionado con los personajes.


### Uso de hooks personalizados

Los hooks personalizados mantienen encapsulada la lógica de negocio y son reutilizables, cada hook tiene una única responsabilidad (principio de responsabilidad única)

- useCharacters: Gestiona la carga de personajes desde la API.

- useCharacterDetail: Gestiona la carga de personajes por ID y los comics asociados a ese personaje desde la API.


### Servicios de Dominio

Esta divido en repositorios específicos por dominio y mantiene la lógica de acceso a datos encapsulada y centrada en cada contexto del dominio.

- characterRepository.ts


### Por que DDD

- Alineación con el negocio: DDD permite que el modelo de código refleje de forma precisa los conceptos del negocio. 

- Escalabilidad: A medida que crezca el codigo, DDD facilita la expansión se puede agregar nuevos contextos delimitados sin que afecten a los existentes. Esto hace que la aplicación sea más escalable y fácil de mantener.

- Mantenibilidad: Al separar las responsabilidades en contextos claramente definidos, puedes cambiar la lógica de un dominio sin que afecte otros dominios, lo que facilita las actualizaciones y el mantenimiento.

- Desarrollo más enfocado: Enfoque en áreas específicas de la aplicación, trabajando en un dominio aislado sin tener que preocuparse por toda la aplicación en conjunto.

- Testabilidad: Cada capa es fácilmente testeable por separado.


### 2. Gestión de estado eficiente con Context API, Local Storage y TanStack React Query

#### Context API: Se usa para estados globales ligeros como el almacenamiento de favoritos.

- Simplicidad:
    * No requiere configuración adicional como store.ts, slices, o configureStore.
    * Se elimina la necesidad de useDispatch y useSelector, simplificando los componentes.

- Menos dependencias:
    * Evita instalar Redux Toolkit y react-redux, reduciendo el tamaño del bundle.

- Más adecuado para este caso:
    * El estado de favoritos es una lista relativamente pequeña, por lo que el rendimiento no se ve afectado.
    * Context API + useReducer permite un manejo eficiente sin la sobrecarga.


#### Local Storage: 

- Los favoritos se mantienen después de recargar la página.

- Es una implementación simple y eficiente sin dependencias adicionales.

- No afecta el rendimiento de la aplicación, ya que solo usamos localStorage cuando es necesario.


#### Tanstack React Query: Maneja el fetching y caching de datos de la API, minimizando peticiones innecesarias y mejorando la eficiencia.

- Mejor organización, queryClient centralizado.

- Se usa un singleton para QueryClient (No usa useState innecesario)

- Configuración global optimizada, defaultOptions de QueryClient aplicados.


### 3. Uso de caché para optimizar rendimiento

Se implementa caché en distintos niveles:

- Client-side caching con TanStack React Query, evitando peticiones redundantes a la API de Marvel.

- Session Storage para persistencia de búsquedas recientes.

- Revalidación de datos: La API refresca datos de forma controlada según estrategias configuradas en queryClient.

Esto reduce tiempos de carga y mejora la experiencia del usuario.


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
