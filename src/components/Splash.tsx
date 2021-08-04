import React, { Component } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button, Layout, Result, Spin } from "antd";


import config from "../config/config";

interface IProps extends WithTranslation {
  authError: any;
}

interface IState {}

class Splash extends Component<IProps, IState> {
  render() {
    return (
      <Layout className="splash-view">
        <img
          alt=""
          src={`${config.baseURL}/logo.png`}
          width="256"
          style={{ display: "block", margin: "0 auto 24px" }}
        />
        {this.props.authError ? (
          <Result
            status="403"
            title={this.props.t("common.authError.title")}
            subTitle={this.props.t("common.authError.message")}
            extra={[
              <Button
                type="primary"
                onClick={() => {
                  
                }}
              >
                {this.props.t("common.btnLogout")}
              </Button>,
            ]}
          />
        ) : (
          <Spin size="large" />
        )}
      </Layout>
    );
  }
}

export default withTranslation()(Splash);
