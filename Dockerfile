FROM nginx

COPY ./nginx-config/ /etc/nginx/
COPY kubernetes/active-passive/check-readiness.sh /check-readiness.sh

# test nginx config
RUN nginx -c /etc/nginx/nginx.conf -t