FROM node:16

# Set Variables
ENV TZ "America/Anchorage"

# Install Packages
WORKDIR /usr/app
COPY messenger-app-backend/package.json /usr/app/
COPY messenger-app-backend/package-lock.json /usr/app/
RUN npm install

# Copy Client
COPY messenger-app-backend/ /usr/app/

# Expose Ports
EXPOSE 80
CMD [ "node", "index.js" ]
