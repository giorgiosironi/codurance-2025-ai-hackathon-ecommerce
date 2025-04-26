.PHONY: dev test

dev:
	@echo "Setting up virtual environment and installing dependencies..."
	python3.10 -m venv venv
	. venv/bin/activate && pip install -r requirements.txt
	@echo "\nStarting Flask development server..."
	. venv/bin/activate && python app.py

test:
	. venv/bin/activate && python -m pytest tests/ -v

