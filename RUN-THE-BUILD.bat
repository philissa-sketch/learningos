@echo off
REM ---------------------------------------------------------------------------
REM Builds LearningOS the same way Netlify will, and keeps the output on screen.
REM
REM This is the one step that cannot be run from the Claude session: it needs
REM the Windows build tools installed in node_modules here.
REM
REM WHAT TO LOOK FOR WHEN IT FINISHES
REM
REM   1. "built in Ns" with no error above it.
REM   2. The line for dist/assets/index-*.js. It was 4,866 kB. It should now be
REM      MUCH smaller, because one Academy's curriculum is no longer inside it.
REM   3. A separate chunk for the Academy — a large file whose name starts with
REM      "content-". That is the curriculum, split out so a learner downloads
REM      only their own.
REM
REM If it fails, copy the error and paste it back into the conversation.
REM ---------------------------------------------------------------------------

cd /d "%~dp0"

echo.
echo Building LearningOS...
echo.

call npm run build

echo.
echo ---------------------------------------------------------------------------
echo Build finished. Read the sizes above before pushing.
echo ---------------------------------------------------------------------------
echo.
pause
