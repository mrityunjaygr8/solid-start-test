/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0c70t3xr00y5mo9",
    "created": "2024-11-08 10:25:56.498Z",
    "updated": "2024-11-08 10:25:56.498Z",
    "name": "org",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tzmmgivg",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "dz4wsusu",
        "name": "address",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w430efqe",
        "name": "created_on",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0c70t3xr00y5mo9");

  return dao.deleteCollection(collection);
})
