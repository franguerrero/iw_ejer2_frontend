import "./Clients.less";

import React, { Component } from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { Card, Layout } from "antd";

import ClientList from "../components/client/ClientList";
import AddClient from "../components/client/AddClient";
import UpdateClient from "../components/client/UpdateClient";

interface IProps extends RouteComponentProps {
  broken: boolean;
}

interface IState {}

const { Content } = Layout;

class Clients extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="ant-content-view landing-view-clients">
        <Switch location={this.props.location}>
          <Route exact path={this.props.match.path}>
            <ClientList broken={this.props.broken} />
          </Route>
          <Route path={`${this.props.match.path}/add`}>
            <AddClient broken={this.props.broken} />
          </Route>
          <Route path={`${this.props.match.path}/edit/:clientId`}>
            <UpdateClient broken={this.props.broken} />
          </Route>
        </Switch>
      </Card>
    );
  }
}

export default withRouter(Clients);
