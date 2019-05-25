FROM nginx

COPY ./nginx-config/ /etc/nginx/

# test nginx config
RUN nginx -c /etc/nginx/nginx.conf -t