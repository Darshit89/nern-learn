const express = require('express')
const path = require('path')
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeesController')
const ROLES_LIST = require('../../config/role_list')
const verifyRoles = require('../../middleware/verifyRole')
const router = express.Router()

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), createEmployee)
    .put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

router.route('/:id').get(getEmployee)

module.exports = router