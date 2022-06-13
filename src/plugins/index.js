import { Swipe, SwipeItem, Button, Popup } from "vant";

let plugins = [Swipe, SwipeItem, Button, Popup];

function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}

export default getVant;
