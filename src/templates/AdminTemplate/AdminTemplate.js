import { Fragment } from "react";
import { Route } from "react-router";

// import thư viện antd
import { Layout, Avatar, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";

import { UserOutlined, FileOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

export const AdminTemplate = (props) => {
  // path, exact, Component

  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match

        return (
          <Fragment>
            <Layout>
              <Header style={{ padding: 10 }}>
                <Avatar style={{ float: "right" }} src="./dp.png" />
                <Title style={{ color: "white" }} level={3}>
                  Movie
                </Title>
              </Header>
              <Layout>
                <Sider>
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                      <NavLink to="/admin/users">User</NavLink>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<FileOutlined />}>
                      <NavLink to="/admin/users/addnewuser">Add New</NavLink>
                    </Menu.Item>
                    <SubMenu key="2" icon={<FileOutlined />} title="Films">
                      <Menu.Item key="10" icon={<FileOutlined />}>
                        <NavLink to="/admin/films">Films</NavLink>
                      </Menu.Item>
                      <Menu.Item key="11" icon={<FileOutlined />}>
                        <NavLink to="/admin/films/addnewfilm">Add New</NavLink>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout>
                  <Content style={{ padding: "0 50px" }}>
                    <Component {...propsRoute} />
                  </Content>
                  <Footer style={{ textAlign: "center" }}>
                    Ant Design Layout
                  </Footer>
                </Layout>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
