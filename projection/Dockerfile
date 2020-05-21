FROM node:14.0.0

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
#COPY . .

EXPOSE 9090
CMD [ "npm", "start" ]