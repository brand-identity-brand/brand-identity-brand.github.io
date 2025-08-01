import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // use '/' for user/organization GitHub Pages repo
  server: {
    host: true, // or use '0.0.0.0'
    port: 5173, // optional: default is 5173
  },
})



