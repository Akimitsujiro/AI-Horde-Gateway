@echo off
TITLE AI Horde JanitorAI Gateway
color 0A

echo =========================================
echo    AI Horde to JanitorAI Gateway
echo =========================================
echo.

:: Check if node_modules exists, if not, install dependencies
if not exist "node_modules\" (
    echo [INFO] First time setup detected. Installing dependencies...
    echo.
    call npm install
    echo.
    echo [INFO] Dependencies installed successfully!
)

echo [INFO] Starting the Gateway Server...
echo.
call npm start

pause
