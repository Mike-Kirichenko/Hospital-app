import axios from "axios";

export default class Api {
  errMsg = "Coudn't fetch";

  constructor(url) {
    this.apibase = url;
  }

  msg(res) {
    if (res.status === 200) return res.data;
    throw new Error(`${this.errMsg} ${this.apibase}`);
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
}
