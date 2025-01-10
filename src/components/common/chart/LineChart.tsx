import { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { number2USD } from "src/helpers/formatNumber";
import { colors } from "src/styles/colors";
import { useWindowSize } from "usehooks-ts";

const LINE_CHART_OPTIONS = (label: string[]) =>
  ({
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      intersect: false,
      axis: "x",
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: colors.divider,
          drawTicks: false,
        },
        ticks: {
          display: true,
          callback(value) {
            return number2USD(value);
          },
        },
      },
      x: {
        grid: {
          color: colors.divider,
        },
        ticks: {
          callback(_, index) {
            return label[index];
          },
        },
      },
    },
  } as ChartOptions<"line">);

interface LineChartProps {
  labels: string[];
  buyData: number[];
  sellData: number[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, buyData, sellData }) => {
  const { width } = useWindowSize();

  const data: ChartData<"line"> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Buy",
          fill: true,
          data: buyData,
          backgroundColor: colors["astra-main"],
          borderColor: colors["astra-main"],
        },
        {
          label: "Sell",
          fill: true,
          data: sellData,
          backgroundColor: colors["astra-dark-pink"],
          borderColor: colors["astra-dark-pink"],
        },
      ],
    }),
    [buyData, labels, sellData]
  );

  return (
    <Line
      key={String(width)}
      options={LINE_CHART_OPTIONS(labels)}
      data={data}
    />
  );
};

export default LineChart;
