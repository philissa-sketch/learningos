@echo off
setlocal enabledelayedexpansion

REM ===========================================================================
REM  RUN-THE-CHECKS.bat  --  runs the verify suite on THIS computer.
REM
REM  Why this exists: the agent-side shell cannot reach the folders at the
REM  moment, so it cannot run the checks itself. The rule is that checks run on
REM  this machine, not in a sandbox. This runs them here, with this machine's
REM  Node, and writes everything to one text file to send back.
REM
REM  JUST DOUBLE-CLICK IT. It asks which Academy and which checks.
REM  It NEVER guesses an Academy -- the earlier version defaulted to lamar when
REM  double-clicked, which ran the wrong school.
REM
REM  From a terminal you can still skip the questions:
REM      RUN-THE-CHECKS.bat petal-pestle-academy merge
REM      RUN-THE-CHECKS.bat lamar all
REM
REM  NO GIT COMMANDS. This script never touches .git, so it cannot strand a
REM  lock the way an agent-side git call does.
REM ===========================================================================

cd /d "%~dp0"

if not exist "%~dp0src\academies" (
  echo.
  echo   ERROR: no src\academies here.
  echo   This file must sit in the learningos folder root, beside RUN-THE-BUILD.bat.
  echo.
  pause
  exit /b 1
)

set "ACAD=%~1"
set "MODE=%~2"

if not "%ACAD%"=="" goto HAVEACAD

REM ---- ask which Academy, listing the folders that actually exist ----------
echo.
echo ============================================
echo   Which Academy should the checks run for?
echo ============================================
echo.
set /a N=0
for /d %%D in ("%~dp0src\academies\*") do (
  set "NAME=%%~nxD"
  if /i not "!NAME!"=="_template" (
    set /a N+=1
    set "OPT!N!=!NAME!"
    echo     !N!^)  !NAME!
  )
)
echo.
if %N%==0 (
  echo   ERROR: no Academy folders found under src\academies.
  pause
  exit /b 1
)
set "PICK="
set /p "PICK=  Enter a number and press Enter: "
call set "ACAD=%%OPT%PICK%%%"
if "%ACAD%"=="" (
  echo.
  echo   "%PICK%" is not one of the numbers above. Nothing was run.
  echo.
  pause
  exit /b 1
)

:HAVEACAD
if not exist "%~dp0src\academies\%ACAD%" (
  echo.
  echo   ERROR: no folder src\academies\%ACAD%
  echo.
  pause
  exit /b 1
)

if not "%MODE%"=="" goto HAVEMODE

echo.
echo ============================================
echo   Which checks, for %ACAD%?
echo ============================================
echo.
echo     1^)  merge checks only   ^(10 checks, about a minute^)
echo     2^)  all checks          ^(the whole suite, several minutes^)
echo.
set "MPICK="
set /p "MPICK=  Enter 1 or 2 and press Enter: "
if "%MPICK%"=="1" set "MODE=merge"
if "%MPICK%"=="2" set "MODE=all"
if "%MODE%"=="" (
  echo.
  echo   Not 1 or 2. Nothing was run.
  echo.
  pause
  exit /b 1
)

:HAVEMODE
for /f %%d in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set "STAMP=%%d"
if "%STAMP%"=="" set "STAMP=undated"
set "OUT=%~dp0CHECK-RESULTS-%ACAD%-%MODE%-%STAMP%.txt"

set /a PASS=0
set /a FAIL=0
set "FAILED="

echo.
echo   Academy : %ACAD%
echo   Checks  : %MODE%
echo   Results : %OUT%
echo.

> "%OUT%" echo LearningOS check run
>>"%OUT%" echo Academy : %ACAD%
>>"%OUT%" echo Mode    : %MODE%
>>"%OUT%" echo When    : %DATE% %TIME%
>>"%OUT%" echo Folder  : %~dp0
>>"%OUT%" echo.
node --version >>"%OUT%" 2>&1
>>"%OUT%" echo.

if /i "%MODE%"=="merge" goto MERGELIST
goto ALLLIST

:MERGELIST
REM The ten that answer "is the merge safe to finish".
for %%N in (
  verify-parses
  verify-script-imports
  verify-thin-boot
  verify-content-interface
  verify-content-pack
  verify-slot-theme
  verify-nav-declared
  verify-academy-reach
  verify-academy
  verify-front-door
  verify-three-doors
) do call :RUNONE "%~dp0scripts\%%N.mjs" "%%N"
goto REPORT

:ALLLIST
for %%F in ("%~dp0scripts\verify-*.mjs") do call :RUNONE "%%~F" "%%~nF"
goto REPORT

:RUNONE
set "SCRIPT=%~1"
set "NAME=%~2"
if not exist "%SCRIPT%" (
  echo   SKIP  %NAME%  ^(file not found^)
  >>"%OUT%" echo ===== SKIP %NAME% -- file not found
  goto :eof
)
<nul set /p "=  .... %NAME%"
>>"%OUT%" echo.
>>"%OUT%" echo =========================================================
>>"%OUT%" echo ===== %NAME%   ^(ACADEMY=%ACAD%^)
>>"%OUT%" echo =========================================================
set "ACADEMY=%ACAD%"
node "%SCRIPT%" >>"%OUT%" 2>&1
if errorlevel 1 (
  set /a FAIL+=1
  set "FAILED=!FAILED! !NAME!"
  echo   -- FAIL
  >>"%OUT%" echo ----- RESULT: FAIL
) else (
  set /a PASS+=1
  echo   -- pass
  >>"%OUT%" echo ----- RESULT: pass
)
goto :eof

:REPORT
echo.
echo ==========================================
echo   Academy : %ACAD%
echo   passed  : !PASS!
echo   failed  : !FAIL!
if not "!FAILED!"=="" echo   failing :!FAILED!
echo ==========================================
echo.
>>"%OUT%" echo.
>>"%OUT%" echo =========================================================
>>"%OUT%" echo ===== SUMMARY   ACADEMY=%ACAD%  MODE=%MODE%
>>"%OUT%" echo =========================================================
>>"%OUT%" echo passed : !PASS!
>>"%OUT%" echo failed : !FAIL!
>>"%OUT%" echo failing:!FAILED!

echo   Send this file back:
echo     %OUT%
echo.
pause
endlocal
