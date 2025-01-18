const router = require('express').Router();
const { getAllUsers, getUserById, deleteUser, updateUser, register, login, updateGrades, getAllPremium } = require('../controllers/usersControllers');
const { mustLogin, allowedRoles,  } = require('../controllers/authControllers');

  //  base path = "/users"
  
  router.post('/register', register)
  router.post('/login', login)
  router.get('/', /* mustLogin, allowedRoles(['manager', "trainer"]), */ getAllUsers)
  router.get('/:id', /* mustLogin, allowedRoles(["manager", "trainer", "ownUser"]), */ getUserById)
  router.get('/', mustLogin, allowedRoles(["manager"]), getAllPremium)
  router.put('/:id', mustLogin, allowedRoles(["manager", "ownUser"]), updateUser)
  router.patch('/:id', mustLogin, allowedRoles(["manager", "trainer"]), updateGrades),
  router.delete('/:id', mustLogin, allowedRoles(["manager"]), deleteUser)

module.exports = router;