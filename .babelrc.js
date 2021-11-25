module.exports = {
  presets: [["next/babel"]],
  plugins: [
    ["import", { libraryName: "antd", style: true }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@store": "./store",
          "@styles": "./styles",
          "@components": "./components",
        },
      },
    ],
  ],
};