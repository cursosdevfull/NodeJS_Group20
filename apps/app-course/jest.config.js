const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>/src/', '<rootDir>/test/'],
    bail: true,
    verbose: true,
    setupFilesAfterEnv: ['jest-extended'],
    reporters: [
        "default",
        [
            "jest-html-reporters",
            {
                publicPath: "reports",
                filename: "test.v2.html",
            },
        ],
        [
            "jest-html-reporter",
            {
                pageTitle: "Test API",
                outputPath: "reports/test.v1.html",
            },
        ],
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!**/node_modules/**',
        '!src/**/*.entity.ts',
    ],
    coverageReporters: ["json", "text", "html", 'lcov'],
    coverageDirectory: "reports/coverage",
    testPathIgnorePatterns: ["/node_modules/"],
    testMatch: ['<rootDir>/test/**/*.spec.ts'],
    preset: "ts-jest",
};
