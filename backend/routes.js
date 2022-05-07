const express = require('express')
const router = express.Router()

const data = {
  student: require('./db.json'),
  setStudent: function (data) {
    this.student = data
  },
}

router.get('/', async (req, res) => {
  const students = await data.student
  res.json(students)
})

router.get('/add', (req, res) => {
  const { name, age, address } = req.body

  const newStudent = {
    id: data.student?.length ? data.student[data.student.length - 1].id + 1 : 1,
    name: name,
    age: age,
    address: address,
  }

  data.setStudent([...data.student, newStudent])
  res.json('success')
})

module.exports = router
