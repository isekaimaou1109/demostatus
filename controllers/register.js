const { addUser } = require('../utils')

exports.postRegister = async function(req, res) {
  const user = await addUser(req.body)

  if(user !== null) {
    res.status(200).json(user)
  } else {
    res.status(400).json({ msg: 'ERROR' })
  }
}