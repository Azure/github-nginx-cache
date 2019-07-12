FROM nginx

RUN apt-get update; apt-get install -y curl

COPY ./nginx-config/ /etc/nginx/
COPY kubernetes/active-passive/check-readiness.sh /check-readiness.sh

# test nginx config
RUN nginx -c /etc/nginx/nginx.conf -t