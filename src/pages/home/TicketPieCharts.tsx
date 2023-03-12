import { Box } from "@pankod/refine-mui";
import { PieChart } from "components";

const PieCharts = () => {
  const ticketData = [
    {
      title: "Ticket Completion",
      series: [65, 25, 10],
      colors: ["#00cc00", "#ff0066", "#e7e713"],
      labels: ["completed", "in progress", "new"],
    },
    {
      title: "Ticket by Type",
      series: [50, 40, 10],
      colors: ["#00cc00", "#9933ff", "#0000cc"],
      labels: ["Function", "UI/UX", "others"],
    },
    {
      title: "Ticket by Priority",
      series: [5, 25, 70],
      colors: ["#000000", "#ff0000", "#e7e713"],
      labels: ["urgent", "high", "low"],
    },
  ];

  return (
    <Box mt="20px" display="flex" flexWrap="wrap" gap={3}>
      {ticketData.map((data) => (
        <PieChart
          key={data.title}
          title={data.title}
          series={data.series}
          colors={data.colors}
          labels={data.labels}
        />
      ))}
    </Box>
  );
};

export default PieCharts;
