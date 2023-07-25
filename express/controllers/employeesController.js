


const fs = require('fs')
const path = require('path')
const data = {
    employees: require('../model/employees.json'),
    setEmployee: function (data) {
        this.employees = data
    }

}

const getAllEmployees = (req, res) => {
    res.send(data.employees)
}

const createEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'firstname and lastname required' })
    }

    data.setEmployee([...data.employees, newEmployee])
    fs.writeFile(path.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(data.employees), (err) => {
        if (!err) {
            res.status(201).json(data.employees)
        }
    })
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(employee => {
        return employee.id === parseInt(req.body.id)
    })
    if (!employee) {
        res.status(400).json({ 'message': `Employee ID ${req.body.id} not found` })
    }
    if (req.body.firstname) employee.firstname = req.body.firstname
    if (req.body.lastname) employee.lastname = req.body.lastname

    const filterArray = data.employees.filter(employee => employee.id !== parseInt(req.body.id))
    const unSortedArray = [...filterArray, employee]
    data.setEmployee(unSortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    fs.writeFile(path.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(data.employees), (err) => {
        if (!err) {
            res.json(data.employees)
        }
    })
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(employee => employee.id === parseInt(req.body.id))
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID ${req.body.id} not found` })
    }
    const filterArray = data.employees.filter(employee => employee.id !== parseInt(req.body.id))
    data.setEmployee([...filterArray])
    fs.writeFile(path.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(data.employees), (err) => {
        if (!err) {
            res.json(data.employees)
        }
    })
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(employee => employee.id === parseInt(req.params.id))
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID ${req.params.id} not found` })
    }
    res.json(employee)
}
module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee }