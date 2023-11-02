import React, { Component } from "react";
import "./style.css";

export default class Forgot extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content container">
          <div className="card">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="card-body">
                  <div className="logoHead">
                    <img
                      src=""
                      alt=""
                      height="60px"
                      width="60px"
                      className="sticky-logo img-fluid"
                    />
                    <h3>Pedu</h3>
                  </div>
                  <h4 className="mb-3 f-w-400">Reset your password</h4>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="feather icon-mail" />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                    />
                  </div>
                  <button className="btn btn-primary shadow-2 mb-4">
                    Reset password
                  </button>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{" "}
                    <a
                      href={`${process.env.PUBLIC_URL}/register`}
                      className="f-w-400"
                    >
                      Signup
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="/images/login_banner.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
