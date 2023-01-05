FROM nginx:1.21.1 AS runtime
EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN useradd --uid $(shuf -i 30000-65000 -n 1) FrontEnd
WORKDIR /wwwroot/
COPY ./dist .
