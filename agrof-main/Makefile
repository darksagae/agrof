.PHONY: setup data train eval serve expo docker clean test help

# Default target
help:
	@echo "Available commands:"
	@echo "  setup   - Create virtual environment and install dependencies"
	@echo "  data    - Download and process PlantDoc dataset"
	@echo "  train   - Train the CNN model"
	@echo "  eval    - Evaluate model performance"
	@echo "  serve   - Start Flask development server"
	@echo "  expo    - Start Expo development server"
	@echo "  docker  - Build Docker image"
	@echo "  test    - Run unit tests"
	@echo "  clean   - Clean generated files"

# Setup virtual environment and install dependencies
setup:
	@echo "Setting up virtual environment..."
	python -m venv .venv
	@echo "Installing Python dependencies..."
	.venv/bin/pip install -r requirements.txt
	@echo "Installing mobile dependencies..."
	cd mobile/app && npm install
	@echo "Setup complete! Activate with: source .venv/bin/activate"

# Download and process dataset
data:
	@echo "Downloading PlantDoc dataset..."
	python src/data/download_plantdoc.py
	@echo "Processing dataset..."
	python src/data/ingest.py --src ~/dataset-ninja/PlantDoc --dst data/clean
	python src/data/split.py --src data/clean --dst data/splits
	@echo "Dataset processing complete!"

# Train the model
train:
	@echo "Training CNN model..."
	python src/models/train.py --data data/splits --out artifacts --epochs 60
	@echo "Training complete! Model saved to artifacts/best.pt"

# Evaluate model
eval:
	@echo "Evaluating model..."
	python src/models/eval.py --ckpt artifacts/best.pt --data data/splits
	@echo "Evaluation complete! Results saved to artifacts/"

# Start Flask development server
serve:
	@echo "Starting Flask development server..."
	MODEL_CKPT=artifacts/best.pt python src/api/app.py

# Start Expo development server
expo:
	@echo "Starting Expo development server..."
	cd mobile/app && npx expo start

# Build Docker image
docker:
	@echo "Building Docker image..."
	docker build -t crop-ai:latest .
	@echo "Docker image built successfully!"

# Run tests
test:
	@echo "Running unit tests..."
	pytest tests/ -v

# Clean generated files
clean:
	@echo "Cleaning generated files..."
	rm -rf artifacts/*
	rm -rf data/clean/*
	rm -rf data/splits/*
	rm -rf mobile/app/node_modules
	rm -rf .venv
	@echo "Clean complete!"

# Development workflow
dev: setup data train serve

# Full pipeline
pipeline: setup data train eval test
