import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useState } from 'react';
import DialogDisable from 'src/1VALDO/components/user/dialog-disable';
import UserQuickEditForm from './user-quick-edit-form';

export default function UserTableRow( { row, selected, onEditRow, onSelectRow, onDeleteRow, onDisableRow } )
{
       const { name, avatarUrl, company, role, status, email, phoneNumber, isPublic } = row;

       const confirm = useBoolean();
       const quickEdit = useBoolean();
       const popover = usePopover();

       // État local pour le Switch de cette ligne spécifique
       const [ statut, setStatut ] = useState( row.isPublic !== false ); // Initialisé selon isPublic

       // Fonction pour mettre à jour uniquement cette ligne
       const updateStatutForThisRow = () =>
       {
              setStatut( false ); // Désactive uniquement le Switch de cette ligne
       };

       // Gestion du changement du Switch
       const handleSwitchChange = ( event ) =>
       {
              onDisableRow( row.id, row )
              // console.log( 'disable apppplelele' ); 
              // if ( !event.target.checked )
              // {

              //        // Si désactivé, ouvrir le dialogue
              //        showDialog.onTrue();
              // } else
              // {
              //        // Si réactivé (facultatif), fermer le dialogue

              //        showDialog.onFalse();
              // }
       };
       const disableFnc = () => onDisableRow

       return (
              <>

                     <TableRow hover selected={ selected }>
                            <TableCell padding="checkbox">
                                   <Checkbox checked={ selected } onClick={ () => { onDisableRow( row.id ) } } />
                            </TableCell>

                            <TableCell sx={ { display: 'flex', alignItems: 'center' } }>
                                   <Avatar alt={ name } src={ avatarUrl } sx={ { mr: 2 } } />
                                   <ListItemText
                                          primary={ name }
                                          secondary={ email }
                                          primaryTypographyProps={ { typography: 'body2' } }
                                          secondaryTypographyProps={ { component: 'span', color: 'text.disabled' } }
                                   />
                            </TableCell>

                            <TableCell sx={ { whiteSpace: 'nowrap' } }>{ phoneNumber }</TableCell>
                            <TableCell sx={ { whiteSpace: 'nowrap' } }>{ company }</TableCell>
                            <TableCell sx={ { whiteSpace: 'nowrap' } }>{ role }</TableCell>
                            <TableCell>
                                   <Label
                                          variant="soft"
                                          color={
                                                 ( status === 'active' && 'success' ) ||
                                                 ( status === 'pending' && 'warning' ) ||
                                                 ( status === 'banned' && 'error' ) ||
                                                 'default'
                                          }
                                   >
                                          { status }
                                   </Label>
                            </TableCell>

                            <TableCell sx={ { justifyContent: 'center', alignItems: 'center', display: 'flex', px: 1, whiteSpace: 'nowrap' } }>
                                   <FormGroup row>
                                          <FormControlLabel
                                                 control={ <Switch checked={ isPublic !== false } onChange={ handleSwitchChange } /> }
                                          />
                                   </FormGroup>
                                   <IconButton color={ popover.open ? 'inherit' : 'default' } onClick={ popover.onOpen }>
                                          <Iconify icon="eva:more-vertical-fill" />
                                   </IconButton>
                            </TableCell>
                     </TableRow>

                     <UserQuickEditForm currentUser={ row } open={ quickEdit.value } onClose={ quickEdit.onFalse } />

                     <CustomPopover open={ popover.open } onClose={ popover.onClose } arrow="right-top" sx={ { width: 140 } }>
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

UserTableRow.propTypes = {
       onDeleteRow: PropTypes.func,
       onEditRow: PropTypes.func,
       onSelectRow: PropTypes.func,
       onDisableRow: PropTypes.func, // Nouvelle prop pour désactiver
       row: PropTypes.object,
       selected: PropTypes.bool,
};