import axios from "axios";

export default class Api {
  errMsg = "Coudn't fetch";

  constructor(url) {
    this.apibase = url;
    this.headers = {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
  }

  msg(res) {
    if (res.status === 200) return res.data;
    throw new Error(`${this.errMsg} ${this.apibase}`);
  }

  async allVisits() {
    const res = await axios.get(`${this.apibase}/visits`, this.headers);
    return this.msg(res);
  }

  async register(userData) {
    const res = await axios.post(`${this.apibase}/user/register`, userData);
    return this.msg(res);
  }

  async login(object) {
    const res = await axios.post(`${this.apibase}/user/login`, object);
    const { token } = res.data;
    localStorage.setItem("token", token);
    return this.msg(res);
  }

  async getAllDoctors() {
    const res = await axios.get(`${this.apibase}/doctors`, this.headers);
    return this.msg(res);
  }
}
