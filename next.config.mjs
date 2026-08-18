/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1. Redireccionar posts antiguos alojados bajo /puebla/ hacia la nueva estructura global /blog/
      {
        source: "/puebla/por-que-tu-negocio-en-puebla-necesita-una-pagina-web",
        destination: "/blog/por-que-tu-negocio-en-puebla-necesita-una-pagina-web",
        permanent: true,
      },
      {
        source: "/puebla/por-que-tu-negocio-en-puebla-necesita-una-pagina-web/",
        destination: "/blog/por-que-tu-negocio-en-puebla-necesita-una-pagina-web",
        permanent: true,
      },
      // 2. Redireccionar archivos subidos y multimedia al subdominio wp.aliedigital.com para no perder indexación de imágenes
      {
        source: "/wp-content/uploads/:path*",
        destination: "https://wp.aliedigital.com/wp-content/uploads/:path*",
        permanent: true,
      },
      // 3. Redireccionar accesos administrativos al subdominio de WordPress
      {
        source: "/wp-login.php",
        destination: "https://wp.aliedigital.com/wp-login.php",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "https://wp.aliedigital.com/wp-admin/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
