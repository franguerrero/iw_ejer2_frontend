FROM mongo

COPY admin_clients.json /admin_clients.json
CMD mongoimport --host mongo-db --db iw --collection admin_clients --type json --file /admin_clients.json --jsonArray