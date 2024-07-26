###################
# BUILD FOR DEVELOPMENT
###################

FROM node:20.15.1 As development

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
# COPY --chown=node:node package*.json ./
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm install

# Bundle app source
# COPY --chown=node:node . .
COPY . .

# Use the node user from the image (instead of the root user)
# USER node

RUN npm run build

# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]