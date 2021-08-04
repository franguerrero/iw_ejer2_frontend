import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button, List, message, Modal, Spin, Tooltip, Typography } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined, SelectOutlined } from "@ant-design/icons";

import apiClient from "../../api/client.api";
import { IClient } from "../../models/IClient";
import { navigate } from "../../redux/actions";
import { ROUTE_CLIENTS } from "../../routes";

const connector = connect(null, {
  navigate,
});

interface IProps extends RouteComponentProps, WithTranslation, ConnectedProps<typeof connector> {
  broken: boolean;
}

interface IState {
  isLoading: boolean;
  clients: IClient[];
}

const { confirm } = Modal;
const { Text } = Typography;
const styleListAvatar = {
  padding: "4px",
  height: "32px",
  width: "32px",
  backgroundOrigin: "content-box",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

class ClientList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoading: true, clients: [] };

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.navigate({ key: ROUTE_CLIENTS });
    this.loadClients();
  }

  async loadClients() {
    this.setState({ isLoading: true });
    try {
      const data = await apiClient.loadClients();
      this.setState({ clients: data.clients.sort((a: IClient, b: IClient) => a.name.localeCompare(b.name)) || [] });
    } catch (ex) {
    } finally {
      this.setState({ isLoading: false });
    }
  }

  renderItem(client: IClient) {
    const actions = [
      <Tooltip placement="top" title={this.props.t("clients.btnDeleteClient.title")}>
        <Button icon={<DeleteOutlined />} type="link" danger onClick={() => this.onClientDeleteClick(client._id)} />
      </Tooltip>,
      <Tooltip placement="top" title={this.props.t("clients.btnEditClient.title")}>
        <Button icon={<EditOutlined />} type="link" onClick={() => this.onClientEditClick(client._id)} />
      </Tooltip>,
      <Tooltip placement="top" title={this.props.t("clients.btnViewClient.title")}>
        <Button icon={<SelectOutlined />} type="link" href={client.rootUrl} target="_blank" />
      </Tooltip>,
    ];
    return (
      <List.Item key={client._id} actions={this.props.broken ? actions.reverse() : actions}>
        <List.Item.Meta
          avatar={<div style={{ ...styleListAvatar, backgroundImage: "url(" + this.parseImage(client) + ")" }} />}
          title={<Text style={{ lineHeight: "32px" }}>{client.name}</Text>}
          description={client.description}
        />
      </List.Item>
    );
  }

  parseImage(client: IClient): string {
    if (client.image && client.image.data && client.image.contentType) {
      return (
        "data:" + client.image.contentType + ";base64," + btoa(String.fromCharCode.apply(null, client.image.data.data))
      );
    }
    return "";
  }

  onClientEditClick(clientId: string) {
    this.props.history.push("clients/edit/" + clientId);
  }

  onClientDeleteClick(clientId: string) {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: this.props.t("clients.btnDeleteClient.title"),
      content: (
        <div>
          <p>{this.props.t("clients.msgDelete.message")}</p>
          <p>{this.props.t("clients.msgDelete.confirm")}</p>
        </div>
      ),
      okText: this.props.t("common.btnDelete"),
      okButtonProps: { type: "primary", danger: true },
      cancelText: this.props.t("common.btnCancel"),
      onOk: async () => {
        try {
          const data = await apiClient.deleteClient(clientId);
          if (data.success) {
            message.success(this.props.t("clients.msgDeleteSuccess"));
            this.loadClients();
          } else {
            message.error(this.props.t("clients.msgDeleteFail"));
          }
        } catch (ex) {
          message.error(this.props.t("clients.msgDeleteFail"));
        }
      },
    });
  }

  render() {
    return (
      <List
        itemLayout={this.props.broken ? "vertical" : "horizontal"}
        dataSource={this.state.clients}
        loading={this.state.isLoading}
        rowKey={(client) => {
          return client._id;
        }}
        renderItem={this.renderItem}
      />
    );
  }
}

export default withTranslation()(withRouter(connector(ClientList)));
