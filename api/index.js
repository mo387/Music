import Express from "express";
import login from './login.js'
import registe from './registe.js'
import isRegisted from './isRegisted.js'
import { like, islike, deletelike } from './like.js'
import songList from './songList.js'
import songWord from './songWord.js'
import searchSong from './searchSong.js'
import searchSinger from './searchSinger.js'
import islogin from './islogin.js'
import guess from './guess.js'
let router = Express.Router()
router.get('/login', login)
router.get('/registe', registe)
router.get('/isRegisted', isRegisted)
router.get('/like', like)
router.get('/islike', islike)
router.get('/delelike', deletelike)
router.get('/songList', songList)
router.get('/songWord', songWord)
router.get('/searchSong', searchSong)
router.get('/searchSinger', searchSinger)
router.get('/islogin', islogin)
router.get('/guess', guess)
export default router