// const randToken = require('rand-token')
const { getProjectList, postProjectList, deleteSpecifiedProject, getOneProject } = require('../utils')

exports.getProjects = async function(req, res) {
  const { user } = req.params
  const projectList = await getProjectList(user)

  if(projectList !== null) {
    res.status(200).json({ data: projectList })
  } else {
    res.status(200).json({ msg: 'NO CONTENT' })
  }
}

exports.postProjects = async function(req, res) {
  const { user } = req.params
  const { data, username } = req.body
  const result = user === username ? await postProjectList(data, username) : null

  if(result !== null) {
    res.status(200).json(result)
  } else {
    res.status(404).json({ msg: 'ERROR' })
  }
}

/* xóa bất kì 1 project nào đó từ db */
exports.deleteProjects = async function(req, res) {
  const { clientId, username } = req.params

  const result = await deleteSpecifiedProject(clientId, username)

  if(result !== null) {
    res.status(200).json({ data: result })
  } else {
    res.status(404).json({ msg: 'ERROR' })
  }
}

/* lấy thông tin chi tiết về 1 project nào đó từ db */
exports.getSpecifiedProject = async function(req, res) {
  const { id, user } = req.params
  const { index } = req.body
  const result = await getOneProject(parseInt(index), id, user)

  if(result !== null) {
    res.status(200).json({ data: result })
  } else {
    res.status(404).json({ msg: 'ERROR' })
  }
}