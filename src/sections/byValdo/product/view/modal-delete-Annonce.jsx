
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useNavigate } from 'react-router';
import { resetAfterRequest as resetAfterDelete, request as deleteAnnonces } from 'src/store/annonces/deleteAnnonce/reducer';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProducts } from 'src/api/product';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

export default function DialogDeleteAnnonce({ showDialog, data, handleAfterDelete }) {


       const dispatch = useDispatch()
       const { user } = useAuthContext();
       const { enqueueSnackbar } = useSnackbar();
       const isFulledDelete = useSelector((state) => state.deleteUserAnnonce.isFulled);
       const isPendingDelete = useSelector((state) => state.deleteUserAnnonce.isPending);











       const handleDeleteRow = useCallback(() => {
              dispatch(deleteAnnonces({ _id: data._id }));
       }, [dispatch, data]);












       useEffect(() => {



              if (!isPendingDelete && isFulledDelete && data._id) {


                     dispatch(resetAfterDelete())
                     // console.log( 'un seeeeeuuuuuuuuuukkkkkkk  annonce a supprimer ' );
                     enqueueSnackbar('Annonces supprimées avec succès !');
                     showDialog.onFalse();

              }


       }, [showDialog, enqueueSnackbar, dispatch, isFulledDelete, isPendingDelete, data, handleAfterDelete]);















       useEffect(() => {





              if (!isPendingDelete && isFulledDelete && data._id && handleAfterDelete !== undefined) {


                     console.log('suppression d store appler');
                     handleAfterDelete()


              }

       }, [showDialog, enqueueSnackbar, dispatch, isFulledDelete, isPendingDelete, data, handleAfterDelete]);
























       return (





              <ConfirmDialog
                     open={showDialog.value}
                     onClose={showDialog.onFalse}
                     title="Suppression de l'annonce"
                     content={
                            <>
                                   voulez vous vraiment supprimer cette annonce ?
                            </>
                     }
                     action={

                            <LoadingButton
                                   variant="contained"
                                   color="error"

                                   loading={isPendingDelete}
                                   onClick={() => {

                                          console.log('valeur des etat de suppression ', isPendingDelete, isFulledDelete);

                                          handleDeleteRow();
                                          // confirmOfBan.onFalse();
                                   }}
                            >
                                   supprimer
                            </LoadingButton>
                     }
              />


       );
}

DialogDeleteAnnonce.propTypes = {
       showDialog: PropTypes.shape({
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       }).isRequired,
       data: PropTypes.object,
       handleAfterDelete: PropTypes.func

};
