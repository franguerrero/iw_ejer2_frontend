import "./App.less";

import React, { Component, Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import { matchPath } from "react-router";
import { Switch, Route, Link, withRouter, RouteComponentProps } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import { Scrollbars } from "react-custom-scrollbars";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  PageHeader,
  Popover,
  Result,
  Spin,
  Typography,
} from "antd";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ArrowLeftOutlined,
  GlobalOutlined,
  HomeOutlined,
  KeyOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";


import config from "./config/config";
import DashboardView from "./views/Dashboard";
import ClientsView from "./views/Clients";
import Splash from "./components/Splash";


import { authenticateUser } from "./redux/actions/actions.user";
import { INavigateState } from "./redux/actions.types";
import { IStoreState } from "./redux/reducers";
import { ROUTE_CLIENTS, ROUTE_DASHBOARD } from "./routes";

const connector = connect(
  (state: IStoreState) => ({ ...state.navigate, ...state.user }),
  {
    authenticateUser,
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    reduxProps: { ...stateProps },
    reduxDispatch: { ...dispatchProps },
  })
);
const { Content, Footer, Header, Sider } = Layout;
const { SubMenu } = Menu;
const { Text, Title } = Typography;

interface IProps extends WithTranslation, RouteComponentProps, ConnectedProps<typeof connector> {}

