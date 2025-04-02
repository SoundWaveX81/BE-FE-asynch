FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt


COPY myproject/manage.py .
COPY myproject/app ./app
COPY myproject/myproject ./myproject

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
