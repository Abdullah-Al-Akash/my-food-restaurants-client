import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaListAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { FaBookmark, FaUsers } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/order-stats");
      return res.data;
    },
  });

  //   For Chart:
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //   For PIE Chart
  const pieChartData = chartData.map((data) => {
    return {
      name: data.category,
      value: data.revenue,
    };
  });
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
      <div>
        <h3 className="py-4 text-2xl md:text-5xl text-center font-bold ">
          Welcome Back <br />
        </h3>
        <h3 className="text-orange-600 text-2xl md:text-5xl text-center font-bold pb-4">
          {user?.displayName ? user.displayName : "back"}
        </h3>{" "}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
        <div className="px-6 py-4 text-white rounded-md flex justify-center items-center gap-4 bg-gradient-to-r from-purple-500 to-purple-100">
          <div>
            <FaMoneyCheckAlt className="text-3xl font-semibold"></FaMoneyCheckAlt>
          </div>
          <div className="text-xl font-bold">
            <h1>${stats?.revenue}</h1>
            <h1>Revenue</h1>
          </div>
        </div>
        <div className="px-6 py-4 text-white rounded-md flex justify-center items-center gap-4 bg-gradient-to-r from-orange-400 to-orange-100">
          <div>
            <FaUsers className="text-3xl font-semibold"></FaUsers>
          </div>
          <div className="text-xl font-bold">
            <h1>{stats?.users}</h1>
            <h1>Customer</h1>
          </div>
        </div>
        <div className="px-6 py-4 text-white rounded-md flex justify-center items-center gap-4 bg-gradient-to-r from-red-400 to-red-100">
          <div>
            <FaListAlt className="text-3xl font-semibold"></FaListAlt>
          </div>
          <div className="text-xl font-bold">
            <h1>{stats?.menuItems}</h1>
            <h1>Items</h1>
          </div>
        </div>
        <div className="px-6 py-4 text-white rounded-md flex justify-center items-center gap-4 bg-gradient-to-r from-green-400 to-green-100">
          <div>
            <FaBookmark className="text-3xl font-semibold"></FaBookmark>
          </div>
          <div className="text-xl font-bold">
            <h1>{stats?.orders}</h1>
            <h1>Orders</h1>
          </div>
        </div>
      </div>

      {/* For Chart */}
      <div className="grid md:grid-cols-2 py-4">
        <div className="">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
