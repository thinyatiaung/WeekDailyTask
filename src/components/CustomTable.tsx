import { FC } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import { DataGridPro } from '@mui/x-data-grid-pro';

type tableProps = {
  totalRecord?: any,
  columns?: any,
  rows?: any,
  pagination?: any;
  isLoading?: boolean;
  children?: React.ReactNode;
  height?: string;
  cellHeight?: string;
  currentPage?: number;
  pageSize?: number;
  setCurrentPage?: (val: any) => void;
  setPageSize?: (val: any) => void;
  rowHeight?: number;
}

const CustomTable: FC<tableProps> = ({
  totalRecord = [],
  columns = [],
  rows = [],
  pagination = {},
  currentPage,
  pageSize,
  setCurrentPage,
  isLoading,
  rowHeight,
}) => {

  return (
    <>
      <Paper sx={{ width: '100%', boxShadow: 'none', border: '1px solid #8080803d', marginTop: '15px', height: 'max-content !important' }}>
        <DataGrid
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          rows={rows}
          columns={columns}
          hideFooter={true}
          loading={isLoading}
          rowHeight={rowHeight ? rowHeight : 55}
          autoHeight={true}
          showColumnVerticalBorder
          showCellVerticalBorder
          density='compact'
          pagination
          sx={{
            '& .MuiDataGrid-virtualScroller .MuiDataGrid-virtualScrollerRenderZone': {
              position: 'relative !important',
            },
            '& .MuiDataGrid-columnHeadersInner': {
              background: '#89bceb',
              '& .MuiDataGrid-columnHeader': {
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none !important'
                },
                '& .MuiDataGrid-iconButtonContainer':{
                  width: '0 !important',
                },
              },
              '& .MuiDataGrid-columnHeader--sorted':{
                '& .MuiDataGrid-iconButtonContainer':{
                  width: 'auto !important'
                }
              },
              '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: '600',
              },
            },
            '& .MuiDataGrid-row, .MuiDataGrid-cell': {
              height: 'max-content',
              '& .MuiDataGrid-cellContent': {
                overflow: 'hidden !important',
                textWrap: 'nowrap !important',
                textOverflow: 'ellipsis !important',
                maxHeight: 'max-content !important',
              },
              '&:hover': {
                background: 'unset !important'
              },
              '&:focus, :focus-within': {
                outline: 'none',
                background: 'unset !important'
              },
              '& .MuiButtonBase-root': {
                padding: '10px',
                borderRadius: '5px',
              }
            },
            '& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell': {
              overflow: 'visible !important',
              textWrap: 'pretty !important',
              maxHeight: 'max-content !important',
            },
            '& .MuiDataGrid-row.Mui-selected': {
              background: 'unset !important'
            },
            '& .MuiSvgIcon-root': {
              fontSize: '25px !important',
              cursor: 'pointer'
            }
          }}
        />
      </Paper>
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{
          fontWeight: '550',
          color: '#4c0fb2',
          fontSize: '13px',
          marginLeft: '5px'
        }}>Result {totalRecord > 1 ? (currentPage - 1) * pageSize + 1 : 0} - {pageSize * currentPage < totalRecord ? pageSize * currentPage : totalRecord} of  {totalRecord}</Typography>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalRecord / pageSize)}
          onChange={(page: any) => {
            setCurrentPage(page);
          }
          } />
      </Box> */}
    </>
  );
}
export default CustomTable;