import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { apiUrl } from "../../config/constants";

import { selectHistoricalData } from "../../store/data/selectors";
import { fetchHistoricalData } from "../../store/data/actions";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const buildChartDataGlobal = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const buildChartDataCountry = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.timeline && data.timeline[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data.timeline[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data.timeline[casesType][date];
  }
  return chartData;
};

function Chart(props) {
  const historicalData = useSelector(selectHistoricalData);
  const dispatch = useDispatch();

  useEffect(() => {
    const historicalDataUrl =
      props.countryName === "Global"
        ? `${apiUrl}/historical/all?lastdays=120`
        : `${apiUrl}/historical/${props.countryName}?lastdays=120`;
    dispatch(fetchHistoricalData(historicalDataUrl));
  }, [dispatch, props.countryName]);

  let chartData =
    props.countryName === "Global"
      ? buildChartDataGlobal(historicalData, props.casesType)
      : buildChartDataCountry(historicalData, props.casesType);

  return (
    <div className="chart-data">
      {chartData && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor:
                  props.casesType === "recovered"
                    ? "rgb(102, 211, 102,0.5)"
                    : "rgb(255, 101, 29, 0.5)",
                borderColor:
                  props.casesType === "recovered"
                    ? "rgb(102, 211, 102)"
                    : "rgb(255, 101, 29)",
                height: "200px",
                data: chartData,
              },
            ],
          }}
          height={200}
          options={options}
        />
      )}
    </div>
  );
}

export default Chart;
