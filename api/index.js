import Express from "express";
import login from './login.js'
import registe from './registe.js'
import isRegisted from './isRegisted.js'
import like from './like.js'
import songList from './songList.js'
import songWord from './songWord.js'
let router = Express.Router()
router.get('/login', login)
router.get('/registe', registe)
router.get('/isRegisted', isRegisted)
router.get('/like', like)
router.get('/songList', songList)
router.get('/songWord', songWord)
export default router