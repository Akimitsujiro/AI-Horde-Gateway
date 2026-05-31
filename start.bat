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

:: Check if .env exists, if not, create it
if not exist ".env" (
    echo [INFO] Creating default .env file...
    echo AI_HORDE_API_KEY=0000000000> .env
    echo OPENROUTER_API_KEY=>> .env
    echo [INFO] .env file created. Please add your OpenRouter API key if using OpenRouter.
    echo.
)

:MENU
echo Please select a Gateway Service:
echo 1. AI Horde
echo 2. OpenRouter
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    set GATEWAY_SERVICE=aihorde
    goto START_SERVER
)
if "%choice%"=="2" (
    set GATEWAY_SERVICE=openrouter
    goto START_SERVER
)

echo Invalid choice. Please try again.
goto MENU

:START_SERVER
echo.
echo [INFO] Starting the Gateway Server using %GATEWAY_SERVICE%...
echo.
call npm start

pause
