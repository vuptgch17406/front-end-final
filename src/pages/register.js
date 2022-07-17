import React from "react";
import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

const Register = () => {
  const [user, setUser] = useState({});
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        answer: user.answer
      });
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) navigate("/");

  return (
    <main>
      <div className="container-fluid">
        <div className="row py-5 bg-secondary text-light">
          <div className="col text-center">
            <h1>Register</h1>
          </div>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <Input
              title="Enter your name"
              type="name"
              name="name"
              placeholder="Enter your name"
              handleChange={handleChange}
            />
            <Input
              title="Enter your e-mail address"
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              handleChange={handleChange}
            />
            <Input
              title="Enter your password"
              type="password"
              name="password"
              placeholder="Enter your password"
              handleChange={handleChange}
            />
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Pick a question</label>
              </small>
              <select className="form-select">
                <option selected disabled hidden>
                  Choose an option ...
                </option>
                <option>What is your favorite color?</option>
                <option>What is your best friend's name?</option>
                <option>What city you were born?</option>
              </select>
            </div>
            <small className="form-text text-muted">
              ⁉ You can use this to reset your password if forgotten.
            </small>
            <Input
              title="Enter your answer"
              type="text"
              name="answer"
              placeholder="Write your answer here"
              handleChange={handleChange}
            />
            <div className="form-group p-2 d-flex justify-content-center">
              <button
                className="btn btn-dark"
                disabled={!user.name || !user.email || !user.password || !user.answer}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Register"}
              </button>
            </div>
          </form>
          <div className="row">
            <div className="col">
              <p className="text-center">
                Already user? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <Modal
              title="Congratulation!!!"
              visible={ok}
              onCancel={() => setOk(false)}
              footer={null}>
              <p>Register successfully</p>
              <Link to="/login" className="btn btn-dark btn-sm">
                Go to Login
              </Link>
            </Modal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
