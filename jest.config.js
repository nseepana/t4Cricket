module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ["<rootDir>/src/jest-setup.js"]
};
