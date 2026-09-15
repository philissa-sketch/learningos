@echo off
setlocal

REM ===========================================================================
REM  FIX-WINDOWS-IMPORTS.bat
REM
REM  Double-click this. It shows you what WOULD change, then asks before
REM  changing anything.
REM
REM  What it fixes: 37 of the 65 check scripts build a dynamic import by gluing
REM  a Windows path onto a string, which Node rejects on Windows as URL scheme
REM  'c:'. Those 37 checks have never been able to run on this computer.
REM
REM  Safety: the codemod syntax-checks all 37 rewritten files in a temp folder
REM  BEFORE writing a single one, and aborts the whole run without writing
REM  anything if any file fails to parse. All-or-nothing.
REM
REM  It touches no git. GitHub Desktop will show you the full diff afterwards.
REM ===========================================================================

cd /d "%~dp0"

if not exist "%~dp0scripts\fix-windows-imports.mjs" (
  echo.
  echo   ERROR: scripts\fix-windows-imports.mjs is not here.
  echo   This file must sit in the learningos folder root.
  echo.
  pause
  exit /b 1
)

echo.
echo ===========================================================
echo   STEP 1 of 2 - DRY RUN. Nothing will be changed.
echo ===========================================================
echo.

node "%~dp0scripts\fix-windows-imports.mjs"
if errorlevel 1 (
  echo.
  echo   The dry run reported a problem. Nothing was changed.
  echo.
  pause
  exit /b 1
)

echo.
echo ===========================================================
echo   STEP 2 of 2 - APPLY?
echo ===========================================================
echo.
echo   Everything above is what WOULD be rewritten.
echo   Nothing has changed yet.
echo.
set "GO="
set /p "GO=  Type  yes  and press Enter to apply (anything else cancels): "

if /i not "%GO%"=="yes" (
  echo.
  echo   Cancelled. Nothing was changed.
  echo.
  pause
  exit /b 0
)

echo.
node "%~dp0scripts\fix-windows-imports.mjs" --write
if errorlevel 1 (
  echo.
  echo   ABORTED. Nothing was written - see the message above.
  echo.
  pause
  exit /b 1
)

echo.
echo ===========================================================
echo   Done. Next: run RUN-THE-CHECKS.bat
echo          pick petal-pestle-academy, then ALL checks.
echo ===========================================================
echo.
pause
endlocal
