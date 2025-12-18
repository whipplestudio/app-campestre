#!/bin/bash
set -e

echo "Installing dependencies..."
cd /var/app/staging
npm ci --production=false
