/** @type {import('tailwindcss').Config} */
module.exports = {
  // The 'content' field tells Tailwind CSS which files to scan for class names.
  // Tailwind uses these files to generate the appropriate CSS. You need to specify
  // the paths to your template files where Tailwind CSS classes are used.
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],

  // The 'theme' section allows you to customize Tailwind's default design system,
  // such as colors, fonts, spacing, etc. You can extend the default values or override them.
  theme: {
    // This is where you add new values or modify existing ones without completely
    // overriding Tailwind's defaults.
    extend: {}
  },

  // The 'plugins' field is used to include Tailwind CSS plugins that provide additional
  // utilities or components. You can add third-party plugins or create your own.
  plugins: []
}

// Understanding What to Put in Each Field:
// 'content': Defines where Tailwind should look for class names. This is crucial for
// ensuring that Tailwind generates the necessary styles for your specific usage.
// 'theme': Customizes Tailwind's default design system. Use this to adjust default styles
// to match your design requirements.
// 'plugins': Extends Tailwind's functionality with additional utilities or components.
// Use this to incorporate community plugins or your own custom solutions.
