/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1d33g4iwg1fmg7g")

  collection.listRule = "respondents ~ @request.auth.id ||\ncreator.id = @request.auth.id"
  collection.viewRule = "respondents ~ @request.auth.id ||\ncreator.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1d33g4iwg1fmg7g")

  collection.listRule = "respondents.id ~ @request.auth.id ||\ncreator.id = @request.auth.id"
  collection.viewRule = "respondents.id ~ @request.auth.id ||\ncreator.id = @request.auth.id"

  return dao.saveCollection(collection)
})
