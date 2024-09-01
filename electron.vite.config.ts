import { resolve } from 'path' // Used to resolve paths to ensure correct imports and aliases
import { defineConfig, externalizeDepsPlugin } from 'electron-vite' // defineConfig: A function from 'electron-vite' to define the configuration for different parts of your electron application. externalizeDepsPlugin: A plugin to handle external dependencies, helping to optimize the build
import react from '@vitejs/plugin-react' // The vite plugin for React support.

// This function is used to create the configuration object for 'electron-vite' It takes an object where you define configurations for the 'main', 'preload', and 'renderer' processes.
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()], // This plugin helps externalize dependencies in the main process to optimize the build and reduce package size
    resolve: {
      // aliases are used to shorten and simplify module imports
      alias: {
        // Maps to 'src/main/lib' so you can use 'import {something} from '@/lib/something' in your main process code.
        '@/lib': resolve('src/main/lib'),
        '@/shared': resolve('src/shared')
      }
    }
  },
  preload: {
    // Similar to the 'main' process, this ensures that dependencies used in the preload script are handled efficiently
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      // Aliases for the renderer process, which typically handles the UI.
      alias: {
        // Maps to 'src/renderer/src', allowing you to use 'import component from '@renderer/Component' in your renderer code
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/store': resolve('src/renderer/src/store'),
        '@components': resolve('src/renderer/src/components'),
        '@/mocks': resolve('src/renderer/src/mocks')
      }
    },
    // Adds React support to your Vite configuration, enabling JSX and React features in the renderer process
    plugins: [react()]
  }
})
