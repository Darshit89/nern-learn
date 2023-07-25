const express = require('express')
const path = require('path')
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeesController')
const router = express.Router()

router.route('/')
    .get(getAllEmployees)
    .post(createEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route('/:id').get(getEmployee)

module.exports = router