const { MongoClient } = require('mongodb');
const randToken = require('rand-token')
const client = new MongoClient(process.env.MONGODB_URL);
const dbName = process.env.MONGODB_DB_NAME;

/* kết nối đến mongodb */
exports.init = function() {
  client.connect().then(() => {
    console.log('Connected successfully to server');
  })
}

/* lấy người dùng từ db */
exports.getUser = async function(username, password) {
  const db = client.db(dbName);
  const collection = db.collection('users');
  
  try {
    const user = await collection.findOne({ 
      $and: [{ "email": { $eq: username } }, { "password": password }]
    });

    console.log(`user is ${JSON.stringify(user, null, 2)}`)

    if(user && user.email == username && user.password == password) {
      return user
    }
  } catch(e) {
    throw e
  }

  return null
}

/* thêm người dùng vào db */
exports.addUser = async function(information) {
  const { username, password, email } = information
  const db = client.db(dbName);
  const collection = db.collection('users');

  try {
    console.log(`username ${username}`)
    const user = await collection.findOne({ 
      username: username
    });

    console.log(user)

    if(!user) {
      const result = await collection.insertOne({
        username: username,
        password: password,
        email: email,
        projects: []
      })
      return result
    } else {
      return null
    }
  } catch(e) {
    throw e
  }

  return null
}

/* lấy project list từ db */
exports.getProjectList = async function(user) {
  const db = client.db(dbName);
  const collection = db.collection('users');

  const userProfile = await collection.findOne({ 
    username: user
  });

  return userProfile && userProfile.projects ? userProfile.projects : null
}

/* thêm project list vào db */ 
exports.postProjectList = async function(projectInformation, user) {
  const db = client.db(dbName);
  const collection = db.collection('users');

  const userProfile = await collection.findOne({ 
    username: user
  });

  if(userProfile && userProfile.username == user) {
    const projectList = [...userProfile.projects, projectInformation]
    const result = await collection.updateOne(
      { username: user }, 
      { $set: { projects: projectList } }
    )
    return result.acknowledged == true ? projectList : null
  }
}

/* xóa 1 project nào đó từ db */
exports.deleteSpecifiedProject = async function(id, user) {
  const db = client.db(dbName);
  const collection = db.collection('users');

  const userProfile = await collection.findOne({ 
    username: user
  });

  if(userProfile && userProfile.username == user) {
    const index = userProfile.projects.filter((item) => item.clientId !== id)
    const result = await collection.updateOne(
      { username: user }, 
      { $set: { projects: index } }
    )
    return result.acknowledged == true ? index : null
  }
}

/* lấy chi tiết về 1 project từ db */
exports.getOneProject = async function(index, id, user) {
  const db = client.db(dbName);
  const collection = db.collection('users');

  const userProfile = await collection.findOne({ 
    username: user
  });

  if(userProfile && userProfile.username == user) {
    const currentProject = userProfile.projects.length > 0 ? userProfile.projects[index] : null
    return currentProject.projectId == id ? currentProject : null
  }
}