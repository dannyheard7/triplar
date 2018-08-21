FROM ubuntu
MAINTAINER Danny Heard version: 0.1
RUN apt update 
RUN apt install -y python3.6 python3-pip python3-setuptools python3-wheel

# set python 3 as the default python version
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1 \
    && update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1
RUN pip3 install --upgrade pip requests setuptools pipenv

RUN apt install -y binutils libproj-dev gdal-bin libsqlite3-mod-spatialite

RUN apt install -y curl && curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt install -y nodejs


