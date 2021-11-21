import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserCustid } from 'app/redux/userSlice';
import { useSnackbar } from 'notistack';
import { 
  useGetLocationsByCustidQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation, 
  apiSlice,
} from 'app/redux/apiSlice';
import { 
  addNewLocation, 
  editLocation, 
  removeLocation,  
} from 'app/redux/locationsSlice';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  Box,
  Button,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  CircularProgress,
  Paper,
  Switch,
} from '@material-ui/core';
const useStyles = makeStyles({
  container: {
    display: 'flex',
    marginBottom: '2em',
    flexDirection: 'column',
    justifyContent: 'flexStart',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: '1',
    '@media (max-width: 760px)': {
      flexDirection: 'column',
      justifyContent: 'flexStart',
    },
  },
  text: {
    marginLeft: '1vw',
    marginRight: '1vw',
  },
  textfield: {
    marginRight: '1rem',
  },
});

export const ListLocations = () => {
  let custid = useSelector(selectUserCustid);

  const dispatch = useDispatch();
  //read Locations from db
  //console.log(`FetchData start`);
    const { 
      data: list = [],
      isLoading,
      isFetching, 
      isSuccess,
      isError,
      error, 
    } = useGetLocationsByCustidQuery(custid);
    let success = false;
    let content;
    let rows = [];

    if (isLoading) {
      content = <CircularProgress />
      //console.log(`isLoading`);
      return null;

    } else if (isFetching) {
      content = <CircularProgress />
      //console.log(`isFetching`);
      return null;
      
    } else if (isError) {
      console.log(`isError: `, error);
      success=false;
      return null;

    } else if(isSuccess) {
      success=true;
      let locs = list.map((loc) => {
        loc = {...loc, st: loc.stateid};
        dispatch(addNewLocation(loc));
        console.log(`isSuccess loc: `, loc);
        return loc;
      });
    
      rows = locs.map((row) => {
        row = {...row, st: row.stateid};
        return row;
      });
    };

    return (
      <EnhancedTable rows={rows} custid={custid}/>
    );  
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  if (array.length > 0) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
  }
}

const headCells = [
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'st',
    numeric: false,
    disablePadding: false,
    label: 'State',
  },
  {
    id: 'zip',
    numeric: false,
    disablePadding: false,
    label: 'Zip',
  },
  {
    id: 'nickname',
    numeric: false,
    disablePadding: false,
    label: 'Nickname',
  },
  {
    id: 'weatheralert',
    numeric: false,
    disablePadding: true,
    label: 'Weather Alerts',
  },
  {
    id: 'virusalert',
    numeric: false,
    disablePadding: true,
    label: 'Virus Alerts',
  },
  {
    id: 'airalert',
    numeric: false,
    disablePadding: true,
    label: 'Air Quality',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTable(props) {
  const { rows, custid } = props;

  let length = rows.length;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [ deleteLocation ] = useDeleteLocationMutation();
  const dispatch = useDispatch();
  const [ updateLocation ] = useUpdateLocationMutation();  
  const { enqueueSnackbar } = useSnackbar();

  function handleLoctionsRefetch({custid}) {
    // has the same effect as `refetch` for the associated query
    dispatch(
      apiSlice.endpoints.getLocationsByCustid.initiate(custid,
        {subscribe: false, forceRefetch: true }
      )
    );
  };
  
  const handleChange = (e, row) => {
    e.preventDefault();
    let field = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    //console.log(`row: `, row.id, row);
    let loc = Object.assign({}, row);
    loc = {...loc, [field]: value};
    
    if(e.target.type === 'checkbox') {
    try {
      updateLocation(loc).unwrap();
    
      } catch(error) {
        console.log(`rejected error: `, error);
        // enqueueSnackbar(`Failed to update location`, {
        //   variant: 'info',
        // });
      };
      dispatch(editLocation(loc));
    };
    handleLoctionsRefetch({custid: custid});
    console.log(`HandleChange field: value `, field, value);
  };
  
  function HandleDelete (e) {
    if(selected.length > 0) {
      selected.forEach(id => {
        try {
          //console.log(`id: `, id);
          deleteLocation(id).unwrap();
          
          } catch (err) {
            console.log(`delete err: `, err);
            const message = 'Delete location failed.';
            enqueueSnackbar(message, {
              variant: 'error',
              autoHideDuration: 5000,
            });
          };
          dispatch(removeLocation(id));
          handleLoctionsRefetch({custid: custid});
      });
      handleLoctionsRefetch({custid: custid});
    };
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      //console.log(`selected: `, selected, `newSelecteds: `, newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    //console.log(`selected: `, selected, `newSelected: `, newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 500 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            overflow-y="auto"
            overflow-x="hidden"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow 
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id+''}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      
                      <TableCell align="left">{row.city}</TableCell>
                      <TableCell align="left">{row.st}</TableCell>
                      <TableCell align="left">{row.zip}</TableCell>
                      <TableCell align="left">{row.nickname}</TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          defaultChecked={row.weatheralert}
                          name='weatheralert'
                          onChange={e => handleChange(e, row)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          defaultChecked={row.virusalert}
                          name='virusalert'
                          onChange={e => handleChange(e, row)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          defaultChecked={row.airalert}
                          name='airalert'
                          onChange={e => handleChange(e, row)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow key={emptyRows+''}
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    
        <Button variant="contained" 
        className="btn btn-warning font-weight-bold mr-20" 
        startIcon={<DeleteForeverIcon />}
        disabled={selected.length > 0 ? false : true}
        onClick={HandleDelete}>
        Delete
        </Button>    
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Condensed Display"
        />
    
    </Box>
  );
};
