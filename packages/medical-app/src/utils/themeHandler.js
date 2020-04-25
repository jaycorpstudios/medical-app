// TODO: Update primary and secondary colors, use makes no sense now as secondary is the primary :/
const defaultTheme = {
  '--color-primary': 'rgb(31,187,171)',
  '--color-secondary': 'rgb(17,104,100)',
  '--color-secondary-shadow': 'rgb(19,88,93)',
  '--color-background-primary': 'rgb(255,255,255)',
  '--color-background-secondary': 'rgb(246,246,246)',
  '--color-text-base': 'rgb(64,64,64)',
  '--color-text-negative': 'rgb(255,255,255)',
  '--color-gray': 'rgb(108,108,108)',
  '--color-disable-gray': 'rgb(216,216,216)',
  '--color-element-shadow': 'rgba(0,0,0,.2)',
  '--color-modal-shade': 'rgba(0,0,0,.4)',
  '--color-female-photo': 'rgb(176,33,106)',
  '--color-male-photo': 'rgb(10,86,134)',
  '--color-info': 'rgb(4,149,255)',
  '--color-success': 'rgb(12,198,111)',
  '--color-warning': 'rgb(255,170,0)',
  '--color-error': 'rgb(255,61,113)',
  '--color-info-shadow': 'rgba(4,149,255,.75)',
  '--color-success-shadow': 'rgba(12,198,111,.75)',
  '--color-warning-shadow': 'rgba(255,170,0,.75)',
  '--color-error-shadow': 'rgba(255,61,113,.75)',
};

const purpleTheme = {
  '--color-primary': 'rgb(139, 0, 202)',
  '--color-secondary': 'rgb(109, 0, 158)',
  '--color-secondary-shadow': 'rgb(33, 0, 47)',
  '--color-background-primary': 'rgb(255,255,255)',
  '--color-background-secondary': 'rgb(246,246,246)',
  '--color-text-base': 'rgb(64,64,64)',
  '--color-text-negative': 'rgb(255,255,255)',
  '--color-gray': 'rgb(108,108,108)',
  '--color-disable-gray': 'rgb(216,216,216)',
  '--color-element-shadow': 'rgba(0,0,0,.2)',
  '--color-modal-shade': 'rgba(0,0,0,.4)',
  '--color-female-photo': 'rgb(176,33,106)',
  '--color-male-photo': 'rgb(10,86,134)',
  '--color-info': 'rgb(4,149,255)',
  '--color-success': 'rgb(12,198,111)',
  '--color-warning': 'rgb(255,170,0)',
  '--color-error': 'rgb(255,61,113)',
  '--color-info-shadow': 'rgba(4,149,255,.75)',
  '--color-success-shadow': 'rgba(12,198,111,.75)',
  '--color-warning-shadow': 'rgba(255,170,0,.75)',
  '--color-error-shadow': 'rgba(255,61,113,.75)',
};

const availableThemes = {
  default: defaultTheme,
  purple: purpleTheme,
};

const setTheme = (themeName = 'default') => {
  const root = document.documentElement;
  const theme = availableThemes[themeName] || availableThemes.default;
  Object.keys(theme).forEach((themeKey) => {
    const value = theme[themeKey];
    root.style.setProperty(themeKey, value);
  });
};

// Expose functions for testing purposes, remove once themes are defined.
window.setTheme = setTheme;
window.getAvailableThemes = () => Object.keys(availableThemes);

export default setTheme;
