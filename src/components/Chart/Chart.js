import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  console.log("chartData here", chartData);
  return chartData;
};

function Chart(props) {
  const historicalData = useSelector(selectHistoricalData);
  console.log("data before useEffect", historicalData);
  const dispatch = useDispatch();
  useEffect(() => {
    const historicalDataUrl =
      props.countryName === "Global"
        ? `${apiUrl}/historical/all?lastdays=120`
        : `${apiUrl}/historical/${props.countryName}?lastdays=120`;
    dispatch(fetchHistoricalData(historicalDataUrl));
    console.log("chartData in useeffect", historicalData);
  }, [dispatch, props.countryName]);
  let chartData =
    props.countryName === "Global"
      ? buildChartDataGlobal(historicalData, props.casesType)
      : buildChartDataCountry(historicalData, props.casesType);

  return (
    <div>
      {chartData && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(255, 169, 130, 0.5)",
                borderColor: "rgb(255, 81, 0)",
                data: chartData,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Chart;
