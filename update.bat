@echo off
TITLE Update AI Horde Gateway
color 0B

echo =========================================
echo    Updating AI Horde Gateway
echo =========================================
echo.

echo [1/2] Pulling latest changes from GitHub...
call git pull origin main
echo.

echo [2/2] Updating Node.js dependencies...
call npm install
echo.

echo =========================================
echo    Update Complete! 
echo    You can now run start.bat
echo =========================================
pause
