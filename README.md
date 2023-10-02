# Minimart Online Store

## Overview

This repo contains all the components required to set up an online store for Uncle Jack's minimart. The project will be done in phases. At current implmentation, the functionalities are as follows.

- Admin Landing Page
  - A list of all the products stored in the database
  - Product information at a glance includes: 'Name', 'Description', 'Price', 'Image'
  - Buttons to 'edit' or 'delete' a specific product
- Admin Product Page
  - Form that enables adding of a new product
  - Form that enables editing any of a product's details
  - All changes are saved to the database

## Instructions

### Setting Up

At the root of the folder (same directory as `docker-compose.yml`), run the following command to build the new images for the first time and to start all the containers.

```shell
docker-compose up --build -d
```

There should be 4 containers up and running after all the initial setup is done. This can be checked using `docker ps`.
- backend
- frontend
- postgres
- minio

_*Note: The **mc** service is only used to create the '_images_' bucket and to upload the initial 5 product images. The service will eventually be 'terminated'._

To ensure that there are no external dependencies and to have a working demo out-of-the-box, the docker images used are the default images, with custom configurations to populate the postgres database ('_store_') with the initial 5 products and also their corresponding images in the Minio bucket ('_images_').

To access the UI, navigate to the url `http://localhost:3000`. This will direct the user to the 'Admin Landing Page' with a list of all the 5 'default' products.

It is also possible to access the MinIO Console via the web browser by navigating to the url `http://localhost:9001`. The login credentials can be found in the `docker-compose.yml` file under the **minio** service section. Similarly, the postgres database credentials can also be found under the **postgres** service section.

If the initial loading of the data is not successful, run the script located at `./script/populate_table.sh` to insert the 5 product details in the postgres database. Separately, images can also be manually uploaded in the MinIO bucket via the MinIO Console.

To explore the functionality contained within the Admin Landing Page, there are additional images stored under `./data/images` (_eg. redbull.jpg, greentea.jpg, guava.jpg_), which the user can utilise when Adding or Editing a Product.


### Shutting Down

Both the database and MinIO object data are stored in named volumes as declared in the `docker-compose.yml` file. To completely terminate all containers and remove all persistent data, run the command:

```shell
docker-compose down -v
```