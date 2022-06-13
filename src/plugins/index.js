import { Swipe, SwipeItem, Button } from 'vant';

let plugins = [
  Swipe, SwipeItem, Button
]

function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}

export default getVant