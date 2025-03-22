import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';
import Footer from 'src/layouts/main/footerByValdo';


import Main from '../main';
import Header from './header';
import NavMini from '../nav-mini';
import NavVertical from '../nav-vertical';
import NavHorizontal from '../nav-horizontal';
// ----------------------------------------------------------------------

export default function DashboardLayout( { children, show } )
{
       const settings = useSettingsContext();

       const lgUp = useResponsive( 'up', 'lg' );

       const nav = useBoolean();


       const isHorizontal = settings.themeLayout === 'horizontal';

       const isMini = settings.themeLayout === 'mini';

       const renderNavMini = <NavMini />;

       const renderHorizontal = <NavHorizontal />;

       const renderNavVertical = !show ? null : ( <NavVertical openNav={ nav.value } onCloseNav={ nav.onFalse } /> );


       // console.log( 'valeur du show', show );


       if ( isHorizontal && show )
       {
              return (
                     <>
                            <Header onOpenNav={ nav.onTrue } />

                            { lgUp ? renderHorizontal : renderNavVertical }

                            <Main>{ children }</Main>

                            <Footer />
                     </>
              );
       }

       if ( isMini && show )
       {
              return (
                     <>
                            <Header onOpenNav={ nav.onTrue } />

                            <Box
                                   sx={ {
                                          minHeight: 1,
                                          display: 'flex',
                                          flexDirection: { xs: 'column', lg: 'row' },
                                   } }
                            >
                                   { lgUp ? renderNavMini : renderNavVertical }

                                   <Main>{ children }</Main>

                            </Box>
                            <Footer />
                     </>
              );
       }



       return (
              <>
                     <Box sx={ {
                            scrollbarWidth: 'none', // Firefox
                            '&::-webkit-scrollbar': {
                                   display: 'none', // Chrome, Safari, Edge
                            },
                            overflow: 'hidden'
                     } }>
                            <Header onOpenNav={ nav.onTrue } />

                            <Box
                                   sx={ {
                                          minHeight: 1,
                                          display: 'flex',
                                          flexDirection: { xs: 'column', lg: 'row' },


                                   } }
                            >
                                   { renderNavVertical }

                                   <Main>{ children }</Main>


                            </Box>

                            <Footer />
                     </Box>
              </>
       );
}

DashboardLayout.propTypes = {
       children: PropTypes.node,
       show: PropTypes.bool,
};
