@echo off
echo Building React app for GitHub Pages deployment...

REM Build the React app
call npm run build

REM Copy 404.html to build directory (GitHub Pages will serve this for all non-root routes)
copy public\404.html build\

REM Copy CNAME to build directory for custom domain
copy public\CNAME build\

echo.
echo Build completed! Your app is ready for GitHub Pages deployment at build/
echo Domain: www.axiomweb.eu
echo The 404.html file will handle SPA routing for all client-side routes.
echo.
echo To deploy:
echo 1. Commit and push the build folder contents to your repository
echo 2. Enable GitHub Pages in repository settings
echo 3. Set source to main branch / root folder
echo.
pause