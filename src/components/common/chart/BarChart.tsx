import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { useMedia } from "src/shared/hooks/useMedia";
import { colors } from "src/styles/colors";
import { useWindowSize } from "usehooks-ts";

export type BarChartProps = {
  data: { label: string; value: number }[];
};

const BarChart = ({ data }: BarChartProps) => {
  const { isMobile } = useMedia();
  const { width } = useWindowSize();

  return (
    <Bar
      key={String(width)}
      options={{
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            color: colors["text-primary"],
            font: {
              size: 13,
              lineHeight: 20,
            },
            formatter: (value, context) => {
              const maxValue = Math.max(...data.map((d) => d.value));
              const percentage = (value / maxValue) * 100;

              if (
                percentage <
                data[context.dataIndex].label.length * (isMobile ? 3 : 1.5)
              ) {
                return "";
              }
              return data[context.dataIndex].label;
            },
          },
          title: {
            color: colors["text-disabled"],
            font: {
              size: 13,
              lineHeight: 20,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            ticks: {
              callback(_, index) {
                return index + 1;
              },
              padding: 0,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      }}
      data={{
        labels: data.map((d) => d.label),
        datasets: [
          {
            data: data.map((d) => d.value),
            backgroundColor: [colors["astra-main"]],
            borderRadius: 6,
            barThickness: 28, // Width of the bar
          },
        ],
      }}
      plugins={[ChartDataLabels]}
    />
  );
};

export default BarChart;
