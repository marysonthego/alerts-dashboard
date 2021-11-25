import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserCustid } from 'app/redux/userSlice';
import { useSnackbar } from 'notistack';
import { 
  useGetFriendsByCustidQuery,
  useDeleteFriendMutation, 
  apiSlice,
} from 'app/redux/apiSlice';
import { 
  addNewFriend,  
  removeFriend,  
} from 'app/redux/friendsSlice';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//import Stack from '@material-ui/Stack'; - not until MUI v5 :(
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
    '@media (max-width: 560px)': {
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

export const ListFriends = () => {
  let custid = useSelector(selectUserCustid);
  const dispatch = useDispatch();
  //read Friends from db
    //console.log(`FetchData start`);
    const { 
      data: list = [],
      isLoading,
      isFetching, 
      isSuccess,
      isError,
      error, 
    } = useGetFriendsByCustidQuery(custid);
    let success = false;
    let content;
    let rows = [];

    if (isLoading) {
      content = <CircularProgress />
      console.log(`isLoading`);
      return null;

    } else if (isFetching) {
      content = <CircularProgress />
      console.log(`isFetching`);
      return null;
      
    } else if (isError) {
      console.log(`isError: `, error);
      success=false;
      return null;

    } else if(isSuccess) {
      success=true;
      let frs = list.map((fr) => {
        fr = {...fr, st: fr.stateid};
        dispatch(addNewFriend(fr));
        console.log(`isSuccess fr: `, fr);
        return fr;
      });
    
      rows = frs.map((row) => {
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
    id: 'firstname',
    numeric: false,
    disablePadding: false,
    label: 'First name',
  },
  {
    id: 'cell',
    numeric: false,
    disablePadding: false,
    label: 'Cell',
  },
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
  const classes = useStyles();
  let length = rows.length;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [ deleteFriend ] = useDeleteFriendMutation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function handleFriendsRefetch({custid}) {
    // has the same effect as `refetch` for the associated query
    dispatch(
      apiSlice.endpoints.getFriendsByCustid.initiate(custid,
        {subscribe: false, forceRefetch: true }
      )
    );
  };
  
  function HandleDelete (e) {
    if(selected.length > 0) {
      selected.forEach(id => {
        try {
          console.log(`id: `, id);
          deleteFriend(id).unwrap();
          
          } catch (err) {
            console.log(`delete err: `, err);
            const message = 'Delete friend failed.';
            enqueueSnackbar(message, {
              variant: 'error',
              autoHideDuration: 5000,
            });
          };
          dispatch(removeFriend(id));
          handleFriendsRefetch({custid: custid});
      });
      handleFriendsRefetch({custid: custid});
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
      console.log(`selected: `, selected, `newSelecteds: `, newSelecteds);
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
    console.log(`selected: `, selected, `newSelected: `, newSelected);
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
    <Box className={classes.container}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 500 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
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
                      
                      <TableCell align="left">{row.firstname}</TableCell>
                      <TableCell align="left">{row.cell}</TableCell>
                      <TableCell align="left">{row.city}</TableCell>
                      <TableCell align="left">{row.st}</TableCell>
                      <TableCell align="left">{row.zip}</TableCell>
                      
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow key={emptyRows+''}
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
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
