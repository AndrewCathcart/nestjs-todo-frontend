import { observable, action } from "mobx";

export default class CardsStore {
  @observable cards = [];
  @observable filters = { status: "", search: "" };

  constructor(cardsService) {
    this.cardsService = cardsService;
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchCards();
  }

  @action
  resetCards() {
    this.cards = [];
  }

  @action
  async fetchCards() {
    const result = await this.cardsService.fetchCards(this.filters);

    if (result) {
      this.cards = result.data;
    }
  }

  @action
  async createCard(title, description) {
    const result = await this.cardsService.createCard(title, description);

    if (result) {
      this.cards.push(result.data);
    }
  }

  @action
  async deleteCard(id) {
    const idx = this.cards.findIndex((card) => card.id === id);
    await this.cardsService.deleteCard(id);
    this.cards.splice(idx, 1);
  }

  @action
  async updateCardStatus(id, status) {
    const card = this.cards.find((card) => card.id === id);
    await this.cardsService.updateCardStatus(id, status);
    card.status = status;
  }
}
