import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class CardsService extends BaseHttpService {
  fetchCards({ status, search }) {
    const queryObj = {};

    if (status.length) {
      queryObj.status = status;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('cards' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteCard(id) {
    await this.delete(`cards/${id}`);
  }

  updateCardStatus(id, status) {
    return this.patch(`cards/${id}/status`, { status });
  }

  createCard(title, description) {
    return this.post(`cards`, { title, description });
  }
}
