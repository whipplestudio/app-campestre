#!/bin/bash
set -e

echo "Building application for production..."
cd /var/app/staging
npm run build
