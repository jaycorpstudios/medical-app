module.exports = {
  roots: ['<rootDir>/__tests__'],
  transformIgnorePatterns: [],

  moduleDirectories: ['node_modules'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: ['src/**/*.{js}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
}
