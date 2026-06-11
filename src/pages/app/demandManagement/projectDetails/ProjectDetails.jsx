import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import FloatMeta
  from "../../../../components/projectView/FloatMeta";

import CostRow
  from "../../../../components/projectView/CostRow";

import CounterCard
  from "../../../../components/projectView/CounterCard";

import {
  getProjectDetail,
} from "../../../../services/apis/getProjectDetail";

const ProjectDetails = () => {
  const { slug } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [projectData, setProjectData] =
    useState(null);

  useEffect(() => {
    fetchProjectDetail();
  }, [slug]);

  async function fetchProjectDetail() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getProjectDetail(
          slug
        );

      console.log(
        response,
        "project detail response"
      );

      if (response?.code === 0) {
        setProjectData(
          response?.data?.details
        );
      } else {
        setError(
          response?.message ||
          "Failed to fetch project details"
        );
      }
    } catch (error) {
      console.log(
        error,
        "project detail error"
      );

      setError(
        error?.response?.data
          ?.message ||
        error?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency =
    (amount) => {
      if (
        amount === null ||
        amount === undefined
      ) {
        return "₹0";
      }

      return new Intl.NumberFormat(
        "en-IN",
        {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }
      ).format(amount);
    };

  const formatDate =
    (date) => {
      if (!date) {
        return "N/A";
      }

      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    };

  // ─────────────────────────────────────────
  // Loading State
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#F8FAFC]
        "
      >
        <div
          className="
            w-14
            h-14
            border-[5px]
            border-[#FA8316]/20
            border-t-[#FA8316]
            rounded-full
            animate-spin
          "
        />
      </div>
    );
  }

  // ─────────────────────────────────────────
  // Error State
  // ─────────────────────────────────────────
  if (
    error ||
    !projectData
  ) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          bg-[#F8FAFC]
        "
      >
        <div
          className="
            text-center
            bg-white
            rounded-2xl
            border
            border-[#DDC1AE]
            p-8
            max-w-md
            w-full
          "
        >
          <h2
            className="
              text-[22px]
              font-bold
              text-[#191C1D]
              mb-3
            "
          >
            Failed to Load
          </h2>

          <p
            className="
              text-sm
              text-[#564334]
              mb-6
            "
          >
            {error}
          </p>

          <button
            onClick={() =>
              navigate(
                "/projects"
              )
            }
            className="
              inline-flex
              items-center
              justify-center
              px-5
              py-3
              rounded-xl
              bg-[#FA8316]
              text-white
              font-semibold
              hover:opacity-90
              transition-all cursor-pointer
            "
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        pb-12
        sm:pb-16
        px-3
        sm:px-5
        lg:px-8
        pt-4
        sm:pt-6
      "
      style={{
        backgroundColor:
          "#F8FAFC",
        fontFamily:
          "'Hanken Grotesk', sans-serif",
      }}
    >
      {/* ───────────────────────── */}
      {/* Header */}
      {/* ───────────────────────── */}

      <div
        className="
          flex
          flex-col
          gap-1
          mb-4
          sm:mb-6
        "
      >
        {/* Breadcrumb */}
        <nav
          className="
            flex
            items-center
            gap-1
            sm:gap-2
            flex-wrap
          "
          style={{
            fontFamily:
              "'Inter', sans-serif",
          }}
        >
          <Link
            to="/home"
            className="
              text-[9px]
              sm:text-[10px]
              font-bold
              uppercase
              tracking-[1px]
              text-[#515F74]
              hover:text-[#FA7C14]
              transition-colors
              whitespace-nowrap
            "
          >
            Project Management
          </Link>

          <svg
            width="4"
            height="7"
            viewBox="0 0 4 7"
            fill="none"
          >
            <path
              d="M1 1l2 2.5L1 6"
              stroke="#515F74"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Link
            to="/projects"
            className="
              text-[9px]
              sm:text-[10px]
              font-bold
              uppercase
              tracking-[1px]
              text-[#FA7C14]
              hover:underline
              whitespace-nowrap
            "
          >
            Projects
          </Link>

          <svg
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
          >
            <path
              d="M1 1l3 3.5L1 8"
              stroke="#564334"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span
            className="
              text-[12px]
              sm:text-[13px]
              font-medium
              text-[#914C00]
              truncate
              max-w-[160px]
              sm:max-w-none
            "
          >
            {
              projectData?.projectName
            }
          </span>
        </nav>

        {/* Title + Badge */}
        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            pt-1
            sm:pt-2
            flex-wrap
          "
        >
          <h1
            className="
              text-[22px]
              sm:text-[26px]
              lg:text-[28px]
              font-bold
              leading-tight
              sm:leading-9
              text-[#191C1D]
            "
          >
            {
              projectData?.projectName
            }
          </h1>

          <span
            className="
              inline-flex
              items-center
              px-2.5
              sm:px-3
              py-0.5
              sm:py-1
              rounded-full
              text-[10px]
              sm:text-[11px]
              font-bold
              tracking-[0.55px]
              uppercase
              flex-shrink-0
            "
            style={{
              backgroundColor:
                "#17BE9E",
              color:
                "#004739",
            }}
          >
            {
              projectData?.status
            }
          </span>
        </div>
      </div>

      {/* ───────────────────────── */}
      {/* Hero + Cost */}
      {/* ───────────────────────── */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[1fr_329px]
          gap-4
          sm:gap-6
          mb-4
          sm:mb-6
        "
      >
        {/* Hero */}
        <div
          className="
            relative
            rounded-xl
            overflow-hidden
          "
          style={{
            height:
              "clamp(240px,40vw,420px)",
          }}
        >
          <img
            src={
              projectData?.siteImage
                ? projectData.siteImage
                : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80"
            }
            alt={
              projectData?.projectName
            }
            className="
              w-full
              h-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)",
            }}
          />

          {/* Floating Card */}
          <div
            className="
              absolute
              bottom-3
              left-3
              right-3
              sm:bottom-6
              sm:left-6
              sm:right-6
              rounded-lg
              px-3
              py-3
              sm:px-6
              sm:py-5
            "
            style={{
              background:
                "rgba(255,255,255,0.7)",
              backdropFilter:
                "blur(6px)",
              WebkitBackdropFilter:
                "blur(6px)",
              border:
                "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div
              className="
                flex
                items-end
                justify-between
                gap-2
                overflow-x-auto
              "
            >
              <div
                className="
                  flex
                  items-center
                  flex-shrink-0
                "
              >
                <FloatMeta
                  label="TYPE"
                  value={
                    projectData?.projectType
                  }
                />

                <FloatMeta
                  label="CLIENT"
                  value={
                    projectData?.clientName
                  }
                />
              </div>

              {/* Timeline */}
              <div
                className="
                  pl-3
                  sm:pl-6
                  flex-shrink-0
                "
                style={{
                  borderLeft:
                    "1px solid #DDC1AE",
                }}
              >
                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.55px]
                    text-right
                  "
                  style={{
                    color:
                      "rgba(86,67,52,0.7)",
                  }}
                >
                  TIMELINE
                </p>

                <p
                  className="
                    text-[13px]
                    sm:text-[14px]
                    font-semibold
                    tracking-[0.28px]
                    text-right
                    mt-1
                    whitespace-nowrap
                  "
                  style={{
                    color:
                      "#191C1D",
                  }}
                >
                  {
                    formatDate(
                      projectData?.startDate
                    )
                  }
                  {" • "}
                  {
                    projectData?.duration
                  }{" "}
                  Months
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Overview */}
        <div
          className="
            rounded-xl
            bg-white
            flex
            flex-col
          "
          style={{
            border:
              "1px solid #DDC1AE",
            padding:
              "20px 20px",
          }}
        >
          <div
            className="
              flex
              items-center
              justify-between
              pb-4
              sm:pb-6
            "
          >
            <h2
              className="
                text-[18px]
                sm:text-[20px]
                font-bold
                text-[#191C1D]
              "
            >
              Cost Overview
            </h2>
          </div>

          {/* Total Budget */}
          <div
            className="
              flex
              items-center
              justify-between
              rounded-lg
              mb-4
              sm:mb-5
            "
          >
            <span
              className="
                text-[14px]
                text-[#564334]
              "
            >
              Total Budget
            </span>

            <span
              className="
                text-[18px]
                sm:text-[20px]
                font-bold
                text-[#191C1D]
              "
            >
              {formatCurrency(
                projectData?.totalBudget
              )}
            </span>
          </div>

          <div
            className="
              flex
              flex-col
              gap-4
              mb-4
            "
          >
            <CostRow
              dot="#914C00"
              label="Material Cost"
              value={formatCurrency(
                projectData?.materialCost
              )}
            />

            <CostRow
              dot="#006B58"
              label="Labour Cost"
              value={formatCurrency(
                projectData?.labourCost
              )}
            />

            <div
              className="h-px"
              style={{
                background:
                  "#DDC1AE",
              }}
            />

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[14px]
                  font-semibold
                  text-[#564334]
                "
              >
                Remaining Balance
              </span>

              <span
                className="
                  text-[14px]
                  font-semibold
                  text-[#006B58]
                "
              >
                {formatCurrency(
                  projectData?.remainingBudget
                )}
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* ───────────────────────── */}
      {/* Bottom Layout */}
      {/* ───────────────────────── */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[1fr_329px]
          gap-4
          sm:gap-6
        "
      >
        {/* Left Side */}
        <div
          className="
            flex
            flex-col
            gap-4
            sm:gap-6
          "
        >
          {/* Counters */}
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-6
            "
          >
            <CounterCard
              iconBg="rgba(255,138,0,0.2)"
              iconColor="#914C00"
              iconType="workers"
              count={String(
                projectData?.workersApplied || 0
              ).padStart(2, "0")}
              label="Workers Applied"
            />

            <CounterCard
              iconBg="rgba(23,190,158,0.2)"
              iconColor="#006B58"
              iconType="quotes"
              count={String(
                projectData?.quotesReceived || 0
              ).padStart(2, "0")}
              label="Quotes Received"
            />
          </div>

          {/* Applicants */}
          <div
            className="
              rounded-xl
              bg-white
              overflow-hidden
            "
            style={{
              border:
                "1px solid #DDC1AE",
            }}
          >
            <div
              className="
                px-4
                sm:px-6
                py-4
                border-b
                bg-[#DDC1AE]
              "
              style={{
                borderColor:
                  "#DDC1AE",
              }}
            >
              <h2
                className="
                  text-[14px]
                  font-semibold
                  text-[#191C1D]
                "
              >
                Recent Applicants
              </h2>
            </div>

            {(projectData?.applicants?.length || 0) === 0 ? (
              <div
                className="
                  py-10
                  text-center
                "
              >
                <p
                  className="
                    text-sm
                    text-[#564334]
                  "
                >
                  No applicants
                  found
                </p>
              </div>
            ) : (
              <div
                className="
                  max-h-[320px]
                  overflow-y-auto
                "
              >
                {projectData?.applicants?.map(
                  (
                    applicant
                  ) => (
                    <div
                      key={
                        applicant?.applicationId
                      }
                      className="
                        px-4
                        sm:px-6
                        py-4
                        border-b
                        last:border-none
                      "
                      style={{
                        borderColor:
                          "#DDC1AE",
                      }}
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >
                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          {/* Name */}
                          <h3
                            className="
                              text-[15px]
                              font-semibold
                              text-[#191C1D]
                            "
                          >
                            {
                              applicant?.applicantName
                            }
                          </h3>

                          {/* Status */}
                          <p
                            className="
                              text-[12px]
                              font-medium
                              text-[#FA8316]
                              mt-1
                            "
                          >
                            {
                              applicant?.status
                            }
                          </p>

                          {/* Experience */}
                          <p
                            className="
                              text-sm
                              text-[#564334]
                              mt-2
                            "
                          >
                            Experience:
                            {" "}
                            {
                              applicant?.experience
                            }{" "}
                            Years
                          </p>

                          {/* Skills */}
                          <div
                            className="
                              flex
                              flex-wrap
                              gap-2
                              mt-3
                            "
                          >
                            {applicant?.skill
                              ?.split(
                                ","
                              )
                              ?.map(
                                (
                                  skill,
                                  index
                                ) => (
                                  <span
                                    key={
                                      index
                                    }
                                    className="
                                      px-3
                                      py-1
                                      rounded-full
                                      text-[11px]
                                      font-medium
                                      bg-[#FFF2E8]
                                      text-[#914C00]
                                      border
                                      border-[#F3D0B2]
                                    "
                                  >
                                    {
                                      skill
                                    }
                                  </span>
                                )
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Quotations */}
          <div
            className="
              rounded-xl
              bg-white
              overflow-hidden
            "
            style={{
              border:
                "1px solid #DDC1AE",
            }}
          >
            <div
              className="
                px-4
                sm:px-6
                py-4
                border-b
                bg-[#DDC1AE]
              "
              style={{
                borderColor:
                  "#DDC1AE",
              }}
            >
              <h2
                className="
                  text-[14px]
                  font-semibold
                  text-[#191C1D]
                "
              >
                Material
                Quotations
              </h2>
            </div>

            {(projectData?.quotations?.length || 0) === 0 ? (
              <div
                className="
                  py-10
                  text-center
                "
              >
                <p
                  className="
                    text-sm
                    text-[#564334]
                  "
                >
                  No quotations
                  found
                </p>
              </div>
            ) : (
              <div
                className="
                  max-h-[320px]
                  overflow-y-auto
                  flex
                  flex-col
                "
              >
                {projectData?.quotations?.map(
                  (
                    quote
                  ) => (
                    <div
                      key={
                        quote?.quotationDetailId
                      }
                      className="
                        p-4
                        border-b
                        last:border-none
                      "
                      style={{
                        borderColor:
                          "#DDC1AE",
                      }}
                    >
                      <div
                        className="
                          flex
                          justify-between
                          items-start
                          gap-3
                        "
                      >
                        <div>
                          <h3
                            className="
                              text-[15px]
                              font-semibold
                              text-[#191C1D]
                            "
                          >
                            {
                              quote?.materialName
                            }
                          </h3>

                          <p
                            className="
                              text-sm
                              text-[#564334]
                              mt-1
                            "
                          >
                            Brand:
                            {" "}
                            {
                              quote?.brandName
                            }
                          </p>

                          <p
                            className="
                              text-sm
                              text-[#564334]
                              mt-1
                            "
                          >
                            Quantity:
                            {" "}
                            {
                              quote?.quantity
                            }{" "}
                            {
                              quote?.units
                            }
                          </p>

                          <span
                            className="
                              inline-flex
                              mt-3
                              px-3
                              py-1
                              rounded-full
                              text-[11px]
                              font-semibold
                              bg-[#E8F9F4]
                              text-[#006B58]
                            "
                          >
                            {
                              quote?.urgency
                            }
                          </span>
                        </div>

                        <div
                          className="
                            text-right
                          "
                        >
                          <p
                            className="
                              text-[18px]
                              font-bold
                              text-[#191C1D]
                            "
                          >
                            {formatCurrency(
                              quote?.totalCost
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div
            className="
              rounded-xl
              overflow-hidden
              relative
            "
            style={{
              border:
                "1px solid #DDC1AE",
              height:
                "clamp(220px,25vw,350px)",
            }}
          >
            <iframe
              title="project-map"
              src={`https://maps.google.com/maps?q=${projectData?.latitude},${projectData?.longitude}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Coordinates */}
            <div
              className="
                absolute
                bottom-3
                left-3
                rounded
                px-3
                py-2
              "
              style={{
                background:
                  "rgba(255,255,255,0.9)",
                backdropFilter:
                  "blur(4px)",
              }}
            >
              <span
                className="
                  text-[12px]
                  font-medium
                  text-[#191C1D]
                "
              >
                Lat:
                {" "}
                {
                  projectData?.latitude
                }
                {" | "}
                Lng:
                {" "}
                {
                  projectData?.longitude
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;


























































// import { useParams, useNavigate, Link } from "react-router-dom";
// import { projectsData, projectDetailsData } from "../../../../data/sampleData";

// import FloatMeta from "../../../../components/projectView/FloatMeta";
// import CostRow from "../../../../components/projectView/CostRow";
// import CounterCard from "../../../../components/projectView/CounterCard";
// import QuoteCard from "../../../../components/projectView/QuoteCard";

// // ─── Fallback ─────────────────────────────────────────────────────────────────
// const buildFallback = (project) => ({
//   image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80",
//   type: "Construction",
//   client: project.client,
//   plotSize: "N/A",
//   floors: "N/A",
//   timeline: "TBD",
//   status: project.status === "ONGOING" ? "ACTIVE" : project.status,
//   cost: {
//     total: project.budget,
//     material: "—",
//     labour: "—",
//     remaining: "—",
//     allocated: project.progress,
//   },
//   workersApplied: 0,
//   quotesReceived: 0,
//   recentApplicants: [],
//   recentActivity: [],
//   quotes: [],
//   mapLocation: project.location,
//   mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(project.location)}&output=embed`,
// });

// // ─── Main ─────────────────────────────────────────────────────────────────────
// const ProjectDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const project = projectsData.find((p) => p.id === slug);

//   if (!project) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="text-center space-y-2">
//           <p className="text-xl font-bold text-[#191C1D]">Project not found</p>
//           <button
//             onClick={() => navigate("/projects")}
//             className="text-[#914C00] underline text-sm font-semibold"
//           >
//             Back to Projects
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const d = projectDetailsData[slug] ?? buildFallback(project);

//   return (
//     <div
//       className="min-h-screen pb-12 sm:pb-16 px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6"
//       style={{ backgroundColor: "#F8FAFC", fontFamily: "'Hanken Grotesk', sans-serif" }}
//     >

//       {/* ── Page Header ── */}
//       <div className="flex flex-col gap-1 mb-4 sm:mb-6">

//         {/* Breadcrumb nav */}
//         <nav
//           className="flex items-center gap-1 sm:gap-2 flex-wrap"
//           style={{ fontFamily: "'Inter', sans-serif" }}
//         >
//           <Link
//             to="/home"
//             className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[1px] text-[#515F74] hover:text-[#FA7C14] transition-colors whitespace-nowrap"
//           >
//             Demand Management
//           </Link>
//           {/* chevron */}
//           <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
//             <path d="M1 1l2 2.5L1 6" stroke="#515F74" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//           <Link
//             to="/projects"
//             className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[1px] text-[#FA7C14] hover:underline transition-colors whitespace-nowrap"
//           >
//             Projects
//           </Link>
//           {/* chevron */}
//           <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
//             <path d="M1 1l3 3.5L1 8" stroke="#564334" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//           <span
//             className="text-[12px] sm:text-[13px] font-medium text-[#914C00] truncate max-w-[160px] sm:max-w-none"
//             style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
//           >
//             {project.name}
//           </span>
//         </nav>

//         {/* Title + badge */}
//         <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2 flex-wrap">
//           <h1
//             className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold leading-tight sm:leading-9 text-[#191C1D]"
//             style={{ fontFamily: "'Inter', sans-serif" }}
//           >
//             {project.name}
//           </h1>
//           <span
//             className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.55px] uppercase flex-shrink-0"
//             style={{ backgroundColor: "#17BE9E", color: "#004739" }}
//           >
//             {d.status}
//           </span>
//         </div>
//       </div>

//       {/* ── Hero Grid: Image + Cost Overview ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-[1fr_329px] gap-4 sm:gap-6 mb-4 sm:mb-6">

//         {/* Project Image + floating info card */}
//         <div
//           className="relative rounded-xl overflow-hidden"
//           style={{ height: "clamp(240px, 40vw, 420px)" }}
//         >
//           <img
//             src={d.image}
//             alt={project.name}
//             className="w-full h-full object-cover"
//           />

//           {/* Dark gradient overlay */}
//           <div
//             className="absolute inset-0"
//             style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)" }}
//           />

//           {/* Floating Info Card */}
//           <div
//             className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 rounded-lg px-3 py-3 sm:px-6 sm:py-5"
//             style={{
//               background: "rgba(255,255,255,0.7)",
//               backdropFilter: "blur(6px)",
//               WebkitBackdropFilter: "blur(6px)",
//               border: "1px solid rgba(255,255,255,0.2)",
//               boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
//             }}
//           >
//             {/* Scroll horizontally on very small screens */}
//             <div className="flex items-end justify-between gap-2 overflow-x-auto">
//               {/* Left group */}
//               <div className="flex items-center flex-shrink-0">
//                 <FloatMeta label="TYPE" value={d.type} />
//                 <FloatMeta label="CLIENT" value={d.client} />
//                 {/* Hide PLOT SIZE + FLOORS below 480px to avoid overflow */}
//                 <span className="hidden xs:contents">
//                   <FloatMeta label="PLOT SIZE" value={d.plotSize} />
//                   <FloatMeta label="FLOORS" value={d.floors} />
//                 </span>
//               </div>

//               {/* Right: TIMELINE */}
//               <div
//                 className="pl-3 sm:pl-6 flex-shrink-0"
//                 style={{ borderLeft: "1px solid #DDC1AE" }}
//               >
//                 <p
//                   className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.55px] text-right"
//                   style={{ color: "rgba(86,67,52,0.7)" }}
//                 >
//                   TIMELINE
//                 </p>
//                 <p
//                   className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px] text-right mt-1 whitespace-nowrap"
//                   style={{ color: "#191C1D" }}
//                 >
//                   {d.timeline}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cost Overview Card */}
//         <div
//           className="rounded-xl bg-white flex flex-col"
//           style={{ border: "1px solid #DDC1AE", padding: "20px 20px" }}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between pb-4 sm:pb-6">
//             <h2
//               className="text-[18px] sm:text-[20px] font-bold leading-7 text-[#191C1D]"
//             >
//               Cost Overview
//             </h2>
//             <div style={{ color: "#914C00" }}>
//               <svg width="19" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="2" y="5" width="20" height="14" rx="2" />
//                 <path d="M2 10h20" />
//               </svg>
//             </div>
//           </div>

//           {/* Total Budget */}
//           <div
//             className="flex items-center justify-between rounded-lg mb-4 sm:mb-5"
//             style={{ padding: "10px 12px", background: "#FFFFFF" }}
//           >
//             <span className="text-[13px] sm:text-[14px] font-normal" style={{ color: "#564334" }}>
//               Total Budget
//             </span>
//             <span
//               className="text-[18px] sm:text-[20px] font-bold leading-7"
//               style={{ color: "#191C1D" }}
//             >
//               {d.cost.total}
//             </span>
//           </div>

//           {/* Material + Labour */}
//           <div className="flex flex-col gap-3 sm:gap-4 px-1 sm:px-2 mb-4">
//             <CostRow dot="#914C00" label="Material Cost" value={d.cost.material} />
//             <CostRow dot="#006B58" label="Labour Cost" value={d.cost.labour} />

//             {/* Divider */}
//             <div className="h-px" style={{ background: "#DDC1AE" }} />

//             {/* Remaining Balance */}
//             <div className="flex items-center justify-between">
//               <span
//                 className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px]"
//                 style={{ color: "#564334" }}
//               >
//                 Remaining Balance
//               </span>
//               <span
//                 className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px]"
//                 style={{ color: "#006B58" }}
//               >
//                 {d.cost.remaining}
//               </span>
//             </div>
//           </div>

//           {/* Progress */}
//           <div
//             className="mt-auto pt-4 sm:pt-6 flex flex-col gap-2"
//             style={{ borderTop: "1px solid #DDC1AE" }}
//           >
//             <div
//               className="w-full rounded-full overflow-hidden"
//               style={{ height: 8, background: "#E7E8E9" }}
//             >
//               <div
//                 className="h-full rounded-full"
//                 style={{ width: `${d.cost.allocated}%`, background: "#914C00" }}
//               />
//             </div>
//             <p className="text-[12px] sm:text-[13px] font-normal" style={{ color: "#564334" }}>
//               {d.cost.allocated}% of total budget allocated
//             </p>
//           </div>   
//         </div>
//       </div>

//       {/* ── Bento: Stats / Lists (left) + Activity / Map (right) ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-[1fr_329px] gap-4 sm:gap-6">

//         {/* ── Left ── */}
//         <div className="flex flex-col gap-4 sm:gap-6">

//           {/* Counters */}
//           <div className="grid grid-cols-2 gap-3 sm:gap-6">
//             <CounterCard
//               iconBg="rgba(255,138,0,0.2)"
//               iconColor="#914C00"
//               iconType="workers"
//               count={String(d.workersApplied).padStart(2, "0")}
//               label="Workers Applied"
//             />
//             <CounterCard
//               iconBg="rgba(23,190,158,0.2)"
//               iconColor="#006B58"
//               iconType="quotes"
//               count={String(d.quotesReceived).padStart(2, "0")}
//               label="Quotes Received"
//             />
//           </div>

//           {/* Recent Applicants */}
//           <div className="rounded-xl bg-white" style={{ border: "1px solid #DDC1AE" }}>
//             <div
//               className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
//               style={{ borderBottom: "1px solid #DDC1AE" }}
//             >
//               <span
//                 className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px] text-[#191C1D]"
//               >
//                 Recent Applicants
//               </span>
//               <button
//                 className="text-[10px] sm:text-[11px] font-bold tracking-[0.55px] uppercase"
//                 style={{ color: "#914C00" }}
//               >
//                 View All
//               </button>
//             </div>

//             {d.recentApplicants.length === 0 ? (
//               <p
//                 className="text-[13px] text-center py-6 sm:py-8"
//                 style={{ color: "#564334" }}
//               >
//                 No applicants yet
//               </p>
//             ) : (
//               d.recentApplicants.map((a, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4"
//                   style={i > 0 ? { borderTop: "1px solid #DDC1AE" } : {}}
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4 min-w-0">
//                     {/* Avatar */}
//                     <div
//                       className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-[20px] font-bold flex-shrink-0"
//                       style={{
//                         background: a.avatarBg ?? "#DEE2F3",
//                         color: a.avatarText ?? "#5F6472",
//                       }}
//                     >
//                       {a.initials}
//                     </div>
//                     <div className="min-w-0">
//                       <p
//                         className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px] truncate"
//                         style={{ color: "#191C1D" }}
//                       >
//                         {a.name}
//                       </p>
//                       <p
//                         className="text-[12px] sm:text-[13px] font-normal truncate"
//                         style={{ color: "#564334" }}
//                       >
//                         {a.role} • {a.exp}
//                       </p>
//                     </div>
//                   </div>
//                   {a.isNew && (
//                     <span
//                       className="text-[10px] sm:text-[11px] font-bold tracking-[0.55px] px-2 py-0.5 rounded flex-shrink-0"
//                       style={{ background: "#FFEDD5", color: "#C2410C" }}
//                     >
//                       NEW
//                     </span>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Latest Material Quotes */}
//           <div className="flex flex-col gap-3 sm:gap-4">
//             <div className="flex items-center justify-between">
//               <span
//                 className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px]"
//                 style={{ color: "#191C1D" }}
//               >
//                 Latest Material Quotes
//               </span>
//               <button
//                 className="text-[10px] sm:text-[11px] font-bold tracking-[0.55px] uppercase"
//                 style={{ color: "#914C00" }}
//               >
//                 View All
//               </button>
//             </div>

//             {d.quotes.length === 0 ? (
//               <p className="text-[13px]" style={{ color: "#564334" }}>
//                 No quotes yet
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-6">
//                 {d.quotes.map((q, i) => (
//                   <QuoteCard key={i} quote={q} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Right: Activity + Map ── */}
//         <div className="flex flex-col gap-4 sm:gap-6">


//           {/* Map */}
//           <div
//             className="rounded-xl overflow-hidden relative"
//             style={{
//               border: "1px solid #DDC1AE",
//               height: "clamp(160px, 25vw, 192px)",
//             }}
//           >
//             <iframe
//               title="project-map"
//               src={d.mapEmbed}
//               width="100%"
//               height="100%"
//               style={{
//                 border: 0,
//                 filter: "grayscale(100%) invert(90%) contrast(85%)",
//                 opacity: 0.9,
//               }}
//               allowFullScreen
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             />

//             {/* Orange pin */}
//             <div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               style={{ zIndex: 1 }}
//             >
//               <div
//                 className="flex items-center justify-center rounded-full shadow-lg"
//                 style={{
//                   width: 32,
//                   height: 36,
//                   background: "#914C00",
//                   boxShadow:
//                     "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <svg width="16" height="20" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
//                     fill="white"
//                   />
//                   <circle cx="12" cy="9" r="2.5" fill="#914C00" />
//                 </svg>
//               </div>
//             </div>

//             {/* Location label */}
//             <div
//               className="absolute bottom-3 left-3 rounded px-2 sm:px-3 py-1 max-w-[calc(100%-24px)]"
//               style={{
//                 background: "rgba(255,255,255,0.9)",
//                 backdropFilter: "blur(4px)",
//                 zIndex: 2,
//               }}
//             >
//               <span
//                 className="text-[12px] sm:text-[13px] font-medium truncate block"
//                 style={{ color: "#191C1D" }}
//               >
//                 {d.mapLocation}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;