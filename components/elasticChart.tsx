import React from "react"
import dynamic from "next/dynamic"

type Props = {
  xData: number[]
  yData: number[]
}

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

export default function SimpleChart({ xData, yData }: Props) {
  const series = [
    {
      name: "Average rating", //will be displayed on the y-axis
      data: yData,
    },
  ]
  const options = {
    chart: {
      id: "simple-bar",
      animations: {
        enabled: true,
        speed: 600,
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: "Average rating",
      },
      labels: {
        formatter: function (val: any) {
          return val.toFixed(2)
        },
      },
    },
    xaxis: {
      title: {
        text: "Year",
      },
      categories: xData, //will be displayed on the x-asis
    },
  }
  return (
    <>
      <Chart
        options={options}
        type="bar"
        series={series}
        width="100%"
        height="50%"
      />
    </>
  )
}

export function AreaChart({ xData, yData }: Props) {
  var options: any = {
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "TEAM A",
        type: "area",
        data: xData,
      },
    ],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: [0.35, 1],
    },
    labels: yData,
    markers: {
      size: 0,
    },
    yaxis: [
      {
        title: {
          text: "Series A",
        },
      },
      {
        opposite: true,
        title: {
          text: "Series B",
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points"
          }
          return y
        },
      },
    },
  }

  return (
    <>
      <Chart
        options={options}
        type="bar"
        series={options.series}
        width="100%"
        height="50%"
      />
    </>
  )
}