
// shell-app.js generated by workbox on build process

const registerWorkers = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('shell-app.js');
    });
  }
};

export default registerWorkers;
