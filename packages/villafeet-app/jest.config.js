//TODO: Increase coverage on src: **/src/(utils|components|etc)/**/*.{js}

module.exports = {
  testMatch: ['**/test/**/*__Test.js'],
  modulePaths: ['<rootDir>'],
  collectCoverage: true,
  collectCoverageFrom: [ '**/src/(utils)/**/*.{js}', '!**/src/App/**/*.js' ]
};