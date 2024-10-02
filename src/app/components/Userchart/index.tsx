'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchUsers } from '@/app/utils/fetchUsers'; 

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  created_at: string;
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

const ActiveUsersChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Total Users Per Month',
        data: [],
        backgroundColor: '#7C3A19',
        borderColor: '#7C3A19',
        borderWidth: 1,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: UserData[] = await fetchUsers(month); 
        const processedData = processChartData(data);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [month]); 

  const processChartData = (data: UserData[]) => {
    const userCountsByMonth: Record<string, number> = {
      'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
      'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0,
    };

    data.forEach(user => {
      const date = new Date(user.created_at);
      if (isNaN(date.getTime())) {
        return;
      }

      const month = date.toLocaleString('default', { month: 'short' });
      if (userCountsByMonth[month] !== undefined) {
        userCountsByMonth[month] += 1;
      }
    });

    const labels = Object.keys(userCountsByMonth);
    const counts = labels.map(label => userCountsByMonth[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Total Users Per Month',
          data: counts,
          backgroundColor: '#7C3A19',
          borderColor: '#7C3A19',
          borderWidth: 1,
        },
      ],
    };
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Users Per Month',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) return <div>Loading chart...</div>;

  return (
    <div>
      <select onChange={handleMonthChange} defaultValue="">
      </select>

      <div className="chart-container 2xl:h-[800px] 2xl:w-[900px] xl:h-[600px] xl:w-[800px] lg:h-[500px] lg:w-[700px] nest-hub:w-[400px] nest-hub-max:w-[2px] 2xl:pt-[8px] ipa:w-7/12 ipa:pl-5">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ActiveUsersChart;
