const PersonForm = ({ name, phone, onNameChange, onPhoneChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <div className="form-group">
            Name: <input value={name} onChange={onNameChange} />
            Phone Number: <input value={phone} onChange={onPhoneChange} />
            <button type="submit" className="btn">Add</button>
        </div>
    </form>
);

export default PersonForm;