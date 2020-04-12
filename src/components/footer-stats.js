const createFooterStatsTemplate = (filmsNumber) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsNumber} movies inside</p>
    </section>`
  );
};

export {createFooterStatsTemplate};
