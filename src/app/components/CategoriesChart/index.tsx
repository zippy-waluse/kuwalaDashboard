"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchCategories } from "@/app/utils/fetchCategories";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryData {
  id: number;
  name: string;
  quantity: number;
  category: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const fetchFoodItemsByCategory = async () => {
  try {
    const response = await fetchCategories();
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const FoodItemsChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CategoryData[] = await fetchFoodItemsByCategory();
        if (data && data.length > 0) {
          const processedData = processChartData(data);
          setChartData(processedData);
        } else {
          setChartData(getDefaultChartData());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(getDefaultChartData());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const processChartData = (data: CategoryData[]) => {
    const categoryMap = data.reduce((acc, item) => {
      const categoryName = item.category;
      acc[categoryName] = (acc[categoryName] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

    const categoryNames = Object.keys(categoryMap);
    const itemCounts = Object.values(categoryMap);

    return {
      labels: categoryNames,
      datasets: [
        {
          label: "No. of Food Items",
          data: itemCounts,
          backgroundColor: "#7C3A19",
          borderColor: "#7C3A19",
          borderWidth: 1,
        },
      ],
    };
  };

  const getDefaultChartData = () => {
    return {
      labels: ["No Categories Available"],
      datasets: [
        {
          label: "No. of Food Items",
          data: [0],
          backgroundColor: "#7C3A19",
          borderColor: "#7C3A19",
          borderWidth: 1,
        },
      ],
    };
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "No. of Food Items by Category",
        font: {
          size: 20,
        },
        color: "#7C3A19",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Food Items",
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
        beginAtZero: true,
      },
    },
  };

  if (isLoading) return <div>Loading chart...</div>;

  return (
    <div className="chart-container 2xl:w-[950px] 2xl:h-[800px] xl:h-[1000px] xl:w-[600px] 2xl:pt-[7px] nest-hub:h-[900px] nest-hub-max:h-[900px] nest-hub:ml-1 nest-hub-max:ml-0">
  <Bar data={chartData} options={options} />
</div>

  );
};

export default FoodItemsChart;

