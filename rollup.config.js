import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import replace from 'rollup-plugin-replace'
import { author } from './package.json'
const license = require("rollup-plugin-license")

const config = {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "cjs",
        // sourcemap: true,
        // exports: "default",
    },
    plugins: [
        // replace({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        //     'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
        // }),
        resolve({
            preferBuiltins: true
        }),
        json(),
        commonjs(),
        babel({
            babelHelpers: "runtime",
            exclude: "node_modules/**" // 只编译我们的源代码
        }),
        license({
            banner: `StandardPackage\nv<%= pkg.version %>\n@author ${author} <%= moment().format("YYYY-MM-DD HH:mm:ss") %>`
        })
    ]
}

export default config