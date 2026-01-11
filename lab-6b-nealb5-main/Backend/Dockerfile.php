# Dockerfile.php
FROM php:7.2-apache
RUN docker-php-ext-install pdo pdo_mysql mysqli
COPY . /var/www/html/
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
