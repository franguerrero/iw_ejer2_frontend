const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#003A8D",
              "@heading-color": "rgba(70, 70, 85, 1)",
              "@text-color": "rgba(70, 70, 85, 1)",
              "@text-color-secondary": "rgba(70, 70, 85, 0.72)",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
