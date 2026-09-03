@echo off
title LearningOS
cd /d "%~dp0"

echo.
echo   ============================================
echo    LEARNINGOS
echo   ============================================
echo.

REM `>nul`, not `>/dev/null` — this is a Windows batch file, and the Unix form
REM made every launch print "The system cannot find the path specified." above
REM the startup banner. The check itself always worked; it just shouted first.
where node >nul 2>nul
if errorlevel 1 (
  echo   Node.js is not installed on this computer.
  echo   Download it from https://nodejs.org  ^(pick the LTS button^),
  echo   install it, then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo   First-time setup. This downloads what the app needs.
  echo   It takes a few minutes, and only happens once.
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo   Setup failed. Check the internet connection and try again.
    pause
    exit /b 1
  )
)

echo   Starting up. Your browser will open on its own.
echo.
echo   Leave this black window OPEN while you work.
echo   Closing it shuts the app down.
echo.
echo   NOTE: this local copy keeps its OWN records, separate from
echo   the website. Use it only when the internet is out.
echo.
call npm run dev

echo.
echo   LearningOS has stopped. You can close this window.
pause
