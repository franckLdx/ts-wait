import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: "json" };

const input = 'src/index.ts'

export default [
  {
    input,
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      plugins: [terser()]
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript()
    ]
  },
  {
    input,
    external: [],
    plugins: [
      typescript()
    ],
    output: [
      { file: pkg.exports.require, format: 'cjs', plugins: [terser()] },
      { file: pkg.exports.import, format: 'es', plugins: [terser()] }
    ],
  },
  {
    input,
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  }
];