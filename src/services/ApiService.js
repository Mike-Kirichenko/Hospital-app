import axios from "axios";

export default class Api {
  errMsg = "Coudn't fetch";

  constructor() {
    this.apibase = "http://localhost:3000/api/hospital";
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

  async allVisits(token) {
    const headers = {
      "x-access-token": token,
    };

    const res = await axios.get(`${this.apibase}/visits`, { headers });
    return this.msg(res);
  }

  async createVisit(object, token) {
    const headers = {
      "x-access-token": token,
    };

    const res = await axios.post(`${this.apibase}/visits`, object, { headers });
    return this.msg(res);
  }

  async updateOne(id, object, token) {
    const headers = {
      "x-access-token": token,
    };

    const res = await axios.patch(
      `${this.apibase}/visits/${id}`,
      object,
      headers
    );
    return this.msg(res);
  }

  async deleteOne(id, token) {
    const headers = {
      "x-access-token": token,
    };

    const res = await axios.delete(`${this.apibase}/visits/${id}`, { headers });
    return this.msg(res);
  }

  async getOne(id, token) {
    const headers = {
      "x-access-token": token,
    };

    const res = await axios.get(`${this.apibase}/visits/${id}`, { headers });
    return this.msg(res);
  }
}
