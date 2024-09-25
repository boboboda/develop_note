/** @type {import('next').NextConfig} */
const NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.scss": {
          loaders: ["sass-loader"],
          as: "*.css",
        },
      },
    }
  }
};

module.exports = NextConfig;
