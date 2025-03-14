import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect, useCallback } from 'react';
import { resetAfterRequest as resetAfterDelete, request as deleteAnnonces } from 'src/store/annonces/deleteAnnonce/reducer';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function DialogDeleteAnnonces( { showDialog, data = [] } )
{
       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();

       const isFulledDelete = useSelector( ( state ) => state.deleteUserAnnonce.isFulled );
       const isPendingDelete = useSelector( ( state ) => state.deleteUserAnnonce.isPending );

       // Fonction de suppression multiple
       const handleDeleteRows = useCallback( () =>
       {
              data.forEach( ( id ) =>
              {
                     dispatch( deleteAnnonces( { id } ) );
              } );
       }, [ dispatch, data ] );

       useEffect( () =>
       {
              if ( !isPendingDelete && isFulledDelete && data.length !== 0 )
              {
                     dispatch( resetAfterDelete() );
                     // console.log( 'un tableauuuuu   annonce a supprimer ' );
                     enqueueSnackbar( 'Annonces supprimées avec succès !' );
                     showDialog.onFalse();
              }
       }, [ showDialog, enqueueSnackbar, dispatch, isFulledDelete, isPendingDelete, data ] );

       return (
              <ConfirmDialog
                     open={ showDialog.value }
                     onClose={ showDialog.onFalse }
                     title="Suppression des annonces"
                     content={ `Voulez-vous vraiment supprimer ${ data.length } annonces ?` }
                     action={
                            <LoadingButton
                                   variant="contained"
                                   color="error"
                                   loading={ isPendingDelete }
                                   onClick={ () =>
                                   {
                                          console.log( 'Suppression des annonces en cours...' );
                                          handleDeleteRows();
                                   } }
                            >
                                   Supprimer
                            </LoadingButton>
                     }
              />
       );
}

DialogDeleteAnnonces.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,
       data: PropTypes.arrayOf( PropTypes.number ), // Tableau d'IDs des annonces
};
