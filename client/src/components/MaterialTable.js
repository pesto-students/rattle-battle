import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const MaterialTable = ({ headings, tableData }) => {
  const tableHeadings = headings.map(heading => (
    <TableCell key={heading}>{ heading }</TableCell>
  ));
  return (
    <Table>
      <TableHead>
        <TableRow>
          { tableHeadings }
        </TableRow>
      </TableHead>
      <TableBody>
        { tableData }
      </TableBody>
    </Table>
  );
};

MaterialTable.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MaterialTable;
