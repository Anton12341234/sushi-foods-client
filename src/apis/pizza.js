import axios from 'axios';

export default axios.create({
  baseURL: 'http://sushi-foods.store:5000',
});

//"start": "node ./backend/server.js",
//"start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"