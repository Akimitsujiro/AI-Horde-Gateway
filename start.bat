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
    goto OPENROUTER_MODEL_MENU
)

echo Invalid choice. Please try again.
goto MENU

:OPENROUTER_MODEL_MENU
echo.
echo Please select an OpenRouter Model:
echo 1. google/gemini-3.5-flash
echo 2. google/gemini-3.1-flash-lite
echo 3. x-ai/grok-4.3
echo 4. deepseek/deepseek-v4-pro
echo 5. xiaomi/mimo-v2.5-pro
echo 6. moonshotai/kimi-k2.6
echo 7. anthropic/claude-opus-4.7
echo 8. z-ai/glm-5.1
echo 9. google/gemma-4-26b-a4b-it
echo 10. google/gemma-4-31b-it
echo 11. nvidia/nemotron-3-super-120b-a12b:free
echo 12. deepseek/deepseek-v3.2
echo 13. openai/gpt-oss-120b:free
echo 14. z-ai/glm-4.5-air:free
echo 15. deepseek/deepseek-r1-0528
echo 16. z-ai/glm-4.5-air
echo 17. qwen/qwen3-235b-a22b-2507
echo 18. meta-llama/llama-4-maverick
echo 19. mistralai/mistral-nemo
echo 20. openai/gpt-4o-mini
echo 21. minimax/minimax-m2.7
echo 22. x-ai/grok-4.20
echo 23. thedrummer/unslopnemo-12b
echo 24. meta-llama/llama-3.3-70b-instruct:free
echo 25. sao10k/l3-lunaris-8b
echo 26. anthropic/claude-3.5-haiku
echo 27. deepseek/deepseek-r1
echo 28. mistralai/ministral-14b-2512
echo 29. mistralai/mistral-large
echo 30. Enter your Custom Model ID
echo.
set /p model_choice="Enter your choice (1-30): "

if "%model_choice%"=="1" set OPENROUTER_MODEL=google/gemini-3.5-flash& goto START_SERVER
if "%model_choice%"=="2" set OPENROUTER_MODEL=google/gemini-3.1-flash-lite& goto START_SERVER
if "%model_choice%"=="3" set OPENROUTER_MODEL=x-ai/grok-4.3& goto START_SERVER
if "%model_choice%"=="4" set OPENROUTER_MODEL=deepseek/deepseek-v4-pro& goto START_SERVER
if "%model_choice%"=="5" set OPENROUTER_MODEL=xiaomi/mimo-v2.5-pro& goto START_SERVER
if "%model_choice%"=="6" set OPENROUTER_MODEL=moonshotai/kimi-k2.6& goto START_SERVER
if "%model_choice%"=="7" set OPENROUTER_MODEL=anthropic/claude-opus-4.7& goto START_SERVER
if "%model_choice%"=="8" set OPENROUTER_MODEL=z-ai/glm-5.1& goto START_SERVER
if "%model_choice%"=="9" set OPENROUTER_MODEL=google/gemma-4-26b-a4b-it& goto START_SERVER
if "%model_choice%"=="10" set OPENROUTER_MODEL=google/gemma-4-31b-it& goto START_SERVER
if "%model_choice%"=="11" set OPENROUTER_MODEL=nvidia/nemotron-3-super-120b-a12b:free& goto START_SERVER
if "%model_choice%"=="12" set OPENROUTER_MODEL=deepseek/deepseek-v3.2& goto START_SERVER
if "%model_choice%"=="13" set OPENROUTER_MODEL=openai/gpt-oss-120b:free& goto START_SERVER
if "%model_choice%"=="14" set OPENROUTER_MODEL=z-ai/glm-4.5-air:free& goto START_SERVER
if "%model_choice%"=="15" set OPENROUTER_MODEL=deepseek/deepseek-r1-0528& goto START_SERVER
if "%model_choice%"=="16" set OPENROUTER_MODEL=z-ai/glm-4.5-air& goto START_SERVER
if "%model_choice%"=="17" set OPENROUTER_MODEL=qwen/qwen3-235b-a22b-2507& goto START_SERVER
if "%model_choice%"=="18" set OPENROUTER_MODEL=meta-llama/llama-4-maverick& goto START_SERVER
if "%model_choice%"=="19" set OPENROUTER_MODEL=mistralai/mistral-nemo& goto START_SERVER
if "%model_choice%"=="20" set OPENROUTER_MODEL=openai/gpt-4o-mini& goto START_SERVER
if "%model_choice%"=="21" set OPENROUTER_MODEL=minimax/minimax-m2.7& goto START_SERVER
if "%model_choice%"=="22" set OPENROUTER_MODEL=x-ai/grok-4.20& goto START_SERVER
if "%model_choice%"=="23" set OPENROUTER_MODEL=thedrummer/unslopnemo-12b& goto START_SERVER
if "%model_choice%"=="24" set OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free& goto START_SERVER
if "%model_choice%"=="25" set OPENROUTER_MODEL=sao10k/l3-lunaris-8b& goto START_SERVER
if "%model_choice%"=="26" set OPENROUTER_MODEL=anthropic/claude-3.5-haiku& goto START_SERVER
if "%model_choice%"=="27" set OPENROUTER_MODEL=deepseek/deepseek-r1& goto START_SERVER
if "%model_choice%"=="28" set OPENROUTER_MODEL=mistralai/ministral-14b-2512& goto START_SERVER
if "%model_choice%"=="29" set OPENROUTER_MODEL=mistralai/mistral-large& goto START_SERVER
if "%model_choice%"=="30" goto CUSTOM_MODEL

echo Invalid choice. Please try again.
goto OPENROUTER_MODEL_MENU

:CUSTOM_MODEL
set /p OPENROUTER_MODEL="Enter your custom OpenRouter Model ID: "
goto START_SERVER

:START_SERVER
echo.
echo [INFO] Starting the Gateway Server using %GATEWAY_SERVICE%...
echo.
call npm start

pause
