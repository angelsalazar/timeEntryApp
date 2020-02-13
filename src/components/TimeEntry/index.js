import React from 'react';
import clsx from 'clsx';

import { database } from '../../firebase';
import { formatDate } from './helpers';

import './style.css';

// https://dribbble.com/shots/6456805-Tarea-Manage-Event-Tasks-UI-2-Dribbble-Invite
export default function TimeEntry({ entry, onEdit, onDeleted }) {

  function handleEdit() {
    onEdit && onEdit({
      ...entry
    });
  }

  function handleDelete() {
    database
      .delete('timeEntries', entry.id)
      .then(() => {
        onDeleted && onDeleted();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="TimeEntry">
      <div className="TimeEntry__Body">
        <h4 className={clsx('TimeEntry__Title', `TimeEntry__Title-${entry.type}`)}>
          {entry.name}
        </h4>
        <p>
          {entry.description}
        </p>
        <span className="TimeEntry__Duration">
          <svg
            className="TimeEntry__Duration__Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          {`${entry.duration}h`}
        </span>
      </div>
      <div className="TimeEntry__Footer">
        <button
          className="TimeEntry__Action"
          onClick={handleEdit}>
          <svg
            className="TimeEntry__Action__Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <span>Edit</span>
        </button>
        <button
          className="TimeEntry__Action TimeEntry__Action-delete"
          onClick={handleDelete}>
          <svg
            className="TimeEntry__Action__Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <span>Delete</span>
        </button>
        <span className="TimeEntry__Timespan">
          Created Date: {formatDate(entry.createdDate.toDate())}
        </span>
      </div>
    </div>
  );
}
