const mongoose = require('mongoose')

const password = process.env.DB_PASSWORD
const url = `mongodb+srv://joshjavier:${password}@cluster0.32rttdd.mongodb.net/phonebookApp?retryWrites=true&w=majority`

main().catch(err => console.log(err))

async function main() {
  try {
    await mongoose.connect(url)

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const addPerson = async (name, number) => {
      const person = new Person({ name, number })
      await person.save().then(person => {
        const { name, number } = person
        console.log(`added ${name} ${number} to phonebook`)
      })
    }

    const getAll = async () => {
      await Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(person.name, person.number)
        })
      })
    }

    if (process.argv[2]) {
      await addPerson(process.argv[2], process.argv[3])
    } else {
      await getAll()
    }
  } finally {
    await mongoose.connection.close()
  }
}
