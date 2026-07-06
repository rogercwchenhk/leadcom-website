@echo off
echo.
echo Starting Leadcom website local server...
echo Open http://localhost:8000 in your browser
echo Press Ctrl+C to stop
echo.
cd /d "C:\Users\Lenovo\Claude\Projects\leadcom-website"
python -m http.server 8000
pause
