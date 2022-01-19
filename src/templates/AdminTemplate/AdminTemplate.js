import { Fragment } from "react";
import { Route } from "react-router";

// import thư viện antd
import { Layout, Avatar, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";

import { UserOutlined, FileOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { Select } from "antd";

// Import đa ngôn ngữ
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const { Header, Footer, Sider, Content } = Layout;

export const AdminTemplate = (props) => {

  const { t, i18n } = useTranslation();
  
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

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
                <Select
                  defaultValue="eng"
                  style={{ float: "right", marginRight: 20 ,width: 80 }}
                  onChange={handleChange}
                >
                  <Option value="eng">Eng</Option>
                  <Option value="vi">Vi</Option>
                </Select>
                <Avatar
                  style={{ float: "right", marginRight: 20 }}
                  src="./dp.png"
                >
                  <NavLink to="/adminlogin">{t('signin')}</NavLink>
                </Avatar>
                {/* <Avatar style={{ float: "right" }} src="./dp.png" /> */}
                <Title style={{ color: "white" }} level={3}>
                  Movie
                </Title>
              </Header>
              <Layout>
                <Sider>
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                  <SubMenu key="1" icon={<UserOutlined />} title={t('user')}>
                      <Menu.Item key="10" icon={<FileOutlined />}>
                        <NavLink to="/admin/users">{t('user')}</NavLink>
                      </Menu.Item>
                      <Menu.Item key="11" icon={<FileOutlined />}>
                        <NavLink to="/admin/users/addnewuser">{t('Add New')}</NavLink>
                      </Menu.Item>
                    </SubMenu>

                    <SubMenu key="2" icon={<FileOutlined />} title={t('Films')}>
                      <Menu.Item key="10" icon={<FileOutlined />}>
                        <NavLink to="/admin/films">{t('Films')}</NavLink>
                      </Menu.Item>
                      <Menu.Item key="11" icon={<FileOutlined />}>
                        <NavLink to="/admin/films/addnewfilm">{t('Add New')}</NavLink>
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
