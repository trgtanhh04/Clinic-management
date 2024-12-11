FROM node:18-alpine3.20
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]