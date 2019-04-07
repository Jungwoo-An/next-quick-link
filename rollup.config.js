import typescript from 'rollup-plugin-typescript2'

import { terser } from 'rollup-plugin-terser'

const isProduction =
  typeof process.env.NODE_ENV !== 'undefined' &&
  process.env.NODE_ENV === 'production'

const plugins = [typescript()]

if (isProduction) {
  plugins.push(
    terser({
      sourcemap: true
    })
  )
}

const FILENAME = 'dist/next-link'

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: `${FILENAME}.js`,
      format: 'cjs'
    },
    {
      file: `${FILENAME}.es.js`,
      format: 'es'
    }
  ],
  external: ['react', 'next/router', 'next/link'],
  plugins
}
