import { Box } from "@mui/joy";
import { Chart, ChartData, ChartOptions, LegendItem, Plugin } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useId } from "react";
import { Doughnut } from "react-chartjs-2";
import { colors } from "src/styles/colors";

const getConfigChart = (legendID: string) =>
  ({
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      datalabels: {
        color: colors["text-primary"],
        font: {
          size: 15,
        },
        formatter: (value, context) => {
          const init = 0;
          const data = context.dataset.data as number[];
          const total = data.reduce((acc, curr) => acc + curr, init);

          if (value === 0) return "";

          // Calculate percentage for each value
          const percentages = data.map((val) =>
            Math.floor((val * 100) / total)
          );

          // Calculate total percentage
          const totalPercentage = percentages.reduce(
            (acc, curr) => acc + curr,
            0
          );

          // Find the value with highest percentage
          const maxIndex = percentages.indexOf(Math.max(...percentages));

          // Adjust the maximum value to ensure total is 100%
          if (totalPercentage < 100) {
            percentages[maxIndex] += 100 - totalPercentage;
          }

          // Get percentage of current value
          const percentage = percentages[context.dataIndex];

          // Check if percentage is too small (e.g., < 1%), display "<1%" instead of "0%"
          return percentage === 0 ? "<1%" : `${percentage}%`;
        },
      },
      legend: {
        display: false,
      },
      htmlLegend: {
        containerID: legendID,
      },
    },
    cutout: 100,
  } as ChartOptions<"doughnut">);

const getOrCreateLegendList = (_: Chart<"doughnut">, id: string) => {
  const legendContainer = document.getElementById(id);

  let listContainer = legendContainer?.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.margin = "0";
    listContainer.style.padding = "0";
    listContainer.style.flexWrap = "wrap";
    listContainer.style.marginTop = "47px";

    legendContainer?.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin: Plugin<"doughnut"> = {
  id: "htmlLegend",
  afterUpdate(
    chart: Chart<"doughnut">,
    _: unknown,
    options: { containerID: string }
  ) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart?.options?.plugins?.legend?.labels?.generateLabels?.(
      chart as Chart
    ) as LegendItem[];

    items.forEach((item: LegendItem) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginRight = "20px";

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle as string;
      boxSpan.style.borderColor = item.strokeStyle as string;
      boxSpan.style.borderWidth = String(item.lineWidth) + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.height = "10px";
      boxSpan.style.marginRight = "4px";
      boxSpan.style.width = "10px";
      boxSpan.style.borderRadius = "50%";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor as string;
      textContainer.style.margin = "0";
      textContainer.style.padding = "0";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";
      textContainer.style.fontSize = "13px";
      textContainer.style.lineHeight = "20px";
      textContainer.style.whiteSpace = "nowrap";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

Chart.register(htmlLegendPlugin);

const DoughnutChart = ({ data }: { data: ChartData<"doughnut"> }) => {
  const idLegend = useId();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "280px",
          margin: "0 auto",
        }}
      >
        <Doughnut
          options={getConfigChart(idLegend)}
          data={data}
          plugins={[ChartDataLabels, htmlLegendPlugin] as Plugin<"doughnut">[]}
        />
      </Box>
      <Box id={idLegend} />
    </>
  );
};

export default DoughnutChart;
