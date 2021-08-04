import "./Dashboard.less";

import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Card, Layout, Spin } from "antd";

import { navigate } from "../redux/actions";
import apiClient from "../api/client.api";
import { IClient } from "../models/IClient";

import { ROUTE_DASHBOARD } from "../routes";

const connector = connect(null, {
  navigate,
});

interface IProps extends ConnectedProps<typeof connector> {}

interface IState {
  isLoading: boolean;
  clients: IClient[];
}

const { Content } = Layout;
const { Meta } = Card;

class Dashboard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoading: true, clients: [] };
  }

  async componentDidMount() {
    this.props.navigate({ key: ROUTE_DASHBOARD });

    this.setState({ isLoading: true });
    try {
      const data = await apiClient.loadClients();
      this.setState({ clients: data.clients.sort((a: IClient, b: IClient) => a.name.localeCompare(b.name)) });
    } catch (ex) {
    } finally {
      this.setState({ isLoading: false });
    }
  }

  parseImage(client: IClient): string {
    if (client.image && client.image.data && client.image.contentType) {
      return (
        "data:" + client.image.contentType + ";base64," + btoa(String.fromCharCode.apply(null, client.image.data.data))
      );
    }
    return "";
  }

  onClientClick(rootUrl: string) {
    window.open(rootUrl, "_blank");
  }

  render() {
    return (
      <div className="ant-content-view landing-view-home">
        {this.state.isLoading ? (
          <div style={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "64px 0 0" }}>
            <Spin size="large" />
          </div>
        ) : (
          <div className="clients-grid">
            {this.state.clients.map((client: IClient, index) => (
              <Card
                key={client._id + index}
                hoverable
                cover={
                  <div>
                    <img alt={client.name} src={this.parseImage(client)} />
                  </div>
                }
                onClick={() => {
                  this.onClientClick(client.rootUrl);
                }}
              >
                <Meta title={client.name} />
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default connector(Dashboard);
