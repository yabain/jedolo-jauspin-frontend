import { useState, useCallback } from 'react';

import Masonry from '@mui/lab/Masonry';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/byTemplate/_examples/component-hero';

import ComponentBlock from '../component-block';

// ----------------------------------------------------------------------

const COLORS = [ 'standard', 'primary', 'secondary', 'info', 'success', 'warning', 'error' ];

const SIZES = [ 'small', 'medium', 'large' ];

// ----------------------------------------------------------------------

export default function PaginationView()
{
       const [ page, setPage ] = useState( 2 );

       const [ rowsPerPage, setRowsPerPage ] = useState( 10 );

       const handleChangePage = useCallback( ( event, newPage ) =>
       {
              setPage( newPage );
       }, [] );

       const handleChangeRowsPerPage = useCallback( ( event ) =>
       {
              setRowsPerPage( parseInt( event.target.value, 10 ) );
              setPage( 0 );
       }, [] );

       return (
              <>
                     <ComponentHero>
                            <CustomBreadcrumbs
                                   heading="Pagination"
                                   links={ [
                                          {
                                                 name: 'Components',
                                                 href: paths.components,
                                          },
                                          { name: 'Pagination' },
                                   ] }
                                   moreLink={ [ 'https://mui.com/components/pagination' ] }
                            />
                     </ComponentHero>

                     <Container sx={ { my: 10 } }>
                            <Masonry columns={ { xs: 1, md: 2 } } spacing={ 3 }>
                                   <ComponentBlock title="Circular">
                                          <Pagination shape="circular" count={ 10 } variant="text" />
                                          <Pagination shape="circular" count={ 10 } variant="text" disabled />
                                          <Pagination shape="circular" count={ 10 } variant="outlined" />
                                          <Pagination shape="circular" count={ 10 } variant="outlined" disabled />
                                          <Pagination shape="circular" count={ 10 } variant="soft" />
                                          <Pagination shape="circular" count={ 10 } variant="soft" disabled />
                                   </ComponentBlock>

                                   <ComponentBlock title="Rounded">
                                          <Pagination shape="rounded" count={ 10 } variant="text" />
                                          <Pagination shape="rounded" count={ 10 } variant="text" disabled />
                                          <Pagination shape="rounded" count={ 10 } variant="outlined" />
                                          <Pagination shape="rounded" count={ 10 } variant="outlined" disabled />
                                          <Pagination shape="rounded" count={ 10 } variant="soft" />
                                          <Pagination shape="rounded" count={ 10 } variant="soft" disabled />
                                   </ComponentBlock>

                                   <ComponentBlock title="Colors">
                                          { COLORS.map( ( color ) => (
                                                 <Pagination key={ color } color={ color } count={ 10 } variant="text" />
                                          ) ) }

                                          { COLORS.map( ( color ) => (
                                                 <Pagination key={ color } color={ color } count={ 10 } variant="outlined" />
                                          ) ) }

                                          { COLORS.map( ( color ) => (
                                                 <Pagination key={ color } color={ color } count={ 10 } variant="soft" />
                                          ) ) }
                                   </ComponentBlock>

                                   <ComponentBlock title="Sizes">
                                          { SIZES.map( ( size ) => (
                                                 <Pagination count={ 10 } key={ size } size={ size } />
                                          ) ) }
                                   </ComponentBlock>

                                   <ComponentBlock title="Buttons">
                                          <Pagination count={ 10 } showFirstButton showLastButton />
                                          <Pagination count={ 10 } hidePrevButton hideNextButton />
                                   </ComponentBlock>

                                   <ComponentBlock title="Ranges">
                                          <Pagination count={ 11 } defaultPage={ 6 } siblingCount={ 0 } />
                                          <Pagination count={ 11 } defaultPage={ 6 } />
                                          <Pagination count={ 11 } defaultPage={ 6 } siblingCount={ 0 } boundaryCount={ 2 } />
                                          <Pagination count={ 11 } defaultPage={ 6 } boundaryCount={ 2 } />
                                   </ComponentBlock>

                                   <ComponentBlock title="Table">
                                          <TablePagination
                                                 component="div"
                                                 count={ 100 }
                                                 page={ page }
                                                 onPageChange={ handleChangePage }
                                                 rowsPerPage={ rowsPerPage }
                                                 onRowsPerPageChange={ handleChangeRowsPerPage }
                                          />
                                   </ComponentBlock>
                            </Masonry>
                     </Container>
              </>
       );
}
