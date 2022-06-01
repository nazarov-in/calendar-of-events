import React from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {EditOutlined} from "@ant-design/icons/lib";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {rules} from "../utils/rules";

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: React.FC<EventFormProps> = (props) => {
    const [event, setEvent] = React.useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                name="description"
                rules={[{required: true, message: 'Обязательное поле'}]}
            >
                <Input
                    placeholder="Описание события"
                    prefix={<EditOutlined className="site-form-item-icon" />}
                    onChange={(e) => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[{required: true, message: 'Обязательное поле'}, rules.isDateAfter("Нельзя создать событие в прошлом")]}
            >
                <DatePicker onChange={(date) => selectDate(date)}/>
            </Form.Item>

            <Form.Item label="Выберете гостя"
                       rules={[{required: true, message: 'Обязательное поле'}]}
                       name="guest"
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option value={guest.username} key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button
                        style={{width: 'auto'}}
                        type="primary"
                        htmlType="submit"
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;