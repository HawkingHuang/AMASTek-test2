const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");

let myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        yAxisID: "A",
        barThickness: 60,
        backgroundColor: [
          "rgba(40, 36, 60, 0.4)",
          "rgba(40, 36, 60, 0.4)",
          "rgba(40, 36, 60, 0.4)",
        ],
        borderColor: [
          "rgba(40, 36, 60, 1)",
          "rgba(40, 36, 60, 1)",
          "rgba(40, 36, 60, 1)",
        ],
        borderWidth: 1,
        label: "",
        data: [],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: [],
      },
      A: {
        type: "linear",
        position: "left",
        ticks: { beginAtZero: true, color: "blue" },
        grid: { display: false },
      },
      B: {
        type: "linear",
        position: "right",
        ticks: { beginAtZero: true, color: "green" },
        grid: { display: false },
      },
    },
  },
});

const firstThreeApiUrls = [
  "https://run.mocky.io/v3/cf8ff54a-40af-4907-91df-3a24bfb75c5f",
  "https://run.mocky.io/v3/827936fd-d288-4ec0-8c05-865878ef4409",
  "https://run.mocky.io/v3/18edb8c1-99c9-4f8c-9150-6a5508edbde1",
];

const lastTwoApiUrls = [
  "https://run.mocky.io/v3/82b0ad83-4b4c-4fe7-a89d-8b88eb5c263b",
  "https://run.mocky.io/v3/b27275e1-f9d5-4a0c-94a8-aa84408bffd0?mocky-delay=1500ms",
];

const firstThreePromises = firstThreeApiUrls.map((url, index) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const datasetLabel = data.name;

      const dataset = {
        label: datasetLabel,
        data: data.data.map((entry) => parseFloat(entry.Data)),
        backgroundColor: `rgba(${index * 50 + 20}, 36, 60, 0.4)`,
        borderColor: `rgba(${index * 50 + 20}, 36, 60, 1)`,
        borderWidth: 1,
      };

      if (index === 0) {
        myChart.data.labels = data.data.map((entry) => entry.Time);
      }

      myChart.data.datasets.push(dataset);
    })
);

const lastTwoPromises = lastTwoApiUrls.map((url, index) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const datasetLabel = data.name;

      const dataset = {
        label: datasetLabel,
        data: data.data.map((entry) => parseFloat(entry.Data)),
        borderColor: `rgba(${index * 50 + 20}, 36, 60, 1)`,
        borderWidth: 1,
        fill: false,
        yAxisID: "B",
        pointRadius: 0,
        type: "line",
      };

      if (index === 0) {
        myChart.options.scales.x.labels = data.data.map((entry) => entry.Time);
      }

      myChart.data.datasets.push(dataset);
    })
);

Promise.allSettled([...firstThreePromises, ...lastTwoPromises]).then(() => {
  myChart.update();
});
