/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  // AiOutlineArrowDown,
  // AiOutlineArrowUp,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { type JSX } from "react/jsx-runtime";
import { type UserType, type DLocation } from "../../../interfaces";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { useExportData } from "react-table-plugins";
import JsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "../Loader";
import "./style.css";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { RiLoader4Line } from "react-icons/ri";
import Button from "../Button";
import { MdOutlineRefresh } from "react-icons/md";

interface COLUMNTYPE {
  Header: string;
  accessor: string;
}
interface PRODUCTTYPE {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}
interface ORDERTYPE {
  id: string;
  productCode: string;
  date: string;
  amount: number;
  quantity: number;
  customer: string;
  status: string;
}

interface ORDERITEMS {
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}
interface SHOPTYPE {
  name: string;
  location: string;
  description: string;
}
interface COMMISIONTYPE {
  id: string;
  name: string;
  status: string;
  amount_ugx: number;
  date: string;
}

interface REVIEWSTYPE {
  id: number;
  reviewer: {
    name: string;
    email: string;
  };
  date: {
    value: string;
    time: string;
  };
  review_rating: number;
  description: string;
}
interface TABLEPROPS {
  data:
    | ORDERTYPE[]
    | PRODUCTTYPE[]
    | SHOPTYPE[]
    | COMMISIONTYPE[]
    | REVIEWSTYPE[]
    | ORDERITEMS[]
    | DLocation[]
    | UserType[];
  columns: COLUMNTYPE[];
  isLoading?: boolean;
  emptyText?: string;
  addButtonText?: string;
  hideActions?: boolean;
  search?: string;
  tableHeader?: string;
  hideNavigation?: boolean;
  showExportButton?: boolean;
  searchInputPlaceholder?: string;
  onViewHandler?: (data: any) => void;
  onEditHandler?: (data: any) => void;
  onDeleteHandler?: (data: any) => void;
  onAddNewHandler?: () => void;
  onRefresh?: () => void;
}

