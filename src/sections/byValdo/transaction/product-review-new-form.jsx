import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormHelperText from '@mui/material/FormHelperText';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { request, resetAfterRequest } from 'src/store/comments/add/reducer';
import { User } from '@auth0/auth0-react';
import { useAuthContext } from 'src/auth/hooks';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function ProductReviewNewForm( { annonceId, addData, onClose, ...other } )
{
       const { user } = useAuthContext()

       const location = useLocation();
       const dispatch = useDispatch()
       const productGet = useMemo( () => location.state?.annonce || null, [ location ] );
       const { isPending, isFulled } = useSelector( state => state.addUsersAnnoncesComments )


       const [ dataAdded, setDataAdded ] = useState( {} )

       const ReviewSchema = Yup.object().shape( {
              rating: Yup.number().min( 1, 'Rating must be greater than or equal to 1' ),
              comment: Yup.string().required( 'comment is required' ),
              // name: Yup.string().required( 'Name is required' ),
              // email: Yup.string().required( 'Email is required' ).email( 'Email must be a valid email address' ),
       } );

       const defaultValues = {
              rating: 0,
              comment: '',
              name: '',
              email: '',
       };

       const methods = useForm( {
              resolver: yupResolver( ReviewSchema ),
              defaultValues,
       } );

       const {
              reset,
              control,
              handleSubmit,
              formState: { errors, isSubmitting },
       } = methods;

       const onSubmit = handleSubmit( async ( dataGet ) =>
       {


              // await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );

              const data = {
                     ...dataGet,
                     "id": Date.now(),
                     "commenterId": user._id,
                     "postedAt": Date.now(),
                     "isPurchased": false,
                     "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
              };
              setDataAdded( data )
              dispatch( request( { annonceId: productGet.id, data } ) )

              console.info( 'DATA', data );


       } );

       const onCancel = useCallback( () =>
       {
              onClose();
              reset();
       }, [ onClose, reset ] );





       useEffect( () =>
       {
              if ( isFulled && !isPending )
              {
                     dispatch( resetAfterRequest() )
                     addData( dataAdded )
                     reset();
                     onClose();
              }
       }, [ isPending, isFulled, dataAdded, addData, dispatch, reset, onClose ] )

       return (
              <Dialog onClose={ onClose } { ...other }>
                     <FormProvider methods={ methods } onSubmit={ onSubmit }>
                            <DialogTitle> Add Review </DialogTitle>

                            <DialogContent>
                                   <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={ 1.5 }>
                                          <Typography variant="body2">Your review about this product:</Typography>

                                          <Controller
                                                 name="rating"
                                                 control={ control }
                                                 render={ ( { field } ) => (
                                                        <Rating
                                                               { ...field }
                                                               size="small"
                                                               value={ Number( field.value ) }
                                                               onChange={ ( event, newValue ) =>
                                                               {
                                                                      field.onChange( newValue );
                                                               } }
                                                        />
                                                 ) }
                                          />
                                   </Stack>

                                   { !!errors.rating && <FormHelperText error> { errors.rating?.message }</FormHelperText> }

                                   <RHFTextField name="comment" label="Commantaire *" multiline rows={ 3 } sx={ { mt: 3 } } />

                                   {/* <RHFTextField name="name" label="Name *" sx={ { mt: 3 } } />

                                   <RHFTextField name="email" label="Email *" sx={ { mt: 3 } } /> */}
                            </DialogContent>

                            <DialogActions>
                                   <Button color="inherit" variant="outlined" onClick={ onCancel }>
                                          Cancel
                                   </Button>

                                   <LoadingButton type="submit" variant="contained" loading={ isPending }>
                                          Poster
                                   </LoadingButton>
                            </DialogActions>
                     </FormProvider>
              </Dialog>
       );
}

ProductReviewNewForm.propTypes = {
       onClose: PropTypes.func,
       addData: PropTypes.func,
       annonceId: PropTypes.string
};
