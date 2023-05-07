const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@roketid/windmill-react-ui/config");
module.exports = windmill({
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./example/**/*.{js,ts,jsx,tsx}",
  ],
  extend: {},
  plugins: [],
});
