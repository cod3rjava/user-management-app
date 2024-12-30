FROM node:18-alpine

WORKDIR /user-management/

COPY package.json /user-management/

RUN npm install --force

COPY . .

CMD ["npm","start"]