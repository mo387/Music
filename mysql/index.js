import { selectAll, selectPart, selectLike } from "./select/index.js";
import { insertSingle } from './insert/index.js'
import { deletesingle } from './delete/index.js'
import { update } from './update/index.js'
let db = {
  selectAll, selectPart, selectLike, insertSingle, deletesingle, update
}
export default db