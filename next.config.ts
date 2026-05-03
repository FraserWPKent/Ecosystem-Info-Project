import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://static.inaturalist.org/photos/**'), new URL('https://inaturalist-open-data.s3.amazonaws.com/photos/**')],
  },
}

export default nextConfig;
