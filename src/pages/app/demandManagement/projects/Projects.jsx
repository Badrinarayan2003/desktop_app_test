import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import { Link }
  from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  ChevronRight,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  FolderOpen,
  RefreshCcw,
} from "lucide-react";

import { Line as LineProgress }
  from "rc-progress";

import {
  getAllProjects,
} from "../../../../services/apis/getAllProjects";


//  STATUS CONFIG
const STATUS_CONFIG = {
  ONGOING: {
    label: "Ongoing",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    border:
      "border-emerald-200",
  },

  PLANNING: {
    label: "Planning",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
    border:
      "border-amber-200",
  },

  ON_HOLD: {
    label: "On Hold",
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
    border:
      "border-slate-200",
  },

  COMPLETED: {
    label: "Completed",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    border:
      "border-blue-200",
  },
};


//  PROGRESS COLOR
const progressStroke = (
  pct
) => {
  if (pct >= 80)
    return "#10B981";

  if (pct >= 50)
    return "#FA8316";

  if (pct >= 25)
    return "#FBBF24";

  return "#F87171";
};


//  STATUS BADGE
const StatusBadge = ({
  status,
}) => {
  const cfg =
    STATUS_CONFIG[
    status
    ] ??
    STATUS_CONFIG.PLANNING;

  return (
    <span
      className={`
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                text-[11px]
                font-bold
                tracking-wide
                border
                ${cfg.bg}
                ${cfg.text}
                ${cfg.border}
            `}
    >
      <span
        className={`
                    w-1.5
                    h-1.5
                    rounded-full
                    ${cfg.dot}
                `}
      />

      {cfg.label}
    </span>
  );
};


