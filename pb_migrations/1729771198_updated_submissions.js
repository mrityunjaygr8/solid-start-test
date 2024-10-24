/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8fbftunh4c7ewfq")

  collection.viewRule = ""
  collection.createRule = "campaign.respondents ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8fbftunh4c7ewfq")

  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
