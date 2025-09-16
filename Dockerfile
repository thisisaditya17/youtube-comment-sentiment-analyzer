# Use Python 3.12 explicitly  
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies with precompiled wheels only
RUN pip install --upgrade pip setuptools wheel
RUN pip install --only-binary=all --find-links https://download.pytorch.org/whl/cpu torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip install --only-binary=all -r requirements.txt

# Copy the entire project
COPY . .

# Create a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Expose the port
EXPOSE $PORT

# Change to backend directory and run gunicorn
CMD cd backend && gunicorn --bind 0.0.0.0:$PORT --workers 2 app:app
