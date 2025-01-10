# Astra

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn package manager

## Environment Setup

Create `.env` by copying `.env.example` and setting the appropriate values.

## Installation

```
yarn install
```


## Scripts

- `yarn dev` - Start user development server
- `yarn dev:admin` - Start admin development server
- `yarn build` - Build user version
- `yarn build:admin` - Build admin version

## The builds will be output to:
- User version: `dist/user/`
- Admin version: `dist/admin/`

## Technologies

- React 18
- TypeScript
- Vite
- Joy UI
- Zustand (State Management)
- React Router DOM
- Axios
- React Hook Form
- Chart.js
- Socket.io Client
