import React from 'react';
import {
  Typography,
  InputBase,
  Button,
} from '@material-ui/core';

import AddCircleOutline from '@material-ui/icons/AddCircleOutlineOutlined';
import SearchIcon from '@material-ui/icons/Search';


interface props {
  title: string
  placeholder: string
  value: string
  onChange?: (() => void)
  addRow?: (() => void)
  addRowLabel?: string
}


const TableTitle: React.FC<props> = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.titleRow}>
        <Typography variant='h6' style={{ padding: '8px 0' }}>{props.title}</Typography>
        <div>
          {props.addRow &&
            <Button
							style={styles.actionButton}
							variant='outlined'
							aria-label="add"
							onClick={props.addRow}
							startIcon={<AddCircleOutline />}
						>
							{props.addRowLabel ? props.addRowLabel : 'Add'}
						</Button>}
        </div>
      </div>

      {props.placeholder && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={styles.searchRow}>
          <SearchIcon style={styles.searchIcon} />
          <InputBase
            style={styles.search}
            placeholder={props.placeholder}
            value={props.value ? props.value : ''}
            onChange={props.onChange}
          />
        </div>
      </div>}
    </div>
  )
}

export default TableTitle

const styles = {
  container: {
    padding: '10px 20px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exportButton: {
    marginRight: 10,
  },
  actionButton: {
    marginLeft: 10,
  },
  searchRow: {
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '2px 4px',
    borderRadius: '5px',
  },
  iconButton: {
    marginRight: '-10px',
  },
  searchIcon: {
    color: '#ccc'
  },
  search: {
    flex: 1,
    marginLeft: '8px',
	},
	icon: {
		fontSize: '1.75rem',
	}
};
