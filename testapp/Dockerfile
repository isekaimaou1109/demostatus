FROM node:lts
WORKDIR .
EXPOSE 8080
COPY . .
RUN npm install
CMD ["npm", "run", "serve"]