const chokidar = require('chokidar');
const child_process = require('child_process');
const deasync = require('deasync');

var queue = null

// One-liner for current directory
chokidar.watch([`${process.cwd()}\\src\\**\\*.vue`, `${process.cwd()}\\src\\**\\*.js`]).on('change', path =>  {
  console.log(`File ${path} has been changed`)

  var child = child_process.exec('npm run serve')
  child.stdout.on('data', function(data) {
    console.log(data.toString());
    queue = true 
  })

  while(queue == null) {
    deasync.runLoopOnce()
  }

  process.kill(child.pid)
  queue = null
})
