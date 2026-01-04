set -e

echo "Starting..."
echo "If docker-compose fails, make sure you have Docker installed and running."

# Start services
docker compose up --build