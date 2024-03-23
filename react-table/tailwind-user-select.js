// tailwind-user-select.js

module.exports = function ({ addUtilities }) {
    const newUtilities = {
      '.user-select-none': {
        'user-select': 'none',
      },
    };
  
    addUtilities(newUtilities);
  };
  