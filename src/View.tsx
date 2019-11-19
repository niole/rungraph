import * as React from "react";
import * as R from 'ramda';
import { Card, Layout, Menu, Icon } from 'antd';
import { CreateEditViewRun } from './CreateEditViewRun';
import { Run } from './types';
import getRuns from './api/getRuns';

const { Header, Sider, Content } = Layout;

const View = () => {
    const [runCards, setRunCards] = React.useState([]);
    const [collapsed, setToggle] = React.useState(false);
    const [view, setView] = React.useState('map');
    React.useEffect(() => {
        getRuns('userId').then(setRunCards).catch((error: any) => {
            console.error('FAiled', error);
        });
    }, []);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['map']}>
                    <Menu.Item key="map">
                        <Icon type="user" />
                        <span>Map</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => setToggle(!collapsed)}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                        height: '100%',
                    }}
                >
                    {R.cond([
                        [R.equals('map'), () => (
                            <div>
                                <CreateEditViewRun
                                    onModalSubmit={R.pipe((x: Run) => [x], R.concat(runCards), setRunCards)}
                                />
                                <div>
                                    {runCards.map(({ route, duration, date, distance }: Run) => (
                                        <Card>
                                            <CreateEditViewRun
                                                defaultDate={date}
                                                defaultDuration={duration}
                                                defaultDistance={distance}
                                                defaultRoute={route}
                                            />
                                            <div>
                                                date {date.toString()}
                                            </div>
                                            <div>
                                                distance {distance}
                                            </div>
                                            <div>
                                                duration {duration}
                                            </div>
                                            <div>
                                                route {route}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )],
                        [R.T, () => null]
                    ])(view)}
                </Content>
            </Layout>
        </Layout>
    );
};
export default View;
