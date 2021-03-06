import "babel-polyfill"
import {api} from "./api";
import {hostUrl} from "./api";
import query from './query';

export default ({ app  }, inject) => {
  // Set the function directly on the context.app object
  app.api = new api()
  app.query = query
  app.hostUrl = hostUrl
}


