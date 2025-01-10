import { Box, BoxProps, Table, TableProps, Typography } from "@mui/joy";
import { RiFolderOpenLine } from "@remixicon/react";
import React, { forwardRef, memo } from "react";
import { useIntersectionObserver } from "src/shared/hooks/useIntersectionObserver";

export interface IColumn<T> {
  key: keyof T;
  title: string | React.ReactNode;
  headerProps?: React.ThHTMLAttributes<HTMLTableCellElement>;
  rowProps?: React.TdHTMLAttributes<HTMLTableCellElement>;
  render?: (value: T[keyof T], rowData: T, index: number) => React.ReactNode;
}

export interface AppTableProps<T> extends TableProps {
  data: T[] | null;
  columns: Array<IColumn<T>>;
  loadMore?: () => void;
  onRowClick?: (item: T, index: number) => void;
  containerProps?: BoxProps;
  rowEndDecorator?: (((data: T[], index: number) => React.ReactNode) | null)[];
  rowFooter?: React.ReactNode;
}

const AppTable = memo(
  forwardRef(
    <T,>(
      {
        columns,
        data,
        loadMore,
        onRowClick,
        containerProps,
        rowEndDecorator,
        rowFooter,
        ...props
      }: AppTableProps<T>,
      ref: React.Ref<HTMLTableElement>
    ) => {
      const { setEl } = useIntersectionObserver({ loadMore });
      return (
        <Box height="100%" borderRadius="6px" overflow="hidden">
          <Box height="100%" overflow="auto" {...containerProps}>
            <Table ref={ref} {...props}>
              <thead>
                <tr
                  style={{
                    fontSize: "13px",
                    lineHeight: "24px",
                    letterSpacing: "0.02px",
                  }}
                >
                  {columns.map((column, index) => (
                    <th key={index} {...column.headerProps}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  // Init - Loading
                  data === null ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        style={{ height: "191px" }}
                      ></td>
                    </tr>
                  ) : //  No data
                  data.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        style={{ textAlign: "center", padding: "60px 0" }}
                      >
                        <RiFolderOpenLine size={42} />
                        <Typography level="body1">No data</Typography>
                      </td>
                    </tr>
                  ) : (
                    //  Has data
                    data.map((item, rowIndex) => (
                      <tr
                        key={rowIndex}
                        style={{
                          ...(onRowClick && { cursor: "pointer" }),
                        }}
                        onClick={() => onRowClick?.(item, rowIndex)}
                      >
                        {columns.map((column, colIndex) => (
                          <td
                            key={colIndex}
                            {...column.rowProps}
                            ref={(el) => {
                              if (rowIndex !== data.length - 1) return;

                              setEl(el);
                            }}
                          >
                            {column.render ? (
                              column.render(item[column.key], item, rowIndex)
                            ) : (
                              <>{item[column.key]}</>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )
                }
                {rowEndDecorator?.some(Boolean) && data && data.length > 0 && (
                  <tr>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} {...column.rowProps}>
                        {rowEndDecorator[colIndex]?.(data, colIndex)}
                      </td>
                    ))}
                  </tr>
                )}
                {rowFooter && (
                  <tr>
                    <td colSpan={columns.length}>{rowFooter}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Box>
        </Box>
      );
    }
  )
) as <T>(
  props: AppTableProps<T> & { ref?: React.Ref<HTMLTableElement> }
) => JSX.Element;

export default AppTable;
