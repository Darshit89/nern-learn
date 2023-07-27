const Employee = require('../model/Employees');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) res.sendStatus(204).json({ 'message': "NO data found" })
    res.json(employees)

}

const createEmployee = async (req, res) => {

    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ 'message': 'firstname and lastname required' })
    }

    try {
        const result = await Employee.create({ firstname: req.body.firstname, lastname: req.body.lastname })
        res.status(201).json(result)
    } catch (error) {
        console.log('error: ', error);

    }

}

const updateEmployee = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ 'message': `Employee ID requierd` })
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if (!employee) {
        return res.status(204).json({ 'message': `Employee ID Not Matched` })
    }

    if (req.body.firstname) employee.firstname = req.body.firstname
    if (req.body.lastname) employee.lastname = req.body.lastname
    const result = await employee.save()
    res.json(result)
}

const deleteEmployee = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ 'message': `Employee ID requier` })
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID Not Matched` })
    }
    const result = await Employee.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getEmployee = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ 'message': `Employee ID Requierd` })
    }
    const employee = await Employee.findOne({ _id: req.params.id }).exec()
    if (!employee) return res.status(400).json({ 'message': `Employee ID Not Matched` })
    res.json(employee)
}
module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee }