/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({mode})=>{
  const isLibMode = mode === "lib";
  return {
    plugins: [ 
      react(), 
      ...(isLibMode? [appendCssImportPlugin()] : [])
    ],
    // brand-identity-brand.github.io
    base: isLibMode ? undefined : '/',
    // use '/' for user/organization GitHub Pages repo
    server: {
      host: true,
      // or use '0.0.0.0'
      port: 5173 // optional: default is 5173
    },
    test: {
      projects: [{
        extends: true,
        plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{
              browser: 'chromium'
            }]
          },
          setupFiles: ['.storybook/vitest.setup.js']
        }
      }]
    },
    //isLibMode 
    esbuild: {
      keepNames: true // ⬅️ preserves function/class names
    },
    build: isLibMode 
    ? {
      minify: false, // <-- IMPORTANT
      lib: {
        entry: path.resolve(__dirname, 'index.jsx'),
        name: 'os',
        formats: ['es'],
        fileName: () => `index.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {

        }
      },
      sourcemap: true,
    }
    : {}
  }
});

import fs from 'node:fs';
import { writeFile } from 'fs/promises';
function appendCssImportPlugin() {
  return {
    name: 'append-css-import',
    buildStart() {
      console.log('append-css-import plugin started');
    },
    async writeBundle () {
      const distDir = path.resolve(__dirname, 'dist');
      const index_js_File = path.join(distDir, 'index.js');
      const os_css_File = path.join(distDir, 'os.css');

      if (fs.existsSync(index_js_File)) {
        let content = fs.readFileSync(index_js_File, 'utf-8');
        if (!content.includes(`import './os.css'`)) {
          content = `import './os.css';\n` + content;
          fs.writeFileSync(index_js_File, content);
          console.log('Injected CSS import into index.js');
        }
        // create css.js to import os.css

        const css_js = await writeFile(path.join(distDir, "./css.js"), "import './os.css'");
        
        console.log('css.js written.');
      }

    }
  };
}