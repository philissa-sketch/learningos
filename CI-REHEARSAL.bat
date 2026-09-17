@echo off
setlocal enabledelayedexpansion
REM ===========================================================================
REM  CI-REHEARSAL.bat  --  builds your LAST COMMIT the way Netlify will,
REM  on this computer, for free.
REM
REM  1. Commit in GitHub Desktop first (do NOT push yet).
REM  2. Double-click this file.
REM  3. It copies the last commit into a fresh temp folder -- only what Git
REM     tracks, exactly what Netlify receives -- installs, and runs
REM     "npm run build", which runs the build gate first.
REM  4. Read the last lines. "Gate green" plus "built in" = safe to push.
REM     "BUILD STOPPED" = do not push; send the results file back.
REM
REM  What this cannot catch: Netlify runs Linux, where file names are
REM  case-sensitive. Windows is not.
REM
REM  NO CHANGES to your working folder except the results file.
REM ===========================================================================

cd /d "%~dp0"

set "GIT="
where git >nul 2>&1 && set "GIT=git"
if "%GIT%"=="" (
  for /d %%D in ("%LOCALAPPDATA%\GitHubDesktop\app-*") do (
    if exist "%%D\resources\app\git\cmd\git.exe" set "GIT=%%D\resources\app\git\cmd\git.exe"
  )
)
if "%GIT%"=="" (
  echo.
  echo   Could not find Git. In GitHub Desktop choose
  echo   Repository ^> Open in Command Prompt, then type:  CI-REHEARSAL.bat
  echo.
  pause
  exit /b 1
)

for /f %%d in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd-HHmm"') do set "STAMP=%%d"
set "WORK=%TEMP%\learningos-rehearsal-%STAMP%"
set "OUT=%~dp0CHECK-RESULTS-rehearsal-%STAMP%.txt"

echo.
echo   Copying the last commit to %WORK% ...
"%GIT%" clone --quiet "%~dp0." "%WORK%"
if errorlevel 1 (
  echo   Copy failed. Nothing was built.
  pause
  exit /b 1
)

pushd "%WORK%"
> "%OUT%" echo LearningOS CI rehearsal
>>"%OUT%" echo When   : %DATE% %TIME%
>>"%OUT%" echo Commit :
"%GIT%" log -1 --format="%%h %%s" >>"%OUT%" 2>&1
node --version >>"%OUT%" 2>&1
>>"%OUT%" echo.

echo   Installing (a minute or two) ...
call npm ci >>"%OUT%" 2>&1
if errorlevel 1 (
  echo   Install failed -- see the results file.
  goto DONE
)

echo   Running the build gate and the build (several minutes) ...
call npm run build >>"%OUT%" 2>&1
if errorlevel 1 (
  echo.
  echo   ==========  BUILD STOPPED -- do not push  ==========
  >>"%OUT%" echo.
  >>"%OUT%" echo ===== REHEARSAL RESULT: STOPPED
) else (
  echo.
  echo   ==========  GREEN -- safe to push  ==========
  >>"%OUT%" echo.
  >>"%OUT%" echo ===== REHEARSAL RESULT: GREEN
)

:DONE
popd
rmdir /s /q "%WORK%" >nul 2>&1
echo.
echo   Results: %OUT%
echo.
powershell -NoProfile -Command "Get-Content -Tail 25 '%OUT%'"
echo.
pause
endlocal
