import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  labels: string[];
  data: number[];
  colors: string[];
  centerValue: string | number;
  centerLabel?: string;
  cutout?: string;
}

const DonutChart = ({
  labels,
  data,
  colors,
  centerValue,
  centerLabel,
  cutout = "75%",
}: DonutChartProps) => {
  const validData =
    data.length === 0 || data.every((v) => v === 0) ? [1] : data;

  const chartData = {
    labels: labels.length ? labels : ["No Data"],
    datasets: [
      {
        data: validData,
        backgroundColor:
          data.length === 0 || data.every((v) => v === 0)
            ? ["#E5E7EB"]
            : colors,
        borderWidth: 0,
        cutout,
      },
    ],
  };

  return (
    <div className="relative w-[230px] h-[230px]">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: { display: false },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl lg:text-xl font-bold text-[#201F24]">
          {centerValue}
        </p>
        {centerLabel && (
          <p className="text-base lg:text-xs text-[#696868]">{centerLabel}</p>
        )}
      </div>
    </div>
  );
};

export default DonutChart;
