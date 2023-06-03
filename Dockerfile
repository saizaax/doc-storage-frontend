# Install dependencies and build
FROM node:17-alpine as builder

WORKDIR /doc-storage-frontend
COPY . .

RUN npm ci 
RUN npm run build

# Bundle static assets with nginx
FROM nginx:alpine as production
ENV NODE_ENV production

COPY --from=builder /doc-storage-frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4044

CMD ["nginx", "-g", "daemon off;"]