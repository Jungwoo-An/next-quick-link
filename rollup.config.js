import typescript from 'rollup-plugin-typescript2';

import { terser } from 'rollup-plugin-terser';

const isProduction =
  typeof process.env.NODE_ENV !== 'undefined' &&
  process.env.NODE_ENV === 'production';

const plugins = [typescript()];

if (isProduction) {
  plugins.push(
    terser({
      sourcemap: true,
    }),
  );
}

const filename = 'dist/next-link';

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: `${filename}.js`,
      format: 'cjs',
    },
    {
      file: `${filename}.es.js`,
      format: 'es',
    },
  ],
  plugins: [...plugins],
};
