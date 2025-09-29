# GitHub Pages Deployment Script for Single Page Application

# Build the React app
npm run build

# Copy 404.html to build directory (GitHub Pages will serve this for all non-root routes)
cp public/404.html build/

# Copy CNAME to build directory for custom domain
cp public/CNAME build/

echo "Build completed! Your app is ready for GitHub Pages deployment at build/"
echo "Domain: www.axiomweb.eu"
echo "The 404.html file will handle SPA routing for all client-side routes."