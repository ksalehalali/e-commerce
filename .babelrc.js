module.exports = {
  presets: [["next/babel"]],
  plugins: [
    ["import", { libraryName: "antd", style: true }],
    [
      "styled-components",
      {
        minify: false,
        ssr: true,
        pure: true,
        displayName: true,
        preprocess: false,
      },
    ],
    [
      "styless",
      {
        import: "./styles/variables.less",
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    ],
  ],
};
