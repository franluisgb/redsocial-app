FROM node:18.19.0

WORKDIR /app

COPY package.json .

RUN npm install

# Install wait-for-it
RUN apt-get update && apt-get install -y wait-for-it

COPY . .

EXPOSE 3000

# CMD ["npm", "start"]
CMD ["bash", "-c", "wait-for-it postgres-db:5432 && npx prisma migrate dev --name init && npm start"]