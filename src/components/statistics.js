import AbstractSmartComponent from './abstract-smart-component';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getHours, getMinutesLeft} from '../utils/common';
import {getWatchedMovies} from '../utils/filter';

const BAR_HEIGHT = 50;

const chartProps = (genres) => {
  const genresSorted = [...genres].sort((a, b) => b.count - a.count);
  const labels = genresSorted.map((item) => item.name);
  const data = genresSorted.map((item) => item.count);
  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
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
          barThickness: 24
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
    .reduce((acc, movie) => [...acc, ...movie.genres], [])
    .filter((item, index, array) => array.indexOf(item) === index);

  return genres.reduce((acc, genre) => {
    acc.push({
      name: genre,
      count: calcGenreCount(movies, genre)
    });
    return acc;
  }, []);
};

// ============================================================================

const createStatsMarkup = (watchedMovies, genresWithCount) => {
  const watchedFilmsNumber = watchedMovies.length;

  const INITIAL_TIME_WATCHED = 0;

  const totalDuration = watchedMovies.reduce((acc, movie) => {
    return acc + movie.duration;
  }, INITIAL_TIME_WATCHED);

  const favouriteGenre = genresWithCount.reduce((previousGenre, genre) => {
    return (genre.count > previousGenre.count) ? genre : previousGenre;
  }, {name: ``, count: 0});

  const totalHoursDuration = getHours(totalDuration);
  const minutesLeft = getMinutesLeft(totalDuration);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

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
          <p class="statistic__item-text">${favouriteGenre.name}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(movies) {
    super();
    this._movies = movies;
    this._watchedMovies = getWatchedMovies(this._movies);

    this._genresData = getGenresQuantityData(this._watchedMovies);
  }

  getTemplate() {
    return createStatsMarkup(this._watchedMovies, this._genresData);
  }

  renderChart() {
    if (this._watchedMovies.length) {
      const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
      statisticCtx.height = BAR_HEIGHT * this._genresData.length;

      this._newChart = new Chart(statisticCtx, chartProps(this._genresData));
    }
  }
}
