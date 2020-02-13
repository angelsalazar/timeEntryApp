import React from 'react';
import Modal from 'react-modal';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { database } from './firebase';

import Calendar from './components/Calendar';
import TimeEntry from './components/TimeEntry';
import FloatingButton from './components/FloatingButton';
import EntryType from './components/EntryType';
import EntryWizardModal from './components/EntryWizardModal';

import { getCurrentDate, formatDate } from './components/Calendar/helpers';

import './App.css';

Modal.setAppElement('#root');

function App() {
  const [selectedDate, setSelectedDate] = React.useState(() => {
    return getCurrentDate();
  });
  const [showModal, setShowModal] = React.useState(false);
  const [entries, setEntries] = React.useState([]);
  const [currentEditing, setCurrentEditing] = React.useState(null);

  React.useEffect(() => {
    return (
      database
        .subscribe(
          'timeEntries',
          formatDate({
            year: selectedDate.year,
            month: selectedDate.month,
            day: selectedDate.day
          }),
          (records) => {
            setEntries(records);
          }
        )
    );
  }, [
    selectedDate.year,
    selectedDate.month,
    selectedDate.day
  ]);

  function handleSelectedDate(newSelectedDate) {
    setSelectedDate(newSelectedDate);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleEdit(editingEntry) {
    setCurrentEditing(editingEntry);
    setShowModal(true);
  }

  return (
    <div className="App">
      <header className="App__Header">

      </header>
      <main className="App__Content">
        <aside>
          <h3 className="App__Section-Title">
            Filters
          </h3>
          <Calendar
            selectedDate={selectedDate}
            onSelect={handleSelectedDate}
          />
          <h3 className="App__Section-Title">
            Type
          </h3>
          <EntryType />
        </aside>
        <section className="App__TimeEntries-Container">
          <h3 className="App__Section-Title">
            Items {entries.length}
          </h3>
          <TransitionGroup className="App__TimeEntries">
            {entries.map(entry => (
              <CSSTransition
                key={entry.id}
                timeout={500}
                classNames="App_AnimatedTimeEntry">
                <TimeEntry
                  entry={entry}
                  onEdit={handleEdit}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </section>
      </main>

      <FloatingButton
        onClick={handleOpenModal}
      />

      <EntryWizardModal
        show={showModal}
        entry={currentEditing}
        entryDate={selectedDate}
        onCancel={handleCloseModal}
      />
    </div>
  );
}

export default App;
