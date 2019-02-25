import typescript from 'rollup-plugin-typescript';

import { uglify } from 'rollup-plugin-uglify';

const isMinify = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'minify';
const plugins = [typescript()];

if (isMinify) {
  plugins.push(
    uglify({
      sourcemap: true,
    }),
  );
}

const file = (isMinify && 'dist/next-link.min.js') || 'dist/next-link.js';

export default {
  input: 'lib/index.ts',
  output: {
    file,
    format: 'esm',
  },
  plugins: [...plugins],
};
