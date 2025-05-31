FROM python:3.13.2-slim

WORKDIR /app
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# server/ at /app/server
COPY api/ ./api/

WORKDIR /app/api

EXPOSE 8000

CMD ["python3", "main.py"]