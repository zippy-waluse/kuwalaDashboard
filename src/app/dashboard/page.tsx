


'use client';
import React from 'react';
import { useGetDashboardData } from '../hooks/useGetUsers';
import FoodItemsChart from '../components/CategoriesChart';
import ActiveUsersChart from '../components/Userchart';

const Dashboard = () => {
  const { metrics, isLoading, error } = useGetDashboardData('2024-10'); 

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const totalFoodItems = metrics?.TotalFoodItems ?? 0;
  const totalUsers = metrics?.TotalUsers ?? 0;

  return (
    <div className="mt-12 ml-auto mr-auto max-w-[1200px]">
      <div className="flex justify-between gap-16 mt-10">
        <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[350px] h-[180px]">
          Total Food Items: {totalFoodItems}
        </div>
        <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[350px] h-[180px]">
          Total Users: {totalUsers}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="w-[70%] max-w-[800px] mr-4">
          <FoodItemsChart />
        </div>
        <div className="w-[70%] max-w-[800px]">
          <ActiveUsersChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
