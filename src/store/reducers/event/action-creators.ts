import {IEvent} from "../../../models/IEvent";
import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";

export const EventActionCreators = {
    setGuests: (guests: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
    setEvents: (events: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get('./users.json')
            dispatch(EventActionCreators.setGuests(response.data))
            console.log('response', response.data)
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvent: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvent = json.filter(event => event.author === username || event.guest === username);
            dispatch(EventActionCreators.setEvents(currentUserEvent));
        } catch (e) {
            console.log(e)
        }
    }
}