import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@pankod/refine-mui";

import { PieChartProps } from "interfaces/home";

const PieChart = ({ title, series, colors, labels }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor="#fcfcfc"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
    >
      <Stack width="100%" alignItems="left">
        <Typography fontSize={14} color="#808191">
          {title}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: "pie" },
          colors,
          legend: { show: true },
          dataLabels: { enabled: true },
          labels: labels,
        }}
        series={series}
        type="pie"
      />
    </Box>
  );
};

export default PieChart;
