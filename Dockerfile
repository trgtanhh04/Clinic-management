FROM node:18
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]