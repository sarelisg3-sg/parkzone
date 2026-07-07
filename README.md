# ParkZone — prototipo funcional

Reconstrucción en código del prototipo de **ParkZone**, una app unificada para
gestionar parquímetros en la Ciudad de México. Proyecto final de UX: research,
card sorting, wireframes, prototipo de alta fidelidad en Figma y pruebas de
usabilidad con 5 usuarios (127 s promedio para completar el flujo, 4.2/5 de
satisfacción).

Esta versión implementa el prototipo completo como una app interactiva real:
onboarding (login / crear cuenta en 4 pasos), flujo de estacionamiento
(geolocalización → selección de tiempo → pago → sesión activa con countdown en
vivo → extensión de tiempo) y gestión de cuenta (vehículo, métodos de pago,
saldo, historial).

**Demo:** presentada dentro de un marco de iPhone, como el prototipo de Figma.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first, tokens `--ds-*`)
- Arquitectura de tokens y componentes portada del
  [design system personal](https://github.com/sarelisg3-sg/design-system),
  con la escala de marca recalculada al teal de ParkZone (`#104d5f` / `#48a5ad`)

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint
npm run build
```

## Case study

El case study completo (proceso, arquitectura de información, evaluación
heurística y resultados de las pruebas de usabilidad) está en
[sarelisantiago.dev](https://sarelisantiago.dev).
