FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY ./backend /app/backend

# Install dependencies
RUN pip install -r /app/backend/requirements.txt

# Expose port 8000
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]