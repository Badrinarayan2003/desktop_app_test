import React, {
  useEffect,
  useState,
} from "react";

import StatCards
  from "../../../components/dashboard/StatCards";

import PendingCards
  from "../../../components/dashboard/PendingCards";

import ResourceGrowthChart
  from "../../../components/dashboard/ResourceGrowthChart";

import {
  resourceGrowthData,
} from "../../../data/sampleData";

import { getDashboard }
  from "../../../services/apis/getDashboard";

import { useDispatch } from "react-redux";
import { setNotifications } from "../../../redux/reducers/notificationSlice";

const Dashboard = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [dashboardData,
    setDashboardData] =
    useState(null);



  async function fetchDashboard() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getDashboard();

      if (
        response?.code ===
        0
      ) {
        setDashboardData(
          response?.data
            ?.details
        );
      } else {
        setDashboardData(
          null
        );

        setError(
          response?.message ||
          "Failed to fetch dashboard"
        );
      }
    } catch (error) {
      console.log(error);

      setDashboardData(
        null
      );

      setError(
        error?.response
          ?.data
          ?.message ||
        error?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchDashboard();
  }, []);


  useEffect(() => {

    if (!dashboardData) return;

    dispatch(
      setNotifications([
        {
          id: 1,
          title: "Material Request Pending",
          description: "Pending material requests",
          count: dashboardData?.noOfMaterialRequestPending || 0,
          route: "/material-requirements",
        },
        {
          id: 2,
          title: "Labour Approval Pending",
          description: "Pending labour approvals",
          count: dashboardData?.noOfLabourApprovalPending || 0,
          route: "/labour-requirements",
        },
      ].filter(item => item.count > 0))
    );

  }, [dashboardData]);



  const statCardsData = [
    {
      id: 1,
      label:
        "Contractors",
      value:
        dashboardData
          ?.noOfContractors,
      change: 0,
      iconName:
        "Building2",
      iconBg:
        "bg-[#FFF3E9]",
      iconColor:
        "text-[#FA7C14]",
    },
    {
      id: 2,
      label:
        "Suppliers",
      value:
        dashboardData
          ?.noOfSuppliers,
      change: 0,
      iconName:
        "Truck",
      iconBg:
        "bg-[#EEF4FF]",
      iconColor:
        "text-[#155EEF]",
    },
    {
      id: 3,
      label:
        "Labours",
      value:
        dashboardData
          ?.noOfLabours,
      change: 0,
      iconName:
        "Users",
      iconBg:
        "bg-[#ECFDF3]",
      iconColor:
        "text-[#12B76A]",
    },
    {
      id: 4,
      label:
        "Active Projects",
      value:
        dashboardData
          ?.noOfActiveProjects,
      change: 0,
      iconName:
        "HardHat",
      iconBg:
        "bg-[#FEF3F2]",
      iconColor:
        "text-[#F04438]",
    },
  ];

  const pendingCardsData =
    [
      {
        id: 1,
        title:
          "Material Request Pending",
        count:
          dashboardData
            ?.noOfMaterialRequestPending,
        metaDot:
          "#FA7C14",
        metaText:
          "Pending Requests",
        buttonLabel:
          "View Details",
        iconName:
          "Wrench",
        iconBg:
          "bg-[#FFF3E9]",
        iconColor:
          "text-[#FA7C14]",
        highlighted:
          true,
        route: "/material-requirements",
      },
      {
        id: 2,
        title:
          "Labour Approval Pending",
        count:
          dashboardData
            ?.noOfLabourApprovalPending,
        metaDot:
          "#12B76A",
        metaText:
          "Pending Approvals",
        buttonLabel:
          "View Details",
        iconName:
          "UserCog",
        iconBg:
          "bg-[#ECFDF3]",
        iconColor:
          "text-[#12B76A]",
        route: "/labour-requirements",
      },
    ];

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>

          <button
            onClick={
              fetchDashboard
            }
            className="bg-[#FA7C14] hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <StatCards
        data={
          statCardsData
        }
        loading={
          loading
        }
      />

      <div className="mt-4">
        <PendingCards
          data={
            pendingCardsData
          }
          loading={
            loading
          }
        />
      </div>

      <div className="mt-4">
        <ResourceGrowthChart
          data={
            resourceGrowthData
          }
          growthPercent={
            12.4
          }
        />
      </div>
    </>
  );
};

export default Dashboard;





























//ZIAS CODE 

// import React from 'react'
// import StatCards from '../../../components/dashboard/StatCards'
// import PendingCards from '../../../components/dashboard/PendingCards'
// import ResourceGrowthChart from '../../../components/dashboard/ResourceGrowthChart'
// import { statCardsData, pendingCardsData, resourceGrowthData } from '../../../data/sampleData'

// const Dashboard = () => {
//   return (
//     <>
//       <StatCards data={statCardsData} />
//       <div className="mt-4">
//         <PendingCards data={pendingCardsData} />
//       </div>
//       <div className="mt-4">
//         <ResourceGrowthChart data={resourceGrowthData} growthPercent={12.4} />
//       </div>
//     </>
//   )
// }

// export default Dashboard