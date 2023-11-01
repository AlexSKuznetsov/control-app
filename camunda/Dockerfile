# Base image
FROM camunda/camunda-bpm-platform:latest

# Set working directory
WORKDIR /camunda

# Remove example processes
RUN rm -r /camunda/webapps/camunda-invoice
# RUN rm -r /camunda/webapps/h2
RUN rm -r /camunda/webapps/examples

# Expose Camunda webapp port
EXPOSE 8080