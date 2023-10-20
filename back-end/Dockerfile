FROM node:18.18.2

#USER node
#RUN mkdir -p /app-backend && chown -R node:node /app-backend

WORKDIR /app-backend

COPY package*.json ./
RUN npm install

COPY .eslintignore ./
COPY .eslintrc.json ./
COPY .sequelizerc ./
COPY tsconfig.json ./
