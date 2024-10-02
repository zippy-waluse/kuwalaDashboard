// 'use client';
// import React from 'react';
// import { useGetDashboardData } from '../hooks/useGetUsers';
// import FoodItemsChart from '../components/CategoriesChart';
// import ActiveUsersChart from '../components/Userchart';


// const Dashboard = () => {
//   const { metrics, isLoading, error } = useGetDashboardData();

//   if (isLoading) {
//     return <p>Loading ...</p>;
//   }
//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const totalFoodItems = metrics?.TotalFoodItems ?? 0;
//   const totalUsers = metrics?.TotalUsers ?? 0;

//   return (
//     <div className="mt-12 ml-[350px]">
//       <div className="flex gap-16 mt-10 nesthub:mt-[8px] nesthub:ml-[18px] nesthubmax:mt-[12px] nesthub:gap-[24px] nesthubmax:ml-8 nesthubmax:gap-20 2xl:ml-64 2xl:gap-72">
//         <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
//           nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
//           nesthubmax:w-[100px] nesthubmax:h-[80px] nesthubmax:text-[20px] 2xl:w-[500px] 2xl:h-[300px] 2xl:text-[32px] ipa:w-[70] ipa:mr-2  ipa:h-[30]">
//           Total Food Items: {totalFoodItems}
//         </div>
//         <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px]
//           nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
//           nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[500px] 2xl:h-[300px] 2xl:text-[32px]">
//           Total Users: {totalUsers}
//         </div>
//       </div>
//       <div className="ml-20 mt-8 nesthubmax:ml-3 nesthub:ml-1 flex 2xl:ml-8 2xl:mr-44 2xl:mt-36 nesthub:flex-row ipm:flex-col-reverse ipa:flex-col-reverse ipa:mb-42 ipa:gap-0 " >
//         <div className="w-[100%] nesthub:w-[100%] nesthubmax:w-[100%] 2xl:w-[100%] ipa:mb-22 nesthub:flex-row">
//           <FoodItemsChart />
//         </div>
//         <div>
//           <ActiveUsersChart/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



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
    <div className="mt-12 ml-[350px]">
      <div className="flex gap-16 mt-10 nesthub:mt-[8px] nesthub:ml-[18px] nesthubmax:mt-[12px] nesthub:gap-[24px] nesthubmax:ml-8 nesthubmax:gap-20 2xl:ml-64 2xl:gap-72">
        <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
          nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
          nesthubmax:w-[100px] nesthubmax:h-[80px] nesthubmax:text-[20px] 2xl:w-[500px] 2xl:h-[300px] 2xl:text-[32px] ipa:w-[70] ipa:mr-2 ipa:h-[30]">
          Total Food Items: {totalFoodItems}
        </div>
        <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px]
          nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
          nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[500px] 2xl:h-[300px] 2xl:text-[32px]">
          Total Users: {totalUsers}
        </div>
      </div>
      <div className="ml-20 mt-8 nesthubmax:ml-3 nesthub:ml-1 flex 2xl:ml-8 2xl:mr-44 2xl:mt-36 nesthub:flex-row ipm:flex-col-reverse ipa:flex-col-reverse ipa:mb-42 ipa:gap-0">
        <div className="w-[100%] nesthub:w-[100%] nesthubmax:w-[100%] 2xl:w-[100%] ipa:mb-22 nesthub:flex-row">
          <FoodItemsChart />
        </div>
        <div>
          <ActiveUsersChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
