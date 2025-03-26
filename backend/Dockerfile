# python runtime as a parent image

FROM python:3.9

# working dir in the container

WORKDIR /app

# copy current dir contents into the container

COPY . /app

# install dependencies

RUN pip install -r requirements.txt

# Expose port 5000
EXPOSE 5000

# command to run the Flask app

CMD ["python", "app.py"]