//  PROGRESS CELL
const ProgressCell = ({
  value,
}) => (
  <div className="flex items-center gap-3 min-w-[130px]">
    <div className="flex-1">
      <LineProgress
        percent={value}
        strokeWidth={4}
        trailWidth={4}
        strokeColor={
          progressStroke(
            value
          )
        }
        trailColor="#F1F5F9"
        strokeLinecap="round"
      />
    </div>

    <span
      className="
                text-xs
                font-bold
                text-[#64748B]
                w-8
                text-right
                tabular-nums
            "
    >
      {value}%
    </span>
  </div>
);


//  SORT ICON
const SortIcon = ({
  sorted,
}) => {
  if (!sorted)
    return (
      <ArrowUpDown
        className="
                    w-3.5
                    h-3.5
                    ml-1
                    opacity-40
                "
      />
    );

  if (sorted === "asc")
    return (
      <ArrowUp
        className="
                    w-3.5
                    h-3.5
                    ml-1
                    text-[#FA8316]
                "
      />
    );

  return (
    <ArrowDown
      className="
                w-3.5
                h-3.5
                ml-1
                text-[#FA8316]
            "
    />
  );
};


//  MAIN PAGE
const Projects = () => {
  const [
    globalFilter,
    setGlobalFilter,
  ] = useState("");

  const [
    sorting,
    setSorting,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    projects,
    setProjects,
  ] = useState([]);


  //  FETCH PROJECTS
  async function
    fetchProjects() {
    try {
      setLoading(
        true
      );

      setError("");

      const response =
        await getAllProjects();

      console.log(
        response,
        "projects response"
      );

      if (
        response?.code ===
        0
      ) {
        const details =
          response
            ?.data
            ?.details ||
          [];

        if (
          details.length >
          0
        ) {
          setProjects(
            details
          );
        } else {
          setProjects(
            []
          );
        }
      } else {
        setError(
          response?.message ||
          "Something went wrong"
        );
      }
    } catch (
    error
    ) {
      console.log(
        error
      );

      setError(
        error?.response
          ?.data
          ?.message ||
        error.message ||
        "Failed to fetch projects"
      );
    } finally {
      setLoading(
        false
      );
    }
  }


  useEffect(() => {
    fetchProjects();
  }, []);


  //  SEARCH
  const filteredProjects =
    useMemo(() => {
      return projects.filter(
        (
          item
        ) =>
          item.projectName
            ?.toLowerCase()
            .includes(
              globalFilter.toLowerCase()
            )
      );
    }, [
      projects,
      globalFilter,
    ]);


  //  TABLE COLUMNS
  const columns =
    useMemo(
      () => [
        {
          accessorKey:
            "projectId",

          header:
            "ID",

          size: 180,

          cell:
            ({
              getValue,
            }) => (
              <span
                className="
                            text-sm
                            text-[#94A3B8]
                            font-semibold
                        "
              >
                {String(
                  getValue()
                ).slice(
                  0,
                  10
                )}
                ...
              </span>
            ),
        },

        {
          accessorKey:
            "projectName",

          header:
            "Project Name",

          cell:
            ({
              getValue,
            }) => (
              <span
                className="
                            text-sm
                            font-bold
                            text-[#0C121A]
                        "
              >
                {getValue()}
              </span>
            ),
        },

        {
          accessorKey:
            "city",

          header:
            "Location",

          cell:
            ({
              row,
            }) => (
              <span
                className="
                            text-sm
                            text-[#475569]
                        "
              >
                {
                  row
                    .original
                    .city
                }
                ,{" "}
                {
                  row
                    .original
                    .state
                }
              </span>
            ),
        },

        {
          accessorKey:
            "clientName",

          header:
            "Client",

          cell:
            ({
              getValue,
            }) => (
              <span
                className="
                            text-sm
                            text-[#475569]
                        "
              >
                {getValue()}
              </span>
            ),
        },

        {
          accessorKey:
            "status",

          header:
            "Status",

          enableSorting:
            false,

          cell:
            ({
              getValue,
            }) => (
              <StatusBadge
                status={getValue()}
              />
            ),
        },

        {
          accessorKey:
            "percentageDone",

          header:
            "Progress",

          cell:
            ({
              getValue,
            }) => (
              <ProgressCell
                value={
                  getValue() ||
                  0
                }
              />
            ),
        },

        {
          accessorKey:
            "totalBudget",

          header:
            "Budget",

          enableSorting:
            false,

          cell:
            ({
              getValue,
            }) => (
              <span
                className="
                                    text-sm
                                    font-semibold
                                    text-[#0C121A]
                                    tabular-nums
                                "
              >
                ₹
                {Number(
                  getValue()
                ).toLocaleString()}
              </span>
            ),
        },

        {
          id: "actions",

          header:
            "Actions",

          enableSorting:
            false,

          cell:
            ({
              row,
            }) => (
              <Link
                to={`/projects/${row.original.projectId}`}
                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    px-4
                                    py-1.5
                                    rounded-lg
                                    border
                                    border-[#FA8316]
                                    text-[#FA8316]
                                    text-xs
                                    font-bold
                                    hover:bg-[#FA8316]
                                    hover:text-white
                                    transition-all
                                    duration-200
                                "
              >
                <Eye
                  className="
                                        w-3.5
                                        h-3.5
                                    "
                />

                View
              </Link>
            ),
        },
      ],
      []
    );


  //  TABLE
  const table =
    useReactTable({
      data:
        filteredProjects,

      columns,

      state: {
        sorting,
      },

      onSortingChange:
        setSorting,

      getCoreRowModel:
        getCoreRowModel(),

      getSortedRowModel:
        getSortedRowModel(),

      getFilteredRowModel:
        getFilteredRowModel(),
    });


  const rows =
    table.getRowModel()
      .rows;


  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* BREADCRUMB */}
      <nav
        className="
                    flex
                    items-center
                    gap-1.5
                    mb-4
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-widest
                "
      >
        <span
          className="
                        text-[#94A3B8]
                    "
        >
          Project
          Management
        </span>

        <ChevronRight
          className="
                        w-3
                        h-3
                        text-[#94A3B8]
                    "
        />

        <span
          className="
                        text-[#FA8316]
                    "
        >
          Projects
        </span>
      </nav>


      {/* HEADER */}
      <div
        className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    justify-between
                    gap-4
                    mb-6
                "
      >
        <h1
          className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-[#0C121A]
                        tracking-tight
                    "
        >
          Projects
        </h1>

        {/* SEARCH */}
        <div
          className="
                        relative
                        w-full
                        sm:w-72
                    "
        >
          <Search
            className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            w-4
                            h-4
                            text-[#94A3B8]
                        "
          />

          <input
            value={
              globalFilter
            }
            onChange={(
              e
            ) =>
              setGlobalFilter(
                e
                  .target
                  .value
              )
            }
            placeholder="Search by project name..."
            className="
                            w-full
                            pl-9
                            pr-4
                            py-2.5
                            rounded-xl
                            border
                            border-[#E3E8EC]
                            bg-white
                            text-sm
                            text-[#0C121A]
                            placeholder-[#94A3B8]
                            outline-none
                            focus:border-[#FA8316]
                            focus:ring-2
                            focus:ring-orange-100
                            transition
                        "
          />
        </div>
      </div>


      {/* TABLE CARD */}
      <div
        className="
                    bg-white
                    rounded-2xl
                    border
                    border-[#E3E8EC]
                    overflow-hidden
                    shadow-sm
                "
      >
        <div
          className="
        overflow-x-auto
        overflow-y-auto
        max-h-[75vh]
    "
        >
          <table
            className="
                            w-full
                            min-w-[780px]
                        "
          >
            <thead>
              <tr
                className="
                                    bg-[#F8FAFC]
                                    border-b
                                    border-[#E3E8EC]
                                "
              >
                {table
                  .getFlatHeaders()
                  .map(
                    (
                      header
                    ) => (
                      <th
                        key={
                          header.id
                        }
                        style={{
                          width:
                            header
                              .column
                              .columnDef
                              .size,
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`
                                                    px-5
                                                    py-4
                                                    text-[11px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.12em]
                                                    text-[#94A3B8]
                                                    text-left
                                                    whitespace-nowrap
                                                    select-none
                                                    ${header
                            .column
                            .getCanSort()
                            ? "cursor-pointer hover:text-[#FA8316] transition-colors"
                            : ""
                          }
                                                `}
                      >
                        <span
                          className="
                                                        inline-flex
                                                        items-center
                                                    "
                        >
                          {flexRender(
                            header
                              .column
                              .columnDef
                              .header,
                            header.getContext()
                          )}

                          {header
                            .column
                            .getCanSort() && (
                              <SortIcon
                                sorted={header.column.getIsSorted()}
                              />
                            )}
                        </span>
                      </th>
                    )
                  )}
              </tr>
            </thead>

            <tbody>

              {/* LOADING */}
              {loading ? (
                <tr>
                  <td
                    colSpan={
                      columns.length
                    }
                    className="
                                            py-24
                                            text-center
                                        "
                  >
                    <div
                      className="
                                                flex
                                                flex-col
                                                items-center
                                                gap-4
                                            "
                    >
                      <div
                        className="
                                                    w-10
                                                    h-10
                                                    border-4
                                                    border-orange-200
                                                    border-t-[#FA8316]
                                                    rounded-full
                                                    animate-spin
                                                "
                      />

                      <span
                        className="
                                                    text-sm
                                                    text-[#64748B]
                                                "
                      >
                        Fetching
                        projects...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : error ? (

                /* ERROR */
                <tr>
                  <td
                    colSpan={
                      columns.length
                    }
                    className="
                                            py-20
                                            text-center
                                        "
                  >
                    <div
                      className="
                                                flex
                                                flex-col
                                                items-center
                                                gap-4
                                            "
                    >
                      <p
                        className="
                                                    text-red-500
                                                    text-sm
                                                    font-medium
                                                "
                      >
                        {
                          error
                        }
                      </p>

                      <button
                        onClick={fetchProjects}
                        className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-5
                                                    py-2.5
                                                    rounded-xl
                                                    bg-[#FA8316]
                                                    text-white
                                                    text-sm
                                                    font-semibold
                                                    hover:opacity-90
                                                    transition
                                                "
                      >
                        <RefreshCcw className="w-4 h-4" />
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : rows.length ===
                0 ? (

                /* EMPTY */
                <tr>
                  <td
                    colSpan={
                      columns.length
                    }
                    className="
                                            py-20
                                            text-center
                                        "
                  >
                    <div
                      className="
                                                flex
                                                flex-col
                                                items-center
                                                gap-3
                                                text-[#94A3B8]
                                            "
                    >
                      <FolderOpen
                        className="
                                                    w-10
                                                    h-10
                                                    opacity-40
                                                "
                      />

                      <span
                        className="
                                                    text-sm
                                                    font-medium
                                                "
                      >
                        No
                        projects
                        found
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map(
                  (
                    row,
                    idx
                  ) => (
                    <tr
                      key={
                        row.id
                      }
                      className={`
                                                transition-colors
                                                hover:bg-[#FFFAF5]
                                                ${idx <
                          rows.length -
                          1
                          ? "border-b border-[#F1F5F9]"
                          : ""
                        }
                                            `}
                    >
                      {row
                        .getVisibleCells()
                        .map(
                          (
                            cell
                          ) => (
                            <td
                              key={
                                cell.id
                              }
                              className="
                                                                px-5
                                                                py-5
                                                                align-middle
                                                            "
                            >
                              {flexRender(
                                cell
                                  .column
                                  .columnDef
                                  .cell,
                                cell.getContext()
                              )}
                            </td>
                          )
                        )}
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;




































// import React, { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import { Line as LineProgress } from "rc-progress";
// import {
//   ChevronRight,
//   Eye,
//   ArrowUpDown,
//   ArrowUp,
//   ArrowDown,
//   Search,
//   FolderOpen,
// } from "lucide-react";
// import { projectsData } from "../../../../data/sampleData";

// // ─── Status config 
// const STATUS_CONFIG = {
//   ONGOING: { label: "Ongoing", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
//   PLANNING: { label: "Planning", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400", border: "border-amber-200" },
//   ON_HOLD: { label: "On Hold", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", border: "border-slate-200" },
//   COMPLETED: { label: "Completed", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200" },
// };

// // ─── Progress stroke color by value 
// const progressStroke = (pct) => {
//   if (pct >= 80) return "#10B981";
//   if (pct >= 50) return "#FA8316";
//   if (pct >= 25) return "#FBBF24";
//   return "#F87171";
// };

// // ─── Sub-components 
// const StatusBadge = ({ status }) => {
//   const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PLANNING;
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border
//         ${cfg.bg} ${cfg.text} ${cfg.border}`}
//     >
//       <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
//       {cfg.label}
//     </span>
//   );
// };

// const ProgressCell = ({ value }) => (
//   <div className="flex items-center gap-3 min-w-[130px]">
//     <div className="flex-1">
//       <LineProgress
//         percent={value}
//         strokeWidth={4}
//         trailWidth={4}
//         strokeColor={progressStroke(value)}
//         trailColor="#F1F5F9"
//         strokeLinecap="round"
//       />
//     </div>
//     <span className="text-xs font-bold text-[#64748B] w-8 text-right tabular-nums">
//       {value}%
//     </span>
//   </div>
// );

// const SortIcon = ({ sorted }) => {
//   if (!sorted) return <ArrowUpDown className="w-3.5 h-3.5 ml-1 opacity-40" />;
//   if (sorted === "asc") return <ArrowUp className="w-3.5 h-3.5 ml-1 text-[#FA8316]" />;
//   return <ArrowDown className="w-3.5 h-3.5 ml-1 text-[#FA8316]" />;
// };

// // ─── Main page 
// const Projects = () => {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [sorting, setSorting] = useState([]);

//   const columns = useMemo(() => [
//     {
//       accessorKey: "id",
//       header: "ID",
//       size: 60,
//       cell: ({ getValue }) => (
//         <span className="text-sm text-[#94A3B8] font-semibold tabular-nums">{getValue()}</span>
//       ),
//     },
//     {
//       accessorKey: "name",
//       header: "Project Name",
//       cell: ({ getValue }) => (
//         <span className="text-sm font-bold text-[#0C121A]">{getValue()}</span>
//       ),
//     },
//     {
//       accessorKey: "location",
//       header: "Location",
//       cell: ({ getValue }) => (
//         <span className="text-sm text-[#475569]">{getValue()}</span>
//       ),
//     },
//     {
//       accessorKey: "client",
//       header: "Client",
//       cell: ({ getValue }) => (
//         <span className="text-sm text-[#475569]">{getValue()}</span>
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       enableSorting: false,
//       cell: ({ getValue }) => <StatusBadge status={getValue()} />,
//     },
//     {
//       accessorKey: "progress",
//       header: "Progress",
//       cell: ({ getValue }) => <ProgressCell value={getValue()} />,
//     },
//     {
//       accessorKey: "budget",
//       header: "Budget",
//       enableSorting: false,
//       cell: ({ getValue }) => (
//         <span className="text-sm font-semibold text-[#0C121A] tabular-nums">{getValue()}</span>
//       ),
//     },
//     {
//       id: "actions",
//       header: "Actions",
//       enableSorting: false,
//       // Navigate to /projects/:id using Link
//       cell: ({ row }) => (
//         <Link
//           to={`/projects/${row.original.id}`}
//           className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-[#FA8316] text-[#FA8316] text-xs font-bold hover:bg-[#FA8316] hover:text-white transition-all duration-200"
//         >
//           <Eye className="w-3.5 h-3.5" />
//           View
//         </Link>
//       ),
//     },
//   ], []);

//   const table = useReactTable({
//     data: projectsData,
//     columns,
//     state: { globalFilter, sorting },
//     onGlobalFilterChange: setGlobalFilter,
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   const rows = table.getRowModel().rows;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">

//       {/* Breadcrumb */}
//       <nav className="flex items-center gap-1.5 mb-4 text-[11px] font-semibold uppercase tracking-widest">
//         <span className="text-[#94A3B8] hover:text-[#FA8316] cursor-pointer transition-colors">
//           Demand Management
//         </span>
//         <ChevronRight className="w-3 h-3 text-[#94A3B8]" />
//         <span className="text-[#FA8316]">Projects</span>
//       </nav>

//       {/* Page header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#0C121A] tracking-tight">Projects</h1>

//         {/* Search */}
//         <div className="relative w-full sm:w-72">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
//           <input
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder="Search projects…"
//             className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E3E8EC] bg-white text-sm text-[#0C121A] placeholder-[#94A3B8] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition"
//           />
//         </div>
//       </div>

//       {/* Table card */}
//       <div className="bg-white rounded-2xl border border-[#E3E8EC] overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[780px]">
//             <thead>
//               <tr className="bg-[#F8FAFC] border-b border-[#E3E8EC]">
//                 {table.getFlatHeaders().map((header) => (
//                   <th
//                     key={header.id}
//                     style={{ width: header.column.columnDef.size }}
//                     onClick={header.column.getToggleSortingHandler()}
//                     className={`px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#94A3B8] text-left whitespace-nowrap select-none
//                       ${header.column.getCanSort() ? "cursor-pointer hover:text-[#FA8316] transition-colors" : ""}`}
//                   >
//                     <span className="inline-flex items-center">
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                       {header.column.getCanSort() && (
//                         <SortIcon sorted={header.column.getIsSorted()} />
//                       )}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {rows.length === 0 ? (
//                 <tr>
//                   <td colSpan={columns.length} className="py-20 text-center">
//                     <div className="flex flex-col items-center gap-3 text-[#94A3B8]">
//                       <FolderOpen className="w-10 h-10 opacity-40" />
//                       <span className="text-sm font-medium">No projects found</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 rows.map((row, idx) => (
//                   <tr
//                     key={row.id}
//                     className={`transition-colors hover:bg-[#FFFAF5] ${idx < rows.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="px-5 py-5 align-middle">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         {rows.length > 0 && (
//           <div className="px-5 py-3 border-t border-[#F1F5F9]">
//             <span className="text-xs text-[#94A3B8]">
//               Showing{" "}
//               <span className="font-semibold text-[#475569]">{rows.length}</span> of{" "}
//               <span className="font-semibold text-[#475569]">{projectsData.length}</span> projects
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Projects;