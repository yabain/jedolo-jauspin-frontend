import { Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Label from 'src/components/label'; // adapte le chemin si besoin

export default function TownTabs( { handleFilterByTownSelected } )
{
       const [ currentTab, setCurrentTab ] = useState( 'Yaounde' );

       return (
              <Tabs
                     value={ currentTab }
                     onChange={ ( event, newValue ) =>
                     {
                            const selected = handleFilterByTownSelected?.( event, newValue );
                            setCurrentTab( selected ); // ✅ c’est ici qu’on met la valeur retournée
                     } }
                     // scrollButtons // Activer les boutons de défilement
                     // allowScrollButtonsMobile // Forcer l'affichage des boutons de défilement sur les petits écrans
                     variant="scrollable" // Permettre le défilement horizontal
                     sx={ {
                            mb: { xs: 3, md: 5 },
                            width: { xs: 1, md: 'max-content' },
                            justifyContent: 'center',
                            '& .MuiTabs-scrollButtons': {
                                   display: 'none', // Masquer les boutons de défilement
                            },

                     } }
              >
                     { [ 'Yaounde', 'Bafoussam', 'Douala', 'Bertoua' ].map( ( tab ) => (
                            <Tab
                                   key={ tab }
                                   value={ tab }
                                   label={ tab }
                                   iconPosition="end"
                                   icon={
                                          <Label
                                                 variant={ tab === currentTab ? 'filled' : 'soft' }
                                                 color={ tab === 'Yaounde' ? 'info' : 'default' }
                                          >
                                                 { tab === 'Yaounde' && 100 }
                                                 { tab === 'Bafoussam' && 55 }
                                                 { tab === 'Douala' && 37 }
                                                 { tab === 'Bertoua' && 20 }
                                          </Label>
                                   }
                                   sx={ { textTransform: 'capitalize' } }
                            />
                     ) ) }
              </Tabs>
       );
}

TownTabs.propTypes = {
       handleFilterByTownSelected: PropTypes.func,
};