
const Persons = ({ persons }) => (
    persons.map(person => (
        <li key={person.name}>
            <span>{person.name}</span> - <span>{person.phone}</span>
        </li>
    ))

);

export default Persons;