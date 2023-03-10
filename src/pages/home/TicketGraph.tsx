import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { ArrowCircleUpRounded } from "@mui/icons-material";

import {
  GraphOption,
  TotalMonthlyTickets,
} from "../../components/data/chart.config";
import { Tickets } from "../../components/query";

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Ticket Completion by month
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Stack direction="row" fontSize={28} fontWeight={700} color="#11142d">
          <Tickets /> <Typography>/</Typography> <Tickets />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#475be8" }} />
          <Stack>
            <Typography fontSize={15} color="#475be8">
              0.8%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={TotalMonthlyTickets}
        type="bar"
        height={310}
        options={GraphOption}
      />
    </Box>
  );
};

export default TotalRevenue;
