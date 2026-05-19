# **Proyecto 2:** Calculadora

Sistemas y tecnologías web - S40
> Marco Carbajal (23025)

Calculadora simple estilo Casio retro, construida con componentes atómicos y un hook custom que centraliza toda la lógica de operaciones.

## Stack

- **Bun** como package manager y runtime
- **Vite + React 18 + TypeScript** para la app
- **Vitest + Testing Library + vitest-axe** para tests (incluye pruebas de accesibilidad)
- **Storybook 8** con interactions, controls y play functions
- **ESLint** (`neostandard`) con reglas custom para sin punto y coma y máximo 120 caracteres por línea
- **GitHub Actions** para CI automático en cada push

## Instalación

```bash
bun install
```

## Scripts disponibles

```bash
bun run dev               # servidor de desarrollo (http://localhost:5173)
bun run build             # build de producción → dist/
bun run preview           # servir el build localmente
bun run test              # correr la suite de tests una vez
bun run test:watch        # tests en modo watch
bun run lint              # eslint sobre src/**/*.{js,jsx,ts,tsx}
bun run storybook         # storybook interactivo (http://localhost:6006)
bun run build-storybook   # storybook estático → storybook-static/
```

## Cómo correr la aplicación

```bash
bun install
bun run dev
```

Y abrir http://localhost:5173 en el navegador.

## Cómo correr los tests

```bash
bun run test
```

La suite incluye 24 tests cubriendo lógica del hook, integración de componentes y accesibilidad.

## Cómo correr Storybook

```bash
bun run storybook
```

Y abrir http://localhost:6006 en el navegador.

## Funcionalidades

### Operaciones soportadas

- Suma (`+`), resta (`−`), multiplicación (`×`), división (`÷`), módulo (`%`)
- Punto decimal (`.`)
- Inversión de signo (`±`)
- Igual (`=`)

### Reglas de comportamiento

- El display soporta máximo 9 caracteres. El punto y el signo negativo cuentan como caracter.
- Cualquier dígito ingresado más allá del noveno se ignora.
- Si una operación produce un resultado negativo se muestra `ERROR`.
- Si una operación produce un resultado mayor a `999999999` se muestra `ERROR`.
- División entre cero produce `ERROR`.
- Al encadenar operaciones cada operador muestra el resultado intermedio.
- Después de presionar un operador, el siguiente dígito reemplaza el display.
- Una vez en estado `ERROR`, los botones se ignoran hasta recargar.

## Arquitectura

```
src/
├── components/
│   ├── Button.tsx               # botón presentacional con variantes
│   ├── Calculator.tsx           # cabeza, integra hook + display + keypad
│   ├── Display.tsx              # pantalla LCD
│   ├── Keypad.tsx               # grilla de botones
│   ├── Keypad.helpers.tsx       # factorías de Button para el keypad
│   ├── Keypad.types.ts          # tipos del Keypad
│   ├── *.stories.tsx            # historias de Storybook
│   └── *.test.tsx               # tests de componente y accesibilidad
├── hooks/
│   ├── useCalculator.ts         # toda la lógica de la calculadora
│   └── useCalculator.test.ts    # tests del hook
├── styles/
│   └── calculator.css           # diseño Casio retro
├── App.tsx
├── main.tsx
└── test-setup.ts
```

### Decisiones de diseño

- **Lógica centralizada en `useCalculator`:** los componentes son puramente presentacionales y todos están por debajo de 20 líneas. Esto facilita testing (el hook se testea aislado) y mantenimiento.
- **`formatResult` aplica reglas en orden:** chequea `isFinite`, rango, redondeo de errores de punto flotante con `toPrecision(12)`, y trunca cuando excede 9 caracteres preservando el punto decimal.
- **El Keypad mapea símbolos visuales a operadores lógicos:** el usuario ve `×` pero el hook recibe `'*'`, manteniendo el código interno limpio.

## Tests

24 tests distribuidos en tres categorías:

### Tests del hook (`useCalculator.test.ts`)

- **Operaciones básicas** (9 casos parametrizados con `it.each`): suma, resta, multiplicación, división, módulo, truncado de decimales, ERROR por negativo, overflow, división entre cero
- **Flujo del display** (3 tests): resultados intermedios al encadenar, reemplazo después de operador, límite de 9 caracteres
- **Decimales** (4 tests): ingreso básico, segundo punto ignorado, punto después de operador, errores de punto flotante
- **Edge cases** (7 tests): límite de 9 dígitos, `=` sin operación, persistencia de ERROR, operaciones consecutivas, toggle de `±`, no `-0`

### Tests de integración (`Calculator.test.tsx`)

- Click en botones reales actualiza el display y calcula correctamente

### Tests de accesibilidad (`Calculator.a11y.test.tsx`)

- Verifica con `vitest-axe` que el Calculator no tiene violaciones de WCAG

## Historias de Storybook

13 historias distribuidas en cuatro componentes:

- **Button** (7): Playground con controls interactivos, Number, Operation, Equals, Special, Wide, AllVariants
- **Display** (2): Default, Error
- **Keypad** (1): Default con todos los callbacks registrados como actions
- **Calculator** (3): Default, Demo de `22 ÷ 7` con play function, Demo de Estado ERROR con play function

Las demos del Calculator se animan solas al abrirlas y verifican el resultado con `expect`.

## Linting

ESLint con `neostandard` (sucesor de `eslint-config-standard` para flat config) más dos reglas custom requeridas por el proyecto:

- `@stylistic/semi: never` - prohíbe punto y coma
- `max-len: { code: 120 }` - máximo 120 caracteres por línea

```bash
bun run lint
```

## Accesibilidad

- `role='status'` y `aria-live='polite'` en el display para que los lectores de pantalla anuncien los cambios
- `aria-label` en botones de símbolos (`±`, `+`, `−`, `×`, `÷`, `%`) con descripción en español
- Navegación por teclado con Tab y activación con Space/Enter (comportamiento nativo de `<button>`)
- `:focus-visible` con outline mostaza para feedback visual del foco
- Test automático con `vitest-axe` que detecta violaciones de WCAG en cada corrida del CI

## CI

El workflow de GitHub Actions (`.github/workflows/ci.yml`) corre en cada push y pull request a `main`. Ejecuta en orden:

1. Instalación con `bun install --frozen-lockfile`
2. Lint
3. Tests
4. Build de producción

Si cualquier paso falla, el commit queda marcado con un check rojo.