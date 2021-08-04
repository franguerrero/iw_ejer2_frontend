import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button, Form, Input, Select, Space, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

import apiClient from "../../api/client.api";
import { IClient } from "../../models/IClient";
import { navigate } from "../../redux/actions";
import { ROUTE_CLIENTS_UPDATE } from "../../routes";

const connector = connect(null, {
  navigate,
});

interface IProps extends RouteComponentProps, WithTranslation, ConnectedProps<typeof connector> {
  broken: boolean;
}

interface IState {
  fileList: UploadFile[];
  inProgress: boolean;
  isLoading: boolean;
  client?: IClient;
}

const { TextArea } = Input;
const { Option, OptGroup } = Select;

class UpdateClient extends Component<IProps, IState> {
  formRef = React.createRef<FormInstance>();

  constructor(props: IProps) {
    super(props);
    this.state = { fileList: [], inProgress: false, isLoading: true };
  }

  async componentDidMount() {
    this.props.navigate({ key: ROUTE_CLIENTS_UPDATE });

    this.setState({ isLoading: true });
    try {
      let data = await apiClient.loadClientInfo((this.props.match.params as any)["clientId"]);
      this.setState({ client: data.client });
      this.formRef.current?.setFieldsValue({
        
        clientId: data.client.clientId,
        name: data.client.name,
        description: data.client.description,
        rootUrl: data.client.rootUrl,
        groups: data.client.groups,
      });
    } catch (ex) {
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onUploadChange(param: UploadChangeParam) {
    if (param.fileList.length) {
      const fileList = [param.fileList.pop() as UploadFile];
      this.setState({ fileList });
    }
  }

  async onSubmit(values: any) {
    this.setState({ inProgress: true });

    try {
      let formData = new FormData();
      formData.append("_id", this.state.client?._id || "");
      formData.append("clientId", values.clientId);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("rootUrl", values.rootUrl);
      formData.append("groups", values.groups);
      if (this.state.fileList.length) {
        formData.append("file", this.state.fileList[0].originFileObj as Blob);
      }
      const data = await apiClient.updateClient(formData);

      if (data.success) {
        message.success(this.props.t("clients.page_update.msgUpdateSuccess"));
        this.props.history.replace("/clients");
      } else {
        message.success(this.props.t("clients.page_update.msgUpdateFail"));
      }
    } catch (ex) {
      message.success(this.props.t("clients.page_update.msgUpdateFail"));
    } finally {
      this.setState({ inProgress: false });
    }
  }

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoading}>
        <Form
          layout={this.props.broken ? "vertical" : "horizontal"}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          ref={this.formRef}
          requiredMark={false}
          onFinish={(values) => this.onSubmit(values)}
        >
          <Form.Item
            name="name"
            label={this.props.t("clientForm.name.label")}
            rules={[{ required: true, message: this.props.t("clientForm.name.message") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={this.props.t("clientForm.description.label")}
            rules={[{ required: true, message: this.props.t("clientForm.description.message") }]}
          >
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Form.Item
            name="rootUrl"
            label={this.props.t("clientForm.rootUrl.label")}
            rules={[{ required: true, message: this.props.t("clientForm.rootUrl.message") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="file" wrapperCol={this.props.broken ? { offset: 0 } : { offset: 8 }}>
            <Upload
              accept="image/svg+xml,image/png,image/jpeg"
              multiple={false}
              fileList={this.state.fileList}
              beforeUpload={() => {
                return false;
              }}
              onChange={(param) => this.onUploadChange(param)}
            >
              <Button icon={<UploadOutlined />}>{this.props.t("clientForm.thumbnail.label")}</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={this.props.broken ? { offset: 0 } : { offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={this.state.inProgress}>
                {this.props.t("common.btnSubmit")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

export default withTranslation()(withRouter(connector(UpdateClient)));
