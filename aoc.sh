#!/bin/bash
# Add SESSION_COOKIE to .env file
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found."
    exit 1
fi
if [ "$#" -eq 0 ]; then
    CURRENT_YEAR=$(TZ="America/New_York" date +%Y)
    CURRENT_DAY=$(TZ="America/New_York" date +%-d)
    if [ "$(TZ="America/New_York" date +%m)" -ne 12 ] || [ "${CURRENT_DAY}" -lt 1 ] || [ "${CURRENT_DAY}" -gt 25 ]; then
        echo "Advent of Code has not started or the current day is not valid."
        exit 1
    fi
else
    CURRENT_YEAR="$1"
    CURRENT_DAY="$2"
fi
FOLDER="${CURRENT_YEAR}/${CURRENT_DAY}"
mkdir -p "${FOLDER}"
URL="https://adventofcode.com/${CURRENT_YEAR}/day/${CURRENT_DAY}/input"
curl -b "session=${SESSION_COOKIE}" "${URL}" -o "${FOLDER}/input"
if [ $? -eq 0 ]; then
    echo "Input downloaded successfully."
else
    echo "Failed to download input. Please check your session cookie and try again."
    exit 1
fi
echo "const input = require('fs').readFileSync('./${FOLDER}/input', 'utf-8').split('\n')" > "${FOLDER}/s.js"
echo "input.pop()" >> "${FOLDER}/s.js"
nvim s.js
