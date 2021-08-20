import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TablePagination from '@material-ui/core/TablePagination';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,

    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    table: {
        minWidth: 10,
    },
    container: {
        maxHeight: 440,
      },
}));

function TableCompenent({ countries }) {
    const classes = useStyles();
  

  
    return (

        

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  
                    <TableBody>
                    {countries.map(({ country, cases, countryInfo }) => (
                        <StyledTableRow >
                            <StyledTableCell >
                                <div className={classes.root}>
                                    <Avatar alt="Remy Sharp" src={countryInfo.flag} />
                                </div>


                            </StyledTableCell>
                            <StyledTableCell align="left">{country}</StyledTableCell>
                            <StyledTableCell align="left">{cases}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
           
        </Paper>





    )
}

export default TableCompenent
