module.exports = {
    verbose: true,
    // 是否显示覆盖率报告
    collectCoverage: true,
    // 告诉 jest 哪些文件需要经过单元测试测试
    collectCoverageFrom: [
        "src/**/*.{js,ts}",
        '!**/node_modules/**',
    ],
    testEnvironment: "jsdom",
    transform: {
        // 将.js后缀的文件使用babel-jest处理
        "^.+\\.(js|jsx)$": "babel-jest",
        // "^.+\\.(ts|tsx)$": "ts-jest"
    },
    modulePaths: [
        "<rootDir>"
    ]
}