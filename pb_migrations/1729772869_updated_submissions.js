/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8fbftunh4c7ewfq")

  collection.createRule = "@request.data.submitter = @request.auth.id &&\ncampaign.respondents ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8fbftunh4c7ewfq")

  collection.createRule = "@request.data.submitter = @request.auth.id "

  return dao.saveCollection(collection)
})
