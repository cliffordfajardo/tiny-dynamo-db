module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true,
  testRegex: "((test|spec))\\.ts$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
