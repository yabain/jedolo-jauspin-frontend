import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import { Chip } from '@mui/material';

// ----------------------------------------------------------------------

export default function JobSearch( { selectedJob, onSelectJob, query, results, onSearch, hrefItem } )
{
       const router = useRouter();

       const handleClick = ( valueGet ) =>
       {
              onSearch( valueGet ); // Mettre à jour la valeur de l'autocomplétion et déclencher la recherche
       };

       const handleKeyUp = ( event ) =>
       {
              if ( query )
              {
                     if ( event.key === 'Enter' )
                     {
                            const selectProduct = results.filter( ( job ) => job.anonnceName === query )[ 0 ];
                            if ( selectProduct )
                            {
                                   handleClick( selectProduct.anonnceName ); // Mettre à jour la valeur de l'autocomplétion et déclencher la recherche
                            }
                     }
              }
       };

       return (
              <Autocomplete
                     sx={ { width: { xs: 1, sm: 260 } } }
                     value={ selectedJob } // Utiliser la valeur sélectionnée

                     autoHighlight
                     popupIcon={ null }
                     options={ results }
                     onChange={ ( event, value ) =>
                     {
                            if ( value?.anonnceName )
                            {
                                   onSelectJob( value ); // Mettre à jour la valeur sélectionnée dans le parent
                                   onSearch( value.anonnceName ); // Déclencher la recherche
                            } else
                            {
                                   onSelectJob( null ); // Réinitialiser la sélection si l'utilisateur efface la valeur
                                   onSearch( '' ); // Réinitialiser la recherche
                            }
                     } }
                     onInputChange={ ( event, newValue ) => onSearch( newValue ) }
                     getOptionLabel={ ( option ) => option.anonnceName || '' }
                     noOptionsText={ <SearchNotFound query={ query } sx={ { bgcolor: 'unset' } } /> }
                     isOptionEqualToValue={ ( option, value ) => option.id === value.id }
                     renderInput={ ( params ) => (
                            <TextField
                                   { ...params }
                                   placeholder="Search..."
                                   onKeyUp={ handleKeyUp }
                                   InputProps={ {
                                          ...params.InputProps,
                                          startAdornment: (
                                                 <InputAdornment position="start">
                                                        <Iconify icon="eva:search-fill" sx={ { ml: 1, color: 'text.disabled' } } />
                                                 </InputAdornment>
                                          ),
                                   } }
                            />
                     ) }
                     renderTags={ ( selected, getTagProps ) =>
                            selected.map( ( option, index ) => (
                                   <Chip
                                          { ...getTagProps( { index } ) }
                                          key={ option.anonnceName }
                                          label={ option.anonnceName }
                                          size="small"
                                          variant="soft"
                                   />
                            ) )
                     }
                     renderOption={ ( props, job, { inputValue } ) =>
                     {
                            const matches = match( job.anonnceName, inputValue );
                            const parts = parse( job.anonnceName, matches );

                            return (
                                   <Box
                                          component="li"
                                          { ...props }
                                          onClick={ () =>
                                          {
                                                 onSelectJob( job );
                                                 handleClick( job.anonnceName )
                                          } } // Mettre à jour la valeur de l'autocomplétion et déclencher la recherche
                                          key={ job.id }
                                   >
                                          <div>
                                                 { parts.map( ( part, index ) => (
                                                        <Typography
                                                               key={ index }
                                                               component="span"
                                                               color={ part.highlight ? 'primary' : 'textPrimary' }
                                                               sx={ {
                                                                      typography: 'body2',
                                                                      fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                                                               } }
                                                        >
                                                               { part.text }
                                                        </Typography>
                                                 ) ) }
                                          </div>
                                   </Box>
                            );
                     } }
              />
       );
}

JobSearch.propTypes = {
       hrefItem: PropTypes.func,
       onSearch: PropTypes.func,
       query: PropTypes.string,
       results: PropTypes.array,
       selectedJob: PropTypes.object, // Nouvelle propriété
       onSelectJob: PropTypes.func, // Nouvelle propriété

};