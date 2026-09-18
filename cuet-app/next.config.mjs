/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      'pdf-parse',
      '@langchain/openai',
      '@langchain/core',
      '@langchain/textsplitters',
      '@langchain/pinecone',
      'langchain',
    ],
  },

};

export default nextConfig;

