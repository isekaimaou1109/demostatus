const express = require('express')
const router = express.Router()

const { getProjects, postProjects, deleteProjects, getSpecifiedProject } = require('../controllers/projects')

router.get('/:user', getProjects)
router.get('/:id/:user', getSpecifiedProject)
router.post('/:user', postProjects)
router.delete('/:clientId/:username', deleteProjects)

module.exports = router