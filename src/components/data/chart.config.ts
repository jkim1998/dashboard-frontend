import { ApexOptions } from "apexcharts";

const monthCovert = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
//how do i read data from db dynamically
const ticketData = [
  {
    month: 3,
    assigned: 23,
    complete: 9,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
  {
    month: 4,
    assigned: 65,
    complete: 12,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
  {
    month: 5,
    assigned: 12,
    complete: 4,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
  {
    month: 6,
    assigned: 67,
    complete: 64,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
  {
    month: 7,
    assigned: 12,
    complete: 3,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
  {
    month: 8,
    assigned: 43,
    complete: 21,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
  {
    month: 9,
    assigned: 8,
    complete: 6,
    function: 1,
    UIUX: 1,
    urgent: 2,
    high: 3,
  },
];

//calculate incomplete
const assignedData = ticketData.map((data) => data.assigned);
const completedData = ticketData.map((data) => data.complete);
const incompleteData = assignedData.map((assigned, index) => {
  const completed = completedData[index];
  return assigned - completed;
});


export const TotalMonthlyTickets = [
  {
    name: "Assigned",
    data: assignedData,
  },
  {
    name: "Completed",
    data: completedData,
  },
  {
    name: "Incomplete",
    data: incompleteData,
  },
];

const Category = ticketData.map(({ month }) => monthCovert[month - 1]);

export const GraphOption: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: true,
      offsetX: 20,
      offsetY: -120,
    },
  },
  colors: ["#3366ff", "#00cc00", "#ff0066"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: true,
  },
  stroke: {
    colors: ["transparent"],
    width: 4,
  },
  xaxis: {
    categories: Category,
  },
  yaxis: {
    title: {
      text: "",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${val}`;
      },
    },
  },
};
