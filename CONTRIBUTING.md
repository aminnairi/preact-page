# Contributing

## Requirements

- Git
- Node
- NPM

## Installation

Clone the Git repository locally.

```bash
git clone https://github.com/aminnairi/preact-page
cd preact-page
```

## Package

### Dependencies

Install the Node dependencies locally.

```bash
npm --workspace package install
```

### Build

Build the library into the `dist` folder.

```bash
npm --workspace package run build
```

### Pack

```bash
npm --workspace package pack
```

### Types

Build the type definitions into the `dist` folder.

```bash
npm run types
```

## Examples

### Client-side rendering

#### Preact Page installation

```bash
npm --workspace package pack
npm --workspace examples/client-side-rendering install ./preact-page-*.tgz
```

#### Dependencies

```bash
npm --workspace examples/client-side-rendering install
```

#### Start

```bash
npm --workspace examples/client-side-rendering start
```

### Server-side rendering

#### Preact Page installation

```bash
npm --workspace package pack
npm --workspace examples/client-side-rendering install ./preact-page-*.tgz
```

#### Dependencies

```bash
npm --workspace examples/server-side-rendering install
```

#### Start

```bash
npm --workspace examples/server-side-rendering start
```