function GGTable({
  data,
  columns,
  isLoading,
  emptyText,
  addButtonText,
  hideActions,
  showExportButton,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  onAddNewHandler,
  onRefresh,
  tableHeader,
  searchInputPlaceholder,
  hideNavigation,
}: TABLEPROPS) {
  const [tableColumns, setTableColumns] = useState<COLUMNTYPE[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current === null) return;

      if (
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      title: "View",
      icon: <AiOutlineEye />,
      show: !!onViewHandler,
      onClick: (e: any, rowData: any) => {
        e.stopPropagation();
        if (onViewHandler) {
          onViewHandler(rowData);
        }
      },
    },
    {
      title: "Edit",
      icon: <AiOutlineEdit />,
      show: !!onEditHandler,
      onClick: (e: any, rowData: any) => {
        e.stopPropagation();
        if (onEditHandler) {
          onEditHandler(rowData);
        }
      },
    },
    {
      title: "Delete",
      icon: <BiTrash />,
      show: !!onDeleteHandler,
      onClick: (e: any, rowData: any) => {
        e.stopPropagation();
        if (onDeleteHandler) {
          onDeleteHandler(rowData);
        }
      },
    },
  ];

  const showMenus = menuItems.filter((item) => item.show).length > 0;

  useEffect(() => {
    const handleMenuToggle = (index: number) => {
      if (selectedRowIndex === index) {
        setMenuOpen(!menuOpen);
      } else {
        setSelectedRowIndex(index);
        setMenuOpen(true);
      }
    };
    if (!hideActions && showMenus) {
      const actionColumn = {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        style: { textAlign: "center" },
        Cell: ({ row }: { row: any }) => (
          <div className="relative flex justify-center">
            <button
              type="button"
              onClick={(e: any) => {
                e.stopPropagation();
                handleMenuToggle(row.index as number);
              }}
              title="Show Menu"
              className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center hover:bg-primary"
            >
              <HiDotsVertical />
            </button>

            {menuOpen && selectedRowIndex === row.index && (
              <div
                className="flex flex-col justify-start gap-1 absolute bg-white rounded-sm px-3 py-2 top-6 right-12 shadow-md"
                ref={menuRef}
                style={{
                  zIndex: 1000,
                }}
              >
                {menuItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <div
                      key={Math.random()}
                      title={item.title}
                      onClick={(e) => {
                        item.onClick(e, row.original);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 cursor-pointer text-textColor2 hover:text-primary hover:bg-[aliceblue] w-full px-3 py-2 rounded-md`}
                    >
                      {item.icon} {item.title}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ),
      };
      setTableColumns([...columns, actionColumn]);
    } else {
      setTableColumns(columns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, menuOpen]);

  const modifiedColumns = useMemo(() => tableColumns, [tableColumns]);

  const getExportFileBlob = ({
    columns: dataColumns,
    data: tableData,
    fileType,
    fileName,
  }: {
    columns: any;
    data: any;
    fileType: string;
    fileName: string;
  }) => {
    // PDF example
    if (fileType === "pdf") {
      const headerNames = dataColumns
        .filter((column: any) => column.Header !== "Actions")
        .map((column: any) => column.exportValue);
      const doc = new JsPDF() as any;

      console.log("document", doc);

      doc.autoTable({
        head: [headerNames],
        body: tableData,
        margin: { top: 20 },
        styles: {
          minCellHeight: 9,
          halign: "left",
          valign: "center",
          fontSize: 11,
          backgroundColor: "red",
        },
        bodyStyles: {
          backgroundColor: "red",
        },
        headStyles: {
          backgroundColor: "#f0f0f0",
        },
      });
      doc.save(`${fileName}.pdf`);

      return false;
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    prepareRow,
    setGlobalFilter,
    exportData,
  } = useTable(
    {
      columns: modifiedColumns,
      data: data ?? [],
      initialState: { pageSize: 5 },
      getExportFileBlob,
    },
    useGlobalFilter,
    usePagination,
    useExportData
  );

  const [searchTerm, setSearchTerm] = useState("");

  const getNoDataText = () => {
    if (isLoading) return null;
    if (searchTerm) {
      return (
        <span>
          No search result for{" "}
          <strong className="font-semibold">{searchTerm}</strong>
        </span>
      );
    }

    return emptyText ?? "No data";
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setGlobalFilter(value);
  };

  const { pageIndex } = state;

  return (
    <div className="w-full  mb-4">
      {!hideNavigation && (
        <>
          <div
            className={`mb-8 flex items-center gap-2 ${
              tableHeader ? "justify-between" : "justify-end"
            }`}
          >
            {tableHeader && (
              <div>
                <h4 className="text-lg font-semibold font-poppins text-primary">
                  {tableHeader}
                </h4>
              </div>
            )}
            {showExportButton && (
              <button
                className="text-sm font-medium bg-primaryLight text-primary hover:bg-primary/20 px-4 py-1 rounded-full disabled:bg-[#fceff3] disabled:cursor-not-allowed"
                onClick={() => {
                  // TODO: Export to pdf
                  exportData("pdf", true);
                  console.log("Exporting data to pdf");
                }}
                disabled={isLoading || data.length < 1}
              >
                Export Pdf
              </button>
            )}
            {onAddNewHandler && (
              <button
                className="flex items-center gap-1 text-sm font-medium bg-primary hover:bg-primary/80 text-white px-4 py-1 rounded-full disabled:bg-[#fceff3] disabled:cursor-not-allowed"
                onClick={onAddNewHandler}
              >
                <FaPlus />
                {addButtonText ?? "Add New"}
              </button>
            )}
          </div>
          <div className="my-4 flex items-center justify-end gap-1">
            {onRefresh && (
              <Button
                type="button"
                title="Refresh"
                variant="default"
                onClick={onRefresh}
                className="h-9"
              >
                <MdOutlineRefresh
                  className={isLoading ? "animate-spin text-lg" : "text-lg"}
                />
              </Button>
            )}
            <div>
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={searchInputPlaceholder ?? "Search..."}
                className="w-full p-2 border border-[#E2E1E1] rounded-md focus:outline-none focus:border-primary focus:ring-primary gg__search_input"
              />
            </div>

            <div className="flex items-center !text-primary gap-1">
              <select
                disabled={isLoading}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setPageSize(Number(e.target.value));
                }}
                className="gg__search_input appearance-none !text-primary rounded-md py-1 md:py-1 px-2 focus:outline-none focus:border-primary hover:border-primary leading-tight"
              >
                {[5, 10, 20, 30, 40, 50].map((pSize) => (
                  <option key={pSize} value={pSize}>
                    {pSize}
                  </option>
                ))}
              </select>
              /Page
            </div>
          </div>
        </>
      )}
      <div className="w-full overflow-x-auto table-wrapper relative">
        {isLoading && data.length > 0 && (
          <div
            className="table-wrapper__overlay absolute top-0 right-0 left-0 bottom-0  w-full z-10 flex items-center justify-center text-center bg-white/40"
            style={{ display: isLoading ? "flex" : "none", overflow: "hidden" }}
          >
            <RiLoader4Line className="animate-spin text-primary text-4xl" />
          </div>
        )}
        <table
          {...getTableProps}
          className={`table-auto text-sm border-collapse w-full data-table ${
            showMenus && data.length > 0 ? "has-actions" : ""
          }`}
        >
          <thead className="bg-[#e0e0e0]">
            {headerGroups?.map(
              (headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: Array<{
                  getHeaderProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableHeaderCellElement> &
                    React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                  render: (
                    arg0: string
                  ) =>
                    | string
                    | number
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined;
                }>;
              }) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(
                    (column: {
                      getHeaderProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableHeaderCellElement> &
                        React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                      render: (
                        arg0: string
                      ) =>
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <th
                        {...column.getHeaderProps()}
                        // @ts-expect-error leave-this-to-dynamically-apply-styles-to-table-columns
                        style={column?.style}
                        className="font-semibold capitalize font-poppins text-left text-sm text-textColor p-2 pt-0 pb-3 whitespace-nowrap"
                      >
                        {column.render("Header")}
                      </th>
                    )
                  )}
                </tr>
              )
            )}
          </thead>

          {isLoading && data?.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={modifiedColumns.length}
                  className="text-center p-4"
                >
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody {...getTableBodyProps}>
              {page?.map(
                (row: {
                  getRowProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableRowElement> &
                    React.HTMLAttributes<HTMLTableRowElement>;
                  cells: any[];
                }) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="group even:bg-[#fdc427]/50 hover:bg-tableHover transition-all duration-300 hover:text-gray-800 hover:cursor-pointer"
                    >
                      {row.cells.map(
                        (cell: {
                          column: any;
                          getCellProps: () => JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLTableDataCellElement> &
                            React.TdHTMLAttributes<HTMLTableDataCellElement>;
                          render: (
                            arg0: string
                          ) =>
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                        }) => (
                          <td
                            {...cell.getCellProps()}
                            className="text-left p-2  font-poppins font-regular text-sm"
                            style={cell.column?.style}
                          >
                            {cell.render("Cell")}
                          </td>
                        )
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          )}
        </table>
      </div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        {page?.length < 1 && getNoDataText()}
      </p>

      {pageOptions.length > 1 && !hideNavigation && (
        <div className="flex gap-4 my-6 justify-end">
          <button
            type="button"
            disabled={!canPreviousPage || isLoading}
            onClick={() => {
              previousPage();
            }}
            className="text-sm font-medium bg-primary text-white px-4 py-1 rounded-full disabled:bg-[#fceff3] disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm font-poppins">{`${pageIndex + 1} of ${
            pageOptions.length
          }`}</span>
          <button
            type="button"
            disabled={!canNextPage || isLoading}
            onClick={() => {
              nextPage();
            }}
            className="text-sm font-medium bg-primary text-white px-4 py-1 rounded-full disabled:bg-[#fceff3] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default GGTable;
