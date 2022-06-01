import React from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: React.FC = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const {guests, events} = useTypedSelector(state => state.event)
    const {fetchGuests, createEvent, fetchEvent} = useActions();
    const {user} = useTypedSelector(state => state.auth)

    React.useEffect(() => {
        fetchGuests();
        fetchEvent(user.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
              <Button onClick={() => setModalVisible(true)} style={{marginBottom: 60}}>Добавить событие</Button>
            </Row>
            <Modal
                title="Добавить событие"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <EventForm
                    guests={guests}
                    submit={(event) => addNewEvent(event)}
                />
            </Modal>
        </Layout>
    )
};

export default Event;