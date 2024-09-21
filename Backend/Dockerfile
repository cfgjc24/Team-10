# Use Python 3.8 Alpine as the base image
FROM python:3.8-alpine

# Copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt

# Switch working directory
WORKDIR /app

# Install the dependencies and packages from the requirements file
RUN pip install -r requirements.txt

# Copy every content from the local file to the image
COPY . /app

# expose port 8080 internally to map to port 80 
EXPOSE 8080

# Configure the container to run the app
ENTRYPOINT [ "python" ]

CMD ["app.py" ]
