import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "../../styles/modal.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { uiCloseModal } from "../../redux/actions/uiActions";
import {
  eventAddNew,
  eventSetActive,
  eventUpdate,
} from "../../redux/actions/eventsActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");
const initFormEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.modalOpen);
  const { activeEvent } = useSelector((state) => state.calendar);
  const [formValues, setFormValues] = useState(initFormEvent);
  const { title, notes, start, end } = formValues;
  const [titleIsValid, setTitleIsValid] = useState(true);

  useEffect(() => {
      setFormValues( activeEvent || initFormEvent);
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleCloseModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventSetActive(null));
    resetForm();
  };

  const resetForm = () => {
    setFormValues(initFormEvent);
  };

  const handleStartDateChange = (e) => {
    setFormValues({ ...formValues, start: e });
  };

  const handleEndDateChange = (e) => {
    setFormValues({ ...formValues, end: e });
  };

  const sendEvent = () => {
    const newEvent = {
      ...formValues,
      user: { _id: "123", name: "Diego" },
    }
    
    if (activeEvent?.id){
      dispatch(eventUpdate( newEvent )); 
    } else {
      dispatch(eventAddNew( newEvent ))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd))
      return Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha de inicio"
      );

    setTitleIsValid(title.trim().length > 1);

    sendEvent();

    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento' } </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className="form-control"
            onChange={handleStartDateChange}
            value={start}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            minDate={start}
            onChange={handleEndDateChange}
            value={end}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleIsValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
