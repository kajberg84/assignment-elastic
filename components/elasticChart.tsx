import React from "react"
import dynamic from "next/dynamic"

type Props = {
  xData: number[]
  yData: number[]
}

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

export default function SampleLine({ xData, yData }: Props) {
  // itterate data and insert in data and categories
  // render at index.tsx

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
      labels: {
        formatter: function (val: any) {
          return val.toFixed(2)
        },
      },
    },
    xaxis: {
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
