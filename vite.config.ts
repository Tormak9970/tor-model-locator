import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'exports.js'),
            name: 'TorModelLocator',
        },
        rollupOptions: {
            external: [ "fs", "path" ],
            output: {
                globals: { fs: "fs", path: "path" }
            }
        }
    }
});
