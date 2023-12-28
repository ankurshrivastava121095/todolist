const express = require('express')
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/TaskController')
const router = express.Router()


// UserController
router.post('/register',UserController.register)
router.post('/login',UserController.login)


//TaskController
router.post('/add-task',TaskController.add)
router.get('/fetch-all-task/:id',TaskController.fetchAll)
router.get('/fetch-task/:id',TaskController.fetchSingle)
router.put('/update-task/:id',TaskController.update)
router.get('/delete-task/:id',TaskController.delete)



module.exports = router