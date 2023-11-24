FROM node:16-alpine AS development

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]


