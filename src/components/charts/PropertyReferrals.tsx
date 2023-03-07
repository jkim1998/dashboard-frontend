import { Box, Stack, Typography } from "@pankod/refine-mui";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { propertyReferralsInfo } from "constants/index";

import { Projects, CountUsers, Tickets } from "../../components/query";

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage}%
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef"
    >
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);

const PropertyReferrals = () => {
  return (
    <Box
      p={4}
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Ticket completion by type
      </Typography>

      <Stack marginTop="20px" direction="column" gap={4}>
        {/* {propertyReferralsInfo.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))} */}
        <Box
          display="flex"
          flexDirection="row"
          borderBottom="1px solid #669999"
          paddingBottom={1}
        >
          <Box border="1px solid #669999" borderRadius="10px" padding={1}>
            <CodeIcon style={{ fontSize: 30 }} />
          </Box>
          <Stack direction="column" paddingLeft={1}>
            <Typography>Projects</Typography>
            <Projects />
          </Stack>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          borderBottom="1px solid #669999"
          paddingBottom={1}
        >
          <Box
            alignItems="center"
            border="1px solid #669999"
            borderRadius="10px"
            padding={1}
          >
            <PersonIcon style={{ fontSize: 30 }} />
          </Box>
          <Stack direction="column" paddingLeft={1}>
            <Typography>Total Users</Typography>
            <CountUsers />
          </Stack>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          borderBottom="1px solid #669999"
          paddingBottom={1}
        >
          <Box border="1px solid #669999" borderRadius="10px" padding={1}>
            <BugReportIcon style={{ fontSize: 30 }} />
          </Box>
          <Stack direction="column" paddingLeft={1}>
            <Typography>Tickets in Development</Typography>
            <Tickets />
          </Stack>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          borderBottom="1px solid #669999"
          paddingBottom={1}
        >
          <Box border="1px solid #669999" borderRadius="10px" padding={1}>
            <EngineeringIcon style={{ fontSize: 30 }} />
          </Box>
          <Stack direction="column" paddingLeft={1}>
            <Typography>Total Developers</Typography>
            <Typography>16</Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
