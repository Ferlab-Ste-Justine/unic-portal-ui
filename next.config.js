/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone', // Optimized for deployment on Docker
  webpack: (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((subRule) => {
          if (Array.isArray(subRule.use)) {
            subRule.use.forEach((loader) => {
              if (typeof loader === 'object' && loader.loader?.includes('css-loader') && loader.options?.modules) {
                loader.options.modules.mode = 'local'; // Change from "pure" to "local"
              }
            });
          }
        });
      }
    });
    return config;
  },
};

module.exports = nextConfig;
