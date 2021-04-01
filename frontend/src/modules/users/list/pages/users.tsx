import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../state/actions";
import {
  Paper,
  Avatar,
  Table,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  makeStyles,
  TableCell,
  Dialog
} from '@material-ui/core';
import { IApplicationState } from "../../../../store/roots/rootReducer";
import TableTitle from "../../../../design-system/Table/TableTitle";
import EnhancedTableHead from "../../../../design-system/Table/EnhancedTableHead";
import { IPayload } from "../../../../utils/models/IPayload";
import TablePaginationActionsWrapped from "../../../../design-system/Table/TablePaginationActions";
import { IUser } from "../models/IUser";
import UserModal from "../components/UserModal/UserModal";


const useStyles = makeStyles(() => ({
  table: {
    position: 'relative',
  },
  // opacityContainer: {
  //   opacity: loading ? '0.3' : '1',
  // },
  tableRow: {
    cursor: 'pointer',
  },
  spinner: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: '-5px',
    opacity: '1',
    zIndex: 2,
  },
  noResults: {
    height: '100px',
  },
  avatar: {
    fontSize: '0.7rem',
    width: '2.75rem',
    height: '2.75rem',
    marginRight: '0.5rem'
  },
  tableCell: {
    fontSize: '0.8rem',
    padding: '0.25rem',
    flexWrap: 'wrap'
  }
})
)

const Users: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isFirstSearch, setIsFirstSearch] = useState(true);


  const users: IPayload<IUser[]> = useSelector((state: IApplicationState) => state.usersList.users)
  const sortAsc: boolean = useSelector((state: IApplicationState) => state.usersList.sortAsc)
  const sort: string = useSelector((state: IApplicationState) => state.usersList.sort)
  const limit: number = useSelector((state: IApplicationState) => state.usersList.limit)
  const searchText: string = useSelector((state: IApplicationState) => state.usersList.searchText)
  const page: number = useSelector((state: IApplicationState) => state.usersList.page)
  const userModalOpen: boolean = useSelector((state: IApplicationState) => state.usersList.userModalOpen)

  const loading: boolean = useSelector((state: IApplicationState) => state.usersList.loading)

  const headRows = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "email", numeric: false, disablePadding: false, label: "E-mail" },
    { id: "role", numeric: false, disablePadding: false, label: "Role" },
  ];

  const restaurantsListRequest = () => {
    dispatch(actions.usersListRequest())
  }

  const selectRow = (event:any, user:IUser) => {
    dispatch(actions.openUserModal(user))
  }

  const handleChangePageUser = (e: any, page: number) => {
    dispatch(actions.usersListChangePage(page + 1))
  }

  const handleChangeLimit = (e: any) => {
    dispatch(actions.usersListChangeLimit(Number(e.target.value)))
  }

  const handleRequestSortUser = (event: any, property: any)  => {
    const isAsc = sort !== property || sortAsc === false;
    dispatch(actions.usersListChangeSort(isAsc, property))
  }

  useEffect(() => {
    restaurantsListRequest()
  }, [])

  const handleCloseUserModal = () => {
    dispatch(actions.closeUserModal())
  }

  const changeSearchText = (text: string) => {
    if (!isFirstSearch) {
      dispatch(actions.usersListChangeSearchText(text))
    }
    setIsFirstSearch(false)
  }

  const addUser = () => {
    dispatch(actions.openUserModal())
  }

  return (
    <>
      <Paper>
        <TableTitle
          title='Users'
          placeholder='search'
          value={searchText}
          onChange={text => changeSearchText(text)}
          addRow={() => addUser()}
        />
        <Table className={classes.table}>
          <tbody>
            <tr>
              <td>
                {loading &&
                  <div className={classes.spinner}>
                    <CircularProgress />
                  </div>}
                {users.rows.length === 0 &&
                  <div className={classes.noResults}>
                    {!loading && <Typography className={classes.spinner}>Nenhum resultado encontrado</Typography>}
                  </div>}
              </td>
            </tr>
          </tbody>
          <EnhancedTableHead
            headRows={headRows}
            order={sortAsc}
            orderBy={sort}
            onRequestSort={handleRequestSortUser}
          />
          <TableBody>
            {users.rows.map((user, index) => (
              <TableRow
                className={classes.tableRow}
                key={user.id}
                hover
                onClick={event => selectRow(event, user)}
              >
                <TableCell className={classes.tableCell}>
                  <div style={{ display: 'flex', marginLeft: '0.5rem', alignItems: 'center' }}>
                    <Avatar className={classes.avatar} src={user.picture} />
                    {user.name}
                  </div>
                </TableCell>
                <TableCell className={classes.tableCell}>{user.email}</TableCell>
                <TableCell className={classes.tableCell}>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={users.count}
                rowsPerPage={limit}
                page={page - 1}
                SelectProps={{
                  native: true
                }}
                onChangePage={handleChangePageUser}
                onChangeRowsPerPage={handleChangeLimit}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
      <Dialog
        scroll='body'
        fullWidth
        open={userModalOpen}
        onClose={() => handleCloseUserModal()}
      >
        <UserModal/>
      </Dialog>
    </>
  )
}



export default Users

