FROM node:latest

WORKDIR /src

COPY . .

RUN npm install --force

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
