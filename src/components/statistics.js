import AbstractComponent from "./abstract-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getHours, getMinutesLeft, isChecked, getUserRating} from '../utils/common';
import {TimePeriod, timePeriodToItemName} from '../const';

const BAR_HEIGHT = 50;
const FIRST_INDEX = 0;
const SECOND_INDEX = 1;

const chartProps = (genres) => {
  const labels = genres.map((item) => item[FIRST_INDEX]);
  const values = genres.map((item) => item[SECOND_INDEX]);

  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  };
};

const calcGenreCount = (movies, genre) => {
  return movies.filter((item) => item.genres.includes(genre)).length;
};

const getGenresQuantityData = (movies) => {
  const genres = movies
    .reduce((acc, movie) => {
      return (movie.genres.length) ? [...acc, ...movie.genres] : acc;
    }, [])
    .filter((item, index, array) => array.indexOf(item) === index)
    .reduce((acc, genre) => {
      return Object.assign(acc, {[genre]: calcGenreCount(movies, genre)});
    }, {});

  return Object.entries(genres)
    .sort((a, b) => b[SECOND_INDEX] - a[SECOND_INDEX]);
};

// ============================================================================

const createRadiosMarkup = (name, period = TimePeriod.ALL) => {
  const isActive = period ? isChecked(name === period) : TimePeriod;
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name}" value="${name}" ${isActive}>
    <label for="statistic-${name}" class="statistic__filters-label">${timePeriodToItemName[name]}</label>`
  );
};

const createStatsMarkup = (watchedMovies, genresWithCount, period) => {
  const watchedFilmsNumber = watchedMovies.length;
  const userRating = getUserRating(watchedMovies);

  const INITIAL_TIME_WATCHED = 0;

  const totalDuration = watchedMovies.reduce((acc, movie) => {
    return acc + movie.duration;
  }, INITIAL_TIME_WATCHED);

  const favouriteGenre = genresWithCount.length ? genresWithCount[FIRST_INDEX][FIRST_INDEX] : ``;

  const totalHoursDuration = getHours(totalDuration);
  const minutesLeft = getMinutesLeft(totalDuration);

  const filterItems = Object.values(TimePeriod).map((item) => {
    return createRadiosMarkup(item, period);
  }).join(`\n`);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRating}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${filterItems}
      </form>

      <section class="statistic__stats-container">
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${watchedFilmsNumber} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${totalHoursDuration} <span class="statistic__item-description">h</span> ${minutesLeft} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${favouriteGenre}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>

    </section>`
  );
};

export default class Statistics extends AbstractComponent {
  constructor(movies, period) {
    super();
    this._movies = movies;
    this._genresData = getGenresQuantityData(this._movies);
    this._activePeriod = period || TimePeriod.ALL;
  }

  getTemplate() {
    return createStatsMarkup(this._movies, this._genresData, this._activePeriod);
  }

  setTimePeriodToggleHandler(handler) {
    const radios = this.getElement().querySelectorAll(`input[name="statistic-filter"]`);
    radios.forEach((item) => {
      item.addEventListener(`change`, () => {
        handler(item.value);
        this._activePeriod = item.value;
      });
    });
  }

  getStatsElement() {
    return this.getElement().querySelector(`.statistic__stats-container`);
  }

  renderChart() {
    if (this._movies.length) {
      const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
      statisticCtx.height = BAR_HEIGHT * this._genresData.length;

      this._newChart = new Chart(statisticCtx, chartProps(this._genresData));
    }
  }
}
