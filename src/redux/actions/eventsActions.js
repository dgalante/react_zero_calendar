import { types } from "../types/types";
import Swal from "sweetalert2";
import { requesWithToken } from "../../helpers/httpClient";
import { prepareEvents, prepareEventDate } from "../../helpers/prepareEvents";

export const startAddNew = (event) => {
  return async (dispatch) => {
    try {
      event = prepareEventDate(event);
      const response = await requesWithToken("/event", event, "POST");
      const eventSaved = prepareEventDate(response.data.event);
      dispatch(eventAddNew(eventSaved));
    } catch (error) {
      Swal.fire("Error", "Error al crear el evento");
      console.error("startAddNew error > ", error);
    }
  };
};

const eventAddNew = (event) => {
  return {
    type: types.EVENT_ADD_NEW,
    payload: event,
  };
};

export const eventSetActive = (event) => {
  return {
    type: types.EVENT_SET_ACTIVE,
    payload: event,
  };
};

export const startGetEvents = () => {
  return async (dispatch) => {
    try {
      const response = await requesWithToken("/event", {}, "GET");
      const { events } = response.data;

      const eventSanitized = prepareEvents(events);

      dispatch(listEvents(eventSanitized));
    } catch (error) {
      Swal.fire("Error", "Error al obtener eventos");
      console.error("login error > ", error);
    }
  };
};

const listEvents = (events) => {
  return {
    type: types.EVENT_LIST,
    payload: events,
  };
};

export const startUpdateEvent = (event) => {
  return async (dispatch) => {
    try {
      event = prepareEventDate(event);
      await requesWithToken(`/event/${event.id}`, event, "PUT" );
      dispatch(eventUpdate(event));
    } catch (error) {
      Swal.fire("Error", "Error al crear el evento");
      console.error("startUpdateEvent error > ", error);
    }
  };
};

export const eventUpdate = (event) => {
  return {
    type: types.EVENT_UPDATE,
    payload: event
  };
};

export const startRemoveEvent = (event) => {
  return async (dispatch) => {
    try {
      await requesWithToken(`/event/${event.id}`, {}, "DELETE" );
      dispatch(eventDelete(event));
    } catch (error) {
      Swal.fire("Error", "Error al eliminar el evento");
      console.error("startRemoveEvent error > ", error);
    }
  };
};

export const eventDelete = (event) => {
  return {
    type: types.EVENT_DELETE,
    payload: event
  };
};