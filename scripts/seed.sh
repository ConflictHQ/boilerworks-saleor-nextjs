#!/usr/bin/env bash
set -euo pipefail

# Seed Saleor with sample data for development
# Usage: ./scripts/seed.sh
# Or via Make: make seed
#
# This runs Saleor's built-in populatedb command which creates:
# - Default channel (default-channel, USD)
# - Product types and attributes
# - Sample products with variants and pricing
# - Categories and collections
# - Warehouse with stock
# - Shipping zones and methods
# - Staff user (admin@example.com / admin)
# - Sample customer accounts

COMPOSE_DIR="$(cd "$(dirname "$0")/../docker" && pwd)"

echo "==> Waiting for Saleor API to be healthy..."
until docker compose -f "$COMPOSE_DIR/docker-compose.yml" exec -T api curl -sf http://localhost:8000/health/ > /dev/null 2>&1; do
  echo "    Waiting..."
  sleep 3
done
echo "==> Saleor API is healthy"

echo "==> Running migrations..."
docker compose -f "$COMPOSE_DIR/docker-compose.yml" exec -T api python manage.py migrate --noinput

echo "==> Populating database with sample data..."
docker compose -f "$COMPOSE_DIR/docker-compose.yml" exec -T api python manage.py populatedb \
  --createsuperuser \
  --withoutimages

echo ""
echo "==> Seed complete!"
echo ""
echo "  Saleor API:     http://localhost:8000/graphql/"
echo "  Saleor Dashboard: http://localhost:9003/"
echo "  Storefront:     http://localhost:3000/"
echo "  Mailpit:        http://localhost:8025/"
echo ""
echo "  Admin login:    admin@example.com / admin"
echo ""
