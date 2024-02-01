FROM node:18.18.2-alpine

#USER node
#RUN mkdir -p /app-backend && chown -R node:node /app-backend

WORKDIR /app-backend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# FROM node:18.18.2-alpine

# WORKDIR /app-backend

# COPY --from=builder /app-backend/build/src /app-backend/

# CMD ["npm", "run", "dev"]

CMD ["node", "build/src/server.js"]