interface IState {
  authError?: any;
  language: "EN" | "ES";
  responsive: boolean;
  sider: { collapsed: boolean; expandKeys?: string[] };
  userPopover: { visible: boolean };
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      authError: null,
      language: "ES",
      responsive: false,
      sider: { collapsed: false },
      userPopover: { visible: false },
    };

    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onPopoverVisibleChange = this.onPopoverVisibleChange.bind(this);
    this.onSiderToggleClick = this.onSiderToggleClick.bind(this);
  }

  async componentDidMount() {
    try {
            
      this.props.reduxDispatch.authenticateUser(true);

    } catch (ex) {
      this.setState({ authError: ex });
    }
  }

  itemRender(route: any, params: any, routes: any, paths: any) {
    return routes.indexOf(route) === routes.length - 1 ? (
      <span>{this.props.t(route.breadcrumbName)}</span>
    ) : (
      <Link to={route.path}>{this.props.t(route.breadcrumbName)}</Link>
    );
  }

  onSiderToggleClick() {
    this.setState((state) => {
      return { sider: { collapsed: !state.sider.collapsed } };
    });
  }

  onPopoverVisibleChange(visible: boolean) {
    this.setState({ userPopover: { visible } });
  }

  onLanguageChange(language: "EN" | "ES") {
    this.props.i18n.changeLanguage(language.toLowerCase());
    this.setState({ language: language });
  }

  render() {
    const current = this.props.reduxProps.routes.slice(-1)[0];
    const headerTitle = current ? this.props.t(current.breadcrumbName) : "";
    const headerIcon = current ? current.icon : "span";

    return this.props.reduxProps.isAuthenticated ? (
      <Layout className={this.state.responsive ? "ant-layout-mobile" : undefined}>
        <Header className="header">
          <Button
            className="ant-sider-trigger"
            icon={this.state.sider.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            size="large"
            type="link"
            onClick={this.onSiderToggleClick}
          />
          <div className="logo">
            <img alt="" src={`${config.baseURL}/logo.svg`} width="100%" />
          </div>
          <Title className="app-title" level={4}>
            {this.props.t("app.title")}
          </Title>
          <Dropdown
            className="ml-auto"
            overlay={
              <Menu selectedKeys={[this.state.language]}>
                <Menu.Item key="ES" onClick={() => this.onLanguageChange("ES")}>
                  ES
                </Menu.Item>
                <Menu.Item key="EN" onClick={() => this.onLanguageChange("EN")}>
                  EN
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              size={this.state.responsive ? "small" : "middle"}
              type="default"
              shape="round"
              icon={<GlobalOutlined />}
            >
              {this.state.language}
            </Button>
          </Dropdown>
          
        </Header>
        <Layout hasSider={true}>
          <Sider
            breakpoint="lg"
            collapsedWidth={this.state.responsive ? 0 : undefined}
            collapsible
            collapsed={this.state.sider.collapsed}
            defaultCollapsed={true}
            theme="light"
            trigger={null}
            width={this.state.responsive ? "80%" : "240px"}
            onBreakpoint={(broken: boolean) => {
              this.setState((state, props) => {
                if (state.responsive !== broken) {
                  return { responsive: broken, sider: { collapsed: broken } };
                }
                return null;
              });
            }}
          >
            <Menu
              mode="inline"
              defaultOpenKeys={this.state.sider.expandKeys}
              selectedKeys={[current ? current.siderKey : ""]}
            >
              <Menu.Item icon={<HomeOutlined />} key={ROUTE_DASHBOARD} style={{ marginTop: "0px" }}>
                <Link to="/">{this.props.t("common.sider.dashboard")}</Link>
              </Menu.Item>
              {this.props.reduxProps.isAdmin && (
                <Menu.Item icon={<AppstoreOutlined />} key={ROUTE_CLIENTS}>
                  <Link to="/clients">{this.props.t("common.sider.clients")}</Link>
                </Menu.Item>
              )}
            </Menu>
          </Sider>
          {this.state.responsive && (
            <Drawer
              closable={false}
              placement="left"
              visible={!this.state.sider.collapsed}
              zIndex={1028}
              bodyStyle={{ padding: "64px 0 0" }}
              onClose={() => this.setState({ sider: { collapsed: true } })}
            >
              <Menu
                mode="inline"
                defaultOpenKeys={this.state.sider.expandKeys}
                selectedKeys={[current ? current.siderKey : ""]}
                onSelect={() => this.setState({ sider: { collapsed: true } })}
              >
                <Menu.Item icon={<HomeOutlined />} key={ROUTE_DASHBOARD} style={{ marginTop: "0px" }}>
                  <Link to="/">{this.props.t("common.sider.dashboard")}</Link>
                </Menu.Item>
                {this.props.reduxProps.isAdmin && (
                  <Menu.Item icon={<AppstoreOutlined />} key={ROUTE_CLIENTS}>
                    <Link to="/clients">{this.props.t("common.sider.clients")}</Link>
                  </Menu.Item>
                )}
              </Menu>
            </Drawer>
          )}
          <Layout className="ant-layout-main">
            <PageHeader
              title={headerTitle}
              avatar={{ icon: React.createElement(headerIcon), shape: "square" }}
              backIcon={this.props.reduxProps.routes.length > 1 ? <ArrowLeftOutlined /> : false}
              onBack={() => {
                this.props.history.replace(this.props.reduxProps.routes[this.props.reduxProps.routes.length - 2].path);
              }}
              breadcrumb={{ itemRender: this.itemRender.bind(this), routes: this.props.reduxProps.routes }}
              extra={[
                current && current.breadcrumbName === ROUTE_CLIENTS && (
                  <Button
                    type="primary"
                    icon={<AppstoreAddOutlined />}
                    onClick={() => this.props.history.push("clients/add")}
                  >
                    {this.props.t("clients.btnNewClient.label")}
                  </Button>
                ),
              ]}
            />
            <Content>
              <Switch>
                <Route exact path="/">
                  <Scrollbars>
                    <DashboardView />
                  </Scrollbars>
                </Route>
                <Route path="/clients">
                  <Scrollbars>
                    <ClientsView broken={this.state.responsive} />
                  </Scrollbars>
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>©2021 franguerrero - Practica Master Desarrollo Software - IW 0.1.0</Footer>
          </Layout>
        </Layout>
      </Layout>
    ) : (
      <Splash authError={this.state.authError} />
    );
  }
}

export default withTranslation()(withRouter(connector(App)));
