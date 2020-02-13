import React from 'react';
import Modal from 'react-modal';

import Field from '../Field';
import Textarea from '../Textarea';
import Combobox from '../Combobox';
import Button from '../Button';

import { database } from '../../firebase';

import { timeEntryTypes } from '../../metadata';
import { formatDate } from '../Calendar/helpers';

import './style.css';

const defaultForm = {
  date: '',
  type: '',
  name: '',
  duration: '',
  description: ''
};

export default function EntryWizardModal({ show, entry, entryDate, onCancel }) {
  const [data, setData] = React.useState(entry || defaultForm);
  const isoDate = formatDate(entryDate);

  React.useEffect(() => {
    if (entry !== null) {
      setData(entry);
    }
  }, [entry]);

  function handleCancel() {
    setData(defaultForm);
    onCancel && onCancel();
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const promise = (
      data.id
      ? database.update('timeEntries', {
          ...data
      })
      : database.create('timeEntries', {
        ...data,
        date: isoDate
      })
    );

    promise
      .then(handleCancel)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(ev) {
    const key = ev.target.name;
    const value = ev.target.value;

    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }

  return (
    <Modal
      isOpen={show}
      closeTimeoutMS={200}
      className="App__Modal"
      overlayClassName="App_Modal__Overlay"
      onRequestClose={handleCancel}>
      <div className="EntryWizard" tabIndex="-1">
        <div className="EntryWizard__Header">
          <h3>Time Entry</h3>
        </div>
        <button
          className="EntryWizard__Close"
          onClick={handleCancel}>
          <svg
            className="EntryWizard__Close_Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <div className="EntryWizad__Content">
          <form onSubmit={handleSubmit}>
            <Field
              readOnly
              type="date"
              label="Date"
              name="date"
              className="EntryWizard__Field"
              defaultValue={isoDate}
            />

            <div className="EntryWizard__Compound-Field">
              <Combobox
                label="Type"
                name="type"
                options={timeEntryTypes}
                value={data.type}
                onChange={handleChange}>
              </Combobox>
              <Field
                type="number"
                name="duration"
                label="Duration"
                value={data.duration}
                onChange={handleChange}
              />
            </div>
            <Field
              label="Name"
              name="name"
              className="EntryWizard__Field"
              value={data.name}
              onChange={handleChange}
            />
            <Textarea
              label="Description"
              name="description"
              className="EntryWizard__Field"
              defaultValue={data.description}
              onChange={handleChange}
            />
            <div className="EntryWizard__Actions">
              <Button
                className="EntryWizard__Secundary"
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>

  );
}
