import replace from '@rollup/plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    replace({
      values: {
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
      }
    }),
    resolve(), // Helps Rollup find `node_modules`
    commonjs() // Converts CommonJS modules to ES6
  ],
};