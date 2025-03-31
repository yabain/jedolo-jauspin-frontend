import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import { fCurrency } from 'src/utils/format-number';
import { fTime, fDate } from 'src/utils/format-time';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import JobItem from './job-item';

// ----------------------------------------------------------------------

export function RenderCellPrice( { params } )
{
       return <>  <Label variant="soft" color='success' >
              { params.row.rating || 0 }  /5
       </Label></>;
}




export function RenderCellSponsored( { params } )
{

       return (
              <Label variant="soft" color={ params.row.sponsored && params.row.sponsored !== "" ? "info" : "error" }>
                     { params.row.sponsored && params.row.sponsored !== "" ? params.row.sponsored : "Non sponsorisé" }
              </Label>
       );
}




export function RenderCellALaUne( { params } )
{
       return <>  <Label variant="soft" color={ ( params.row.aLaUne ? 'success' : 'error' ) } >
              { params.row.aLaUne ? 'oui' : 'non' }
       </Label></>;
}

RenderCellPrice.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};

export function RenderCellPublish( { params } )
{
       let statut
       if ( params.row.publish === 'published' ) statut = 'Publié'
       if ( params.row.publish !== 'published' ) statut = 'banit'
       return (
              <Label variant="soft" color={ ( params.row.publish === 'published' && 'info' ) || 'error' }>
                     { statut }
              </Label>
       );
}

RenderCellPublish.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};

export function RenderCellCreatedAt( { params } )
{
       return (
              <ListItemText
                     primary={ fDate( params.row.createdAt ) }
                     secondary={ fTime( params.row.createdAt ) }
                     primaryTypographyProps={ { typography: 'body2', noWrap: true } }
                     secondaryTypographyProps={ {
                            mt: 0.5,
                            component: 'span',
                            typography: 'caption',
                     } }
              />
       );
}

export function RenderCellNbrComment( { params } )
{
       return (
              <Label variant="soft" color='success' >
                     { params.row.nbrComment || 0 } commentaires
              </Label>
       );
}

RenderCellCreatedAt.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};

export function RenderCellStock( { params } )
{
       return (
              <Label variant="soft" color='success' >
                     { params.row.nbrView || 0 } vues
              </Label>
       );
}

RenderCellStock.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};

export function RenderCellProductXs( { params, mettreALaUne, Sponsoriser, onEdit, onDelete, clickFromProfile } )
{
       return (
              <Stack sx={ { py: 2, width: 1 } }>

                     <JobItem clickFromProfile={ clickFromProfile } job={ params.row } Sponsoriser={ Sponsoriser } mettreALaUne={ mettreALaUne } onEdit={ onEdit } onDelete={ onDelete } />


              </Stack>
       );
}

export function RenderCellProduct( { params } )
{
       console.log( params.row.coverUrl );

       return (
              <Stack direction="row" alignItems="center" sx={ { py: 2, width: 1 } } >

                     <Avatar
                            alt={ params.row.name }
                            src={ params.row.coverUrl }
                            variant="rounded"
                            sx={ { width: 64, height: 64, mr: 2 } }
                     />

                     <ListItemText
                            disableTypography
                            primary={
                                   <Link
                                          noWrap
                                          color="inherit"
                                          variant="subtitle2"
                                          onClick={ params.row.onViewRow }
                                          sx={ { cursor: 'pointer' } }
                                   >
                                          { params.row.name }
                                   </Link>
                            }
                            secondary={
                                   // <Box component="div" sx={ { typography: 'body2', color: 'text.disabled' } }>
                                   //        { params.row.category }
                                   // </Box>
                                   RenderCellCreatedAt( { params } )
                            }
                            sx={ { display: 'flex', flexDirection: 'column' } }
                     />
              </Stack>


       );
}

RenderCellALaUne.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};
RenderCellSponsored.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};

RenderCellNbrComment.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};
RenderCellProduct.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),
};

RenderCellProductXs.propTypes = {
       params: PropTypes.shape( {
              row: PropTypes.object,
       } ),

       mettreALaUne: PropTypes.func,
       Sponsoriser: PropTypes.func,
       onDelete: PropTypes.func,
       onEdit: PropTypes.func,
       clickFromProfile: PropTypes.func
};
