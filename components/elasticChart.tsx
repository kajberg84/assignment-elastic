import React from "react"
import dynamic from "next/dynamic"

type Props = {
  xData: number[]
  yData: number[]
}

// Dynamic import of the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

/**
 * The simple bar chart component
 *
 * @export
 * @param {Props} { xData, yData }
 * @return {*} - Chart component
 */
export default function SimpleChart({ xData, yData }: Props) {
  const series = [
    {
      name: "Average popularity", //will be displayed on the y-axis
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
        text: "Average popularity",
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

