# Next Link

Nextjs effective prefetch to bundle.

## How?

- Detect route in viewport (Intersection Observer)
- Checks if user connection type is slow (2g or save data mode)

## Getting Started

### Install via npm (or yarn)

```bash
npm install --save-dev next-link
```

### Usage

```tsx
import Link from 'next-link';

<Link {/* Allow all options of next/link */} />
```

### API

First, check the options of [next/link](https://github.com/zeit/next.js#with-link)

Name       | Type
---------- | -------
rootMargin | string?
threshold  | number?

### Inspiration

- [quicklink](https://github.com/GoogleChromeLabs/quicklink)
