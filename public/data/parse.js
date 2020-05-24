const fs = require('fs')

const data = require('./vn.json').map(u => {
  const { city, admin, lat, lng } = u
  return {
    city, admin, lat, lng
  }
})

fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
