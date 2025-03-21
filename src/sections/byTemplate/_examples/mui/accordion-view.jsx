import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { paths } from 'src/routes/paths';

import { _mock } from 'src/_mock';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/byTemplate/_examples/component-hero';

import ComponentBlock from '../component-block';

// ----------------------------------------------------------------------

const _accordions = [ ...Array( 4 ) ].map( ( _, index ) => ( {
       id: _mock.id( index ),
       value: `panel${ index + 1 }`,
       heading: `Accordion ${ index + 1 }`,
       subHeading: _mock.postTitle( index ),
       detail: _mock.description( index ),
} ) );

// ----------------------------------------------------------------------

export default function AccordionView()
{
       const [ controlled, setControlled ] = useState( false );

       const handleChangeControlled = ( panel ) => ( event, isExpanded ) =>
       {
              setControlled( isExpanded ? panel : false );
       };

       return (
              <>
                     <ComponentHero>
                            <CustomBreadcrumbs
                                   heading="Accordion"
                                   links={ [
                                          {
                                                 name: 'Components',
                                                 href: paths.components,
                                          },
                                          { name: 'Accordion' },
                                   ] }
                                   moreLink={ [ 'https://mui.com/components/accordion' ] }
                            />
                     </ComponentHero>

                     <Container sx={ { my: 10 } }>
                            <Stack spacing={ 5 }>
                                   <ComponentBlock title="Simple" spacing={ 0 }>
                                          { _accordions.map( ( accordion, index ) => (
                                                 <Accordion key={ accordion.value } disabled={ index === 3 }>
                                                        <AccordionSummary expandIcon={ <Iconify icon="eva:arrow-ios-downward-fill" /> }>
                                                               <Typography variant="subtitle1">{ accordion.heading }</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                               <Typography>{ accordion.detail }</Typography>
                                                        </AccordionDetails>
                                                 </Accordion>
                                          ) ) }
                                   </ComponentBlock>

                                   <ComponentBlock title="Controlled" spacing={ 0 }>
                                          { _accordions.map( ( item, index ) => (
                                                 <Accordion
                                                        key={ item.value }
                                                        disabled={ index === 3 }
                                                        expanded={ controlled === item.value }
                                                        onChange={ handleChangeControlled( item.value ) }
                                                 >
                                                        <AccordionSummary expandIcon={ <Iconify icon="eva:arrow-ios-downward-fill" /> }>
                                                               <Typography variant="subtitle1" sx={ { width: '33%', flexShrink: 0 } }>
                                                                      { item.heading }
                                                               </Typography>
                                                               <Typography sx={ { color: 'text.secondary' } }>{ item.subHeading }</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                               <Typography>{ item.detail }</Typography>
                                                        </AccordionDetails>
                                                 </Accordion>
                                          ) ) }
                                   </ComponentBlock>
                            </Stack>
                     </Container>
              </>
       );
}
