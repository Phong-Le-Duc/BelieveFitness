/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'believefitness-api.onrender.com',
        pathname: '/file-bucket/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/file-bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/file-bucket/**',
      },
    ],
  },
};

export default nextConfig;


// ERROR INVALID SRC PROP FOR NEXT IMAGE COMPONENT
// løsning fundet på https://stackoverflow.com/questions/64909447/got-an-error-invalid-src-prop-here-is-a-link-on-next-image-hostname-loca
