FROM node:18.18.2-alpine

#USER node
#RUN mkdir -p /app-backend && chown -R node:node /app-backend

WORKDIR /app-backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]