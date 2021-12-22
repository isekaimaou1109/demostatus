FROM node:lts
WORKDIR .
EXPOSE 8080
COPY . .
CMD ["npm", "start"]