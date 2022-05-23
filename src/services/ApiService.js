import axios from "axios";

export default class Api {
  errMsg = "Coudn't fetch";

  constructor() {
    this.apibase = "http://localhost:8000/api/hospital";
  }

  msg(res) {
    if (res.status === 200) return res.data;
    throw new Error(`${this.errMsg} ${this.apibase}`);
  }

  async login(object) {
    const res = await axios.post(`${this.apibase}/user/login`, object);
    return this.msg(res);
  }

  async register(object) {
    const res = await axios.post(`${this.apibase}/user/register`, object);
    return this.msg(res);
  }

  async allVisits() {
    const res = await axios.get(`${this.apibase}/visits`);
    return this.msg(res);
  }

  async createVisit(object) {
    const res = await axios.post(`${this.apibase}/visits`, object);
    return this.msg(res);
  }

  async updateOne(id, object) {
    const res = await axios.patch(`${this.apibase}/visits/${id}`, object);
    return this.msg(res);
  }

  async deleteOne(id) {
    const res = await axios.delete(`${this.apibase}/visits/${id}`);
    return this.msg(res);
  }

  async getOne(id) {
    const res = await axios.get(`${this.apibase}/visits/${id}`);
    return this.msg(res);
  }
}
