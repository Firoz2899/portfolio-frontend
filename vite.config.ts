import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  }
})



// import { defineConfig, loadEnv } from 'vite'
// import react, { reactCompilerPreset } from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// // https://vite.dev/config/
// export default defineConfig(({mode}) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     define: {
//       // Provide an explicit app-level constant derived from an env var.
//       __APP_ENV__: JSON.stringify(env.APP_ENV),
//     },
//     // Example: use an env var to set the dev server port conditionally.
//     server: {
//       port: env.VITE_APP_PORT ? Number(env.VITE_APP_PORT) : 5173,
//     },
//     plugins: [
//       react(),
//       babel({ presets: [reactCompilerPreset()] }),
//       tailwindcss()
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, './src'),
//       }
//     }
//   }
// })
