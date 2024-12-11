FROM node:18-slim
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]