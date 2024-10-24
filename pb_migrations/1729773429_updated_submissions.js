/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8fbftunh4c7ewfq")

  collection.listRule = "campaign.creator.id = @request.auth.id"
  collection.viewRule = "campaign.creator.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8fbftunh4c7ewfq")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
