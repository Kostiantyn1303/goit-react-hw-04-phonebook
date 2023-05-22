import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Form, Lable, Btn, Input } from './ContactForm.styled';

const nameInputId = shortid.generate();
const numberInputId = shortid.generate();
const INITIAL_STATE = {
  name: '',
  number: '',
};

export function ContactForm({ onSubmit }) {
  const [formInfo, setFormInfo] = useState({ ...INITIAL_STATE });

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    setFormInfo(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(formInfo);
    resetForm();
  };
  const resetForm = () => {
    setFormInfo({ ...INITIAL_STATE });
  };
  const { name, number } = formInfo;

  return (
    <Form action="" onSubmit={handleSubmit}>
      <Lable htmlFor={nameInputId}>Name</Lable>
      <Input
        value={name}
        type="text"
        name="name"
        pattern="[\p{L} '-]+"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        id={nameInputId}
      />
      <Lable htmlFor={numberInputId}>Number</Lable>
      <Input
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        id={numberInputId}
      />
      <Btn type="submit">Add contact</Btn>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
