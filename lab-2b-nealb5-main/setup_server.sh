#!/bin/bash

sudo apt update -y && sudo apt upgrade -y
sudo apt install apache2 -y
sudo service apache2 start
sudo service apache2 status
sudo chown -R $USER:$USER /var/www
cd /var/www
rm -rf html
git clone https://github.com/BYU-ITC-210/lab-2b-nealb5.git
ln -s lab-2b-nealb5/src html
cd /etc/apache2/sites-available
sudo cp 000-default.conf it210_lab.conf
sudo a2dissite 000-default.conf
sudo a2ensite it210_lab.conf
sudo service apache2 reload
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --apache
sudo chown -R ubuntu /etc/letsencrypt
