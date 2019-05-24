FROM nginx

COPY ./nginx-config/*.conf /etc/nginx/

# test nginx config
RUN nginx -c /etc/nginx/nginx.conf -t