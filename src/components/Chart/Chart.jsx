import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

function Chart({ data: { confirmed, recovered, deaths }, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ reportDate }) => reportDate),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed.total),
              label: "Confirmed",
              borderColor: "blue",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths.total),
              label: "Deaths",
              borderColor: "red",
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
}

export default Chart;
