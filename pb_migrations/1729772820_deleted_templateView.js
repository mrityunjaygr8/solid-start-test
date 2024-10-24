/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("batkrkihik36jlz");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "batkrkihik36jlz",
    "created": "2024-10-23 08:50:27.537Z",
    "updated": "2024-10-23 09:02:43.861Z",
    "name": "templateView",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qij0omrf",
        "name": "creator",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "kvf96lxj",
        "name": "description",
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
        "id": "oqlbmkqs",
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
        "id": "xccyouyg",
        "name": "questions",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "phdovi4a35r3rpu",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, creator, description, name, questions from `formTemplate`;"
    }
  });

  return Dao(db).saveCollection(collection);
})
