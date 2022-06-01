import React from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

interface IMenu {
    label: string
    key: number
}

const Navbar: React.FC = () => {
    const loginItems: IMenu[] = [{ label: "Логин 1", key: 1 }];
    const logoutItems: IMenu[] = [{ label: "Выйти", key: 1 }];

    const {isAuth, user} = useTypedSelector(state => state.auth);
    const navigate: any = useNavigate();
    const {logout} = useActions();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                    <>
                        <div style={{color: 'gray', marginRight: 20}}>
                            {user.username}
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={logoutItems}
                            selectable={false}
                            onClick={logout}
                        />
                    </>
                    :
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={loginItems}
                        selectable={false}
                        onClick={() => navigate(RouteNames.LOGIN, { replace: true })}
                    />
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;