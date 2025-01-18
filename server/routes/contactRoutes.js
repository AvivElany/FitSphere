const router = require('express').Router();
const { mustLogin, allowedRoles } = require('../controllers/authControllers');
const { getAllContacts, getContactsById, createNewContacts, deleteContact, updateContacts } = require('../controllers/contactControllers');

  //  base path = "/contacts"

    router.get('/', mustLogin, allowedRoles(['manager']), getAllContacts)
    
    // unprotected Routes :
    router.get('/:id', mustLogin, allowedRoles(['manager']), getContactsById)
    router.post('/', createNewContacts) // ALL
    router.patch('/:id', mustLogin, allowedRoles(['manager']), updateContacts) 
    router.delete('/:id', mustLogin, allowedRoles(['manager']), deleteContact)

module.exports = router;