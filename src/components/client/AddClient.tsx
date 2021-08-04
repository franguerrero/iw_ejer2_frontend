import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button, Form, Input, Select, Space, Switch, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

import apiClient from "../../api/client.api";
import { navigate } from "../../redux/actions";
import { ROUTE_CLIENTS_ADD } from "../../routes";

const connector = connect(null, {
  navigate,
});

interface IProps extends RouteComponentProps, WithTranslation, ConnectedProps<typeof connector> {
  broken: boolean;
}

interface IState {
  fileList: UploadFile[];
  inProgress: boolean;
}

const { TextArea } = Input;
const { Option, OptGroup } = Select;

class ClientForm extends Component<IProps, IState> {
  formRef = React.createRef<FormInstance>();

  constructor(props: IProps) {
    super(props);
    this.state = { fileList: [], inProgress: false };
  }

  async componentDidMount() {
    this.props.navigate({ key: ROUTE_CLIENTS_ADD });
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
      formData.append("file", this.state.fileList[0].originFileObj as Blob);
      formData.append("clientId", values.clientId);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("rootUrl", values.rootUrl);
      formData.append("groups", values.groups);
      
      await apiClient.addClient(formData);

      message.success(this.props.t("clients.page_add.msgAddSuccess"));
      this.props.history.replace("/clients");
    } catch (ex) {
      message.error(this.props.t("clients.page_add.msgAddFail"));
    } finally {
      this.setState({ inProgress: false });
    }
  }

  render() {
    return (
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
        <Form.Item
          name="file"
          wrapperCol={this.props.broken ? { offset: 0 } : { offset: 8 }}
          rules={[{ required: true, message: this.props.t("clientForm.thumbnail.message") }]}
        >
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
    );
  }
}

export default withTranslation()(withRouter(connector(ClientForm)));
