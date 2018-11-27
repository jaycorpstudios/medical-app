const manifestContent = {
    name: 'Villafeet App',
    icons: [
      {
          src: "theme/installation/icon-128x128.png",
          sizes: "128x128",
          type: "image/png"
      },
      {
          src: "theme/installation/icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
      },
      {
          src: "theme/installation/icon-152x152.png",
          sizes: "152x152",
          type: "image/png"
      },
      {
          src: "theme/installation/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
      },
      {
          src: "theme/installation/icon-256x256.png",
          sizes: "256x256",
          type: "image/png"
      }
  ],
  start_url: '/pacientes',
  display: 'standalone',
  background_color: '#116864',
  theme_color: '#1fbbab'
  }


module.exports = manifestContent