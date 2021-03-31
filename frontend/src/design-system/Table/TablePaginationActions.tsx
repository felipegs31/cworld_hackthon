import React from "react";
import { withStyles } from '@material-ui/core/styles';
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";

const actionsStyles = (theme: any) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: '1rem',
  },
});

interface props {
  classes: any
  count: any
  page: any
  rowsPerPage: any
  theme: any
  onChangePage: ((event:any, page:any) => void)
}

const TablePaginationActions: React.FC<props> = (props) => {
  const handleFirstPageButtonClick = (event: any) => {
   props.onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
   props.onChangePage(event, props.page - 1);
  };

  const handleNextButtonClick = (event: any) => {
   props.onChangePage(event, props.page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
   props.onChangePage(
      event,
      Math.max(0, Math.ceil(props.count /props.rowsPerPage) - 1),
    );
  };

  const { classes, count, page, rowsPerPage, theme } = props;

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );

}



const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export default TablePaginationActionsWrapped
