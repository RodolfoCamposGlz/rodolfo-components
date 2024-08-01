/** @type {import('tailwindcss').Config} */
export default {
  important: ".rodolfo-components",
  prefix: "rodolfo-components-",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "custom-sm": "14px",
      },
      lineHeight: {
        custom: "22px",
      },
      letterSpacing: {
        custom: "-0.6%",
      },
      boxShadow: {
        custom: "0px 4px 8px 0px rgba(64, 67, 68, 0.14)",
      },
      borderColor: {
        focus: "rgba(22, 78, 99, 0.5)",
      },
    },
  },
  plugins: [],
};
