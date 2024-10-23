/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6zfa90a7sbvwsj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8sqlt4li",
    "name": "field",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6zfa90a7sbvwsj")

  // remove
  collection.schema.removeField("8sqlt4li")

  return dao.saveCollection(collection)
})
