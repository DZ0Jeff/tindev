const express = require('express')
const DevController = require('./controller/DevController')
const LikeController = require('./controller/LikeController')
const DislikeController = require('./controller/DislikeController')

const routes = express.Router()
const tree = '/devs'

routes.get(`${tree}`, DevController.index)
routes.post(`${tree}`, DevController.store)

routes.post(`${tree}/:devId/likes`, LikeController.store)
routes.post(`${tree}/:devId/dislikes`, DislikeController.store)

module.exports = routes