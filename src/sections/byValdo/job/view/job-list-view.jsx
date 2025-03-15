
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { countries } from 'src/assets/data';
import
{
       _jobs,
       _roles,
       JOB_SORT_OPTIONS,
       JOB_BENEFIT_OPTIONS,
       JOB_EXPERIENCE_OPTIONS,
       JOB_EMPLOYMENT_TYPE_OPTIONS,
} from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobList from '../job-list';
import JobSort from '../job-sort';
import JobSearch from '../job-search';
import JobFilters from '../job-filters';
import JobFiltersResult from '../job-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
       roles: [],
       locations: [],
       benefits: [],
       experience: 'all',
       employmentTypes: [],
};

// ----------------------------------------------------------------------

export default function JobListView( { dataGet } )
{


       console.log( dataGet );
       const settings = useSettingsContext();

       const openFilters = useBoolean();

       const [ sortBy, setSortBy ] = useState( 'latest' );
       const [ data, setData ] = useState( dataGet );
       const [ selectedJob, setSelectedJob ] = useState( null );
       const [ search, setSearch ] = useState( {
              query: '',
              results: [],
       } );

       const [ filters, setFilters ] = useState( defaultFilters );

       const dataFiltered = applyFilter( {
              inputData: data,
              filters,
              sortBy,
              query: search.query, // <== ajout ici

       } );

       const canReset = !isEqual( defaultFilters, filters );

       const notFound = !dataFiltered.length && canReset;

       const handleFilters = useCallback( ( name, value ) =>
       {
              setFilters( ( prevState ) => ( {
                     ...prevState,
                     [ name ]: value,
              } ) );
       }, [] );

       const handleResetFilters = useCallback( () =>
       {
              setFilters( defaultFilters );
       }, [] );

       const handleSortBy = useCallback( ( newValue ) =>
       {
              setSortBy( newValue );
       }, [] );




       const handleSearch = useCallback(
              ( inputValue ) =>
              {
                     setSearch( ( prevState ) => ( {
                            ...prevState,
                            query: inputValue,
                     } ) );

                     if ( inputValue )
                     {
                            const results = data.filter(
                                   ( job ) =>
                                          job.anonnceName &&
                                          job.anonnceName.toLowerCase().includes( inputValue.toLowerCase() )
                            );

                            setSearch( ( prevState ) => ( {
                                   ...prevState,
                                   results,
                            } ) );
                     } else
                     {
                            setSearch( ( prevState ) => ( {
                                   ...prevState,
                                   results: [],
                            } ) );
                            setSelectedJob( null ); // Réinitialiser la sélection si la recherche est vide
                     }
              },
              [ data ]
       );

       // const handleSearch = useCallback( ( inputValue ) =>
       // {
       //        setSearch( ( prevState ) => ( {
       //               ...prevState,
       //               query: inputValue,
       //        } ) );
       // }, [] );


       const renderFilters = (
              <Stack
                     spacing={ 3 }
                     justifyContent="space-between"
                     alignItems={ { xs: 'flex-end', sm: 'center' } }
                     direction={ { xs: 'column', sm: 'row' } }
              >
                     <JobSearch
                            query={ search.query }
                            results={ search.results }
                            onSearch={ handleSearch }
                            selectedJob={ selectedJob }
                            onSelectJob={ setSelectedJob }

                     // hrefItem={ ( id ) => paths.dashboard.job.details( id ) }
                     />

                     <Stack direction="row" spacing={ 1 } flexShrink={ 0 }>
                            <JobFilters
                                   open={ openFilters.value }
                                   onOpen={ openFilters.onTrue }
                                   onClose={ openFilters.onFalse }
                                   //
                                   filters={ filters }
                                   onFilters={ handleFilters }
                                   //
                                   canReset={ canReset }
                                   onResetFilters={ handleResetFilters }
                                   //
                                   locationOptions={ countries.map( ( option ) => option.label ) }
                                   roleOptions={ _roles }
                                   benefitOptions={ JOB_BENEFIT_OPTIONS.map( ( option ) => option.label ) }
                                   experienceOptions={ [ 'all', ...JOB_EXPERIENCE_OPTIONS.map( ( option ) => option.label ) ] }
                                   employmentTypeOptions={ JOB_EMPLOYMENT_TYPE_OPTIONS.map( ( option ) => option.label ) }
                            />

                            <JobSort sort={ sortBy } onSort={ handleSortBy } sortOptions={ JOB_SORT_OPTIONS } />
                     </Stack>
              </Stack>
       );

       const renderResults = (
              <JobFiltersResult
                     filters={ filters }
                     onResetFilters={ handleResetFilters }
                     //
                     canReset={ canReset }
                     onFilters={ handleFilters }
                     //
                     results={ dataFiltered.length }
              />
       );

       return (
              <Box >


                     <Stack
                            spacing={ 2.5 }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     >
                            { renderFilters }

                            { canReset && renderResults }
                     </Stack>

                     { notFound && <EmptyContent filled title="No Data" sx={ { py: 10 } } /> }

                     <JobList jobs={ dataFiltered } />
              </Box>
       );
}

// ----------------------------------------------------------------------

// const applyFilter = ( { inputData, filters, sortBy } ) =>
// {
//        const { employmentTypes, experience, roles, locations, benefits } = filters;

//        // SORT BY
//        if ( sortBy === 'latest' )
//        {
//               inputData = orderBy( inputData, [ 'createdAt' ], [ 'desc' ] );
//        }

//        if ( sortBy === 'oldest' )
//        {
//               inputData = orderBy( inputData, [ 'createdAt' ], [ 'asc' ] );
//        }

//        if ( sortBy === 'popular' )
//        {
//               inputData = orderBy( inputData, [ 'totalViews' ], [ 'desc' ] );
//        }

//        // FILTERS
//        if ( employmentTypes.length )
//        {
//               inputData = inputData.filter( ( job ) =>
//                      job.employmentTypes.some( ( item ) => employmentTypes.includes( item ) )
//               );
//        }

//        if ( experience !== 'all' )
//        {
//               inputData = inputData.filter( ( job ) => job.experience === experience );
//        }

//        if ( roles.length )
//        {
//               inputData = inputData.filter( ( job ) => roles.includes( job.role ) );
//        }

//        if ( locations.length )
//        {
//               inputData = inputData.filter( ( job ) => job.locations.some( ( item ) => locations.includes( item ) ) );
//        }

//        if ( benefits.length )
//        {
//               inputData = inputData.filter( ( job ) => job.benefits.some( ( item ) => benefits.includes( item ) ) );
//        }

//        return inputData;
// };


const applyFilter = ( { inputData, filters, sortBy, query } ) =>
{
       const { employmentTypes, experience, roles, locations, benefits } = filters;

       // 🔍 Filtrage par texte (recherche)
       if ( query )
       {
              inputData = inputData.filter( ( job ) =>
                     job.anonnceName?.toLowerCase().includes( query.toLowerCase() )
              );
       }

       // Tri
       if ( sortBy === 'latest' )
       {
              inputData = orderBy( inputData, [ 'createdAt' ], [ 'desc' ] );
       }

       if ( sortBy === 'oldest' )
       {
              inputData = orderBy( inputData, [ 'createdAt' ], [ 'asc' ] );
       }

       if ( sortBy === 'popular' )
       {
              inputData = orderBy( inputData, [ 'totalViews' ], [ 'desc' ] );
       }

       // Filtres
       if ( employmentTypes.length )
       {
              inputData = inputData.filter( ( job ) =>
                     job.employmentTypes.some( ( item ) => employmentTypes.includes( item ) )
              );
       }

       if ( experience !== 'all' )
       {
              inputData = inputData.filter( ( job ) => job.experience === experience );
       }

       if ( roles.length )
       {
              inputData = inputData.filter( ( job ) => roles.includes( job.role ) );
       }

       if ( locations.length )
       {
              inputData = inputData.filter( ( job ) =>
                     job.locations.some( ( item ) => locations.includes( item ) )
              );
       }

       if ( benefits.length )
       {
              inputData = inputData.filter( ( job ) =>
                     job.benefits.some( ( item ) => benefits.includes( item ) )
              );
       }

       return inputData;
};



JobListView.propTypes = {

       dataGet: PropTypes.arrayOf( PropTypes.object )

};
