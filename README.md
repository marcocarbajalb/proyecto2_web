# Calculadora (Laboratorio 8)

Calculadora simple estilo Casio retro, construida con componentes atómicos y un hook que centraliza toda la lógica de operaciones.

> Sistemas y tecnologías web - S40 | Marco Carbajal (23025)

## Stack

- **Bun** como package manager y runtime
- **Vite + React 18 + TypeScript** para la app
- **Vitest + Testing Library** para tests
- **Storybook 8** para historias de componentes
- **ESLint** (`neostandard`) con reglas custom para sin punto y coma y máximo 120 caracteres por línea

## Instalación

```bash
bun install
```

## Scripts disponibles

```bash
bun run dev               # servidor de desarrollo (http://localhost:5173)
bun run build             # build de producción
bun run preview           # servir el build localmente
bun run test              # correr la suite de tests una vez
bun run lint              # eslint sobre src/**/*.{js,jsx,ts,tsx}
bun run storybook         # storybook interactivo (http://localhost:6006)
bun run build-storybook   # storybook estático
```

## Funcionalidades

### Operaciones soportadas

- Suma (`+`), resta (`−`), multiplicación (`×`), división (`÷`), módulo (`%`)
- Punto decimal (`.`)
- Inversión de signo (`±`)
- Igual (`=`)

### Reglas de comportamiento

- El display soporta máximo 9 caracteres. El punto y el signo negativo cuentan como caracter.
- Cualquier dígito ingresado más allá del noveno se ignora.
- Si una operación produce un resultado negativo (por ejemplo `5 − 9`) se muestra `ERROR`.
- Si una operación produce un resultado mayor a `999999999` se muestra `ERROR`.
- División entre cero produce `ERROR`.
- Al encadenar operaciones (`1 + 2 + 3 + ...`) cada operador muestra el resultado intermedio.
- Después de presionar un operador, el siguiente dígito reemplaza el display en lugar de concatenarse.
- Una vez en estado `ERROR`, los botones se ignoran hasta recargar.

## Estructura del proyecto

```
src/
├── components/
│   ├── Button.tsx               # botón
│   ├── Calculator.tsx           # integra hook, display y keypad
│   ├── Display.tsx              # pantalla LCD
│   ├── Keypad.tsx               # grilla de botones
│   ├── Keypad.helpers.tsx       # factorías de Button para el keypad
│   ├── Keypad.types.ts          # tipos del Keypad
│   ├── *.stories.tsx            # historias de Storybook
│   └── *.test.tsx               # tests de integración
├── hooks/
│   ├── useCalculator.ts         # toda la lógica de la calculadora
│   └── useCalculator.test.ts    # tests del hook
├── styles/
│   └── calculator.css           # diseño Casio retro
├── App.tsx
├── main.tsx
└── test-setup.ts
```

## Tests

Cinco tests no triviales:

1. **Encadenado de operadores** — verifica que `1 + 2 +` muestra `3` antes del `=`
2. **ERROR por negativo** — `5 − 9 =` debe dar `ERROR`
3. **Truncado de división** — `22 / 7 =` debe dar exactamente `3.1428571` (9 caracteres)
4. **Limpieza al presionar operador** — después de un operador, el siguiente dígito reemplaza el display
5. **Integración end-to-end** — render del Calculator completo, clicks reales, `8 × 7 =` debe mostrar `56`

```bash
bun run test
```

## Historias de Storybook

Cinco historias distribuidas en dos componentes atómicos:

- **Button**: Number, Operation, Equals
- **Display**: Default, Error

```bash
bun run storybook
```

## Linting

ESLint con `neostandard` más dos reglas custom requeridas por el laboratorio:

- `@stylistic/semi: never` — prohíbe punto y coma
- `max-len: { code: 120 }` — máximo 120 caracteres por línea

```bash
bun run lint
```

## Retos implementados
 
Todos los retos de la rúbrica fueron implementados.