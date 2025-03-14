import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function InvoiceTableRow( {
       row,
       selected,
       onSelectRow,
       onViewRow,
       onEditRow,
       onDeleteRow,
} )
{
       const { sent, invoiceNumber, date, dueDate, statut, anonnceName, montant, transactorEmail, type } = row;

       const confirm = useBoolean();

       const popover = usePopover();

       return (
              <>
                     <TableRow hover selected={ selected }>
                            <TableCell padding="checkbox">
                                   <Checkbox checked={ selected } onClick={ onSelectRow } />
                            </TableCell>

                            <TableCell sx={ { display: 'flex', alignItems: 'center' } }>
                                   <Avatar alt={ transactorEmail } sx={ { mr: 2 } }>
                                          { transactorEmail.charAt( 0 ).toUpperCase() }
                                   </Avatar>

                                   <ListItemText
                                          disableTypography
                                          primary={
                                                 <Typography variant="body2" noWrap>
                                                        { anonnceName }

                                                 </Typography>
                                          }
                                          secondary={
                                                 <Link
                                                        noWrap
                                                        variant="body2"
                                                        onClick={ onViewRow }
                                                        sx={ { color: 'text.disabled', cursor: 'pointer' } }
                                                 >
                                                        { transactorEmail }
                                                 </Link>
                                          }
                                   />
                            </TableCell>

                            <TableCell>
                                   <ListItemText
                                          primary={ fDate( date ) }
                                          secondary={ fTime( date ) }
                                          primaryTypographyProps={ { typography: 'body2', noWrap: true } }
                                          secondaryTypographyProps={ {
                                                 mt: 0.5,
                                                 component: 'span',
                                                 typography: 'caption',
                                          } }
                                   />
                            </TableCell>

                            <TableCell>
                                   <ListItemText
                                          primary={ type }
                                          primaryTypographyProps={ { typography: 'body2', noWrap: true } }
                                          secondaryTypographyProps={ {
                                                 mt: 0.5,
                                                 component: 'span',
                                                 typography: 'caption',
                                          } }
                                   />
                            </TableCell>

                            <TableCell>{ montant } FCFA</TableCell>

                            {/* <TableCell align="center">{ sent }</TableCell> */ }

                            <TableCell>
                                   <Label
                                          variant="soft"
                                          color={
                                                 ( statut === 'paid' && 'success' ) ||
                                                 ( statut === 'pending' && 'warning' ) ||
                                                 ( statut === 'overdue' && 'error' ) ||
                                                 'default'
                                          }
                                   >
                                          { ( statut === 'paid' && 'Payé' ) ||
                                                 ( statut === 'pending' && 'Attente' ) ||
                                                 ( statut === 'overdue' && 'Annulé' ) || '' }
                                   </Label>
                            </TableCell>

                            {/* <TableCell align="right" sx={ { px: 1 } }>
                                   <IconButton color={ popover.open ? 'inherit' : 'default' } onClick={ popover.onOpen }>
                                          <Iconify icon="eva:more-vertical-fill" />
                                   </IconButton>
                            </TableCell> */}
                     </TableRow>

                     <CustomPopover
                            open={ popover.open }
                            onClose={ popover.onClose }
                            arrow="right-top"
                            sx={ { width: 160 } }
                     >
                            <MenuItem
                                   onClick={ () =>
                                   {
                                          onViewRow();
                                          popover.onClose();
                                   } }
                            >
                                   <Iconify icon="solar:eye-bold" />
                                   View
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          onEditRow();
                                          popover.onClose();
                                   } }
                            >
                                   <Iconify icon="solar:pen-bold" />
                                   Edit
                            </MenuItem>

                            <Divider sx={ { borderStyle: 'dashed' } } />

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          confirm.onTrue();
                                          popover.onClose();
                                   } }
                                   sx={ { color: 'error.main' } }
                            >
                                   <Iconify icon="solar:trash-bin-trash-bold" />
                                   Delete
                            </MenuItem>
                     </CustomPopover>

                     <ConfirmDialog
                            open={ confirm.value }
                            onClose={ confirm.onFalse }
                            title="Delete"
                            content="Are you sure want to delete?"
                            action={
                                   <Button variant="contained" color="error" onClick={ onDeleteRow }>
                                          Delete
                                   </Button>
                            }
                     />
              </>
       );
}

InvoiceTableRow.propTypes = {
       onDeleteRow: PropTypes.func,
       onEditRow: PropTypes.func,
       onSelectRow: PropTypes.func,
       onViewRow: PropTypes.func,
       row: PropTypes.object,
       selected: PropTypes.bool,
};
