import React from 'react';
import {Button, Form, Input} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: React.FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login} = useActions();

    const submit = () => {
        login(username, password)
    };

    return (
        <Form onFinish={submit} className="form-space">
            {error && <div className="form-error">
                {error}
            </div>}
            <Form.Item
                className="form-item-space"
                name="username"
                rules={[{ required: true, message: 'Пожалуйста введите имя пользователя!' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Имя пользователя"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </Form.Item>
            <Form.Item
                className="form-item-space"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={isLoading}
                >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;