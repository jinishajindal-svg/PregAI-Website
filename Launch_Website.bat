@echo off
echo ===================================================
echo   Launching PregAI EHG Dashboard (Version 1.0)
echo ===================================================
echo.
echo Opening standalone dashboard in your default browser...
start "" "%~dp0PregAI_Dashboard.html"
echo.
echo Standalone dashboard opened!
echo.
echo Starting local development server for live simulation...
start http://localhost:5173/
npm.cmd run dev
pause
