const { getUser } = require('../utils')

exports.postLogin = async function(req, res) {
  const { username, password } = req.body
  const user = await getUser(username, password)

  if(user !== null) {
    res.status(200).json(user)
  } else {
    res.status(404).json({
      msg: 'ERROR'
    })
  }
}