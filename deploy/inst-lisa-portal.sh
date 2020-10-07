#!/usr/bin/env bash
set -x

# run build
if ! npm run build ; then
    echo "npm is not installed"
    exit
fi

# move assets to the httpd DocumentRoot
if [[ ! -d /var/www/html/lisa-portal ]]; then
    sudo mkdir -p /var/www/html/lisa-portal
fi

# copy assets to the system
sudo cp -rf build/* /var/www/html/lisa-portal/

# set permissions on DocumentRoot and assets
sudo chmod -R g+w /var/www/html
sudo chmod g+s /var/www/html

# restart httpd
sudo systemctl restart httpd
sudo systemctl status  httpd
