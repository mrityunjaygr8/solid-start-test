/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("phdovi4a35r3rpu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8rhj4jzh",
    "name": "org_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0c70t3xr00y5mo9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("phdovi4a35r3rpu")

  // remove
  collection.schema.removeField("8rhj4jzh")

  return dao.saveCollection(collection)
})
