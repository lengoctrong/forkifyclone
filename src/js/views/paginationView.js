import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevBtn = `
    <button data-go-to=${curPage - 1} class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;
    const nextBtn = `
    <button data-go-to=${curPage + 1} class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
    </button>
    `;

    const pagesView = `
    <button class="btn--inline pagination__btn--center">
      <span>Page ${curPage}/${numPages}</span>
    </button>
      `;

    // Page 1, no others
    if (curPage === 1 && numPages === 1) return;
    // page 1, others
    if (curPage === 1 && numPages > 1) {
      return pagesView + nextBtn;
    }
    // last page, others
    if (curPage === numPages && numPages > 1) {
      return prevBtn + pagesView;
    }
    // others
    if (curPage > 1 && curPage < numPages && numPages > 1) {
      return prevBtn + pagesView + nextBtn;
    }
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goTo;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
