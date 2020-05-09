import AbstractComponent from './abstract-component';

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const ACTIVE_CLASS = `sort__button--active`;

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${ACTIVE_CLASS}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._sortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._sortType;
  }

  setSortTypeChangeHandler(handler) {
    const sortItems = this.getElement().querySelectorAll(`.sort__button`);

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._sortType === sortType) {
        return;
      }

      sortItems.forEach((item) => {
        item.classList.remove(ACTIVE_CLASS);
      });
      evt.target.classList.add(ACTIVE_CLASS);

      this._sortType = sortType;
      handler(this._sortType);
    });
  }
}
