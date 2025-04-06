import { Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { postRef } from 'src/1data/annonces/ref';
import { globalFilterFnctCall } from 'src/1functions/annonces';
import { useGet } from 'src/1VALDO/hook/city/useGet';
import Label from 'src/components/label'; // adapte le chemin si besoin
import { HEADER } from 'src/layouts/config-layout';

export default function TownTabs({ handleFilterByTownSelected }) {
       const [cityTabs, setCityTabs] = useState([])
       const [currentTab, setCurrentTab] = useState(cityTabs[0]?.ville);
       const handleGet = (dataGet) => { setCityTabs(dataGet) };




       useGet(handleGet)
       useEffect(() => { setCurrentTab(cityTabs[0]?.ville) }, [cityTabs])


















       const search = (selectedCity) => {

              globalFilterFnctCall({ categoriesTab: [], citiesTab: selectedCity, maxPrice: "", minPrice: null, order: '' })
              setTimeout(() => { window.scrollTo({ top: postRef.current.offsetTop - HEADER.H_DESKTOP - 100, behavior: 'smooth', }); }, 700);

       }







       return (
              <Tabs
                     value={currentTab}
                     onChange={(event, newValue) => {
                            const selected = search([newValue]);
                            setCurrentTab(newValue); // ✅ c’est ici qu’on met la valeur retournée
                     }}
                     // scrollButtons // Activer les boutons de défilement
                     // allowScrollButtonsMobile // Forcer l'affichage des boutons de défilement sur les petits écrans
                     variant="scrollable" // Permettre le défilement horizontal
                     sx={{
                            mb: { xs: 3, md: 5 },
                            width: { xs: 1, md: 'max-content' },
                            justifyContent: 'center',
                            '& .MuiTabs-scrollButtons': {
                                   display: 'none', // Masquer les boutons de défilement
                            },

                     }}
              >
                     {cityTabs.map((tab) => (
                            <Tab
                                   key={tab.city}
                                   value={tab.city}
                                   label={tab.city}
                                   iconPosition="end"
                                   icon={
                                          <Label
                                                 variant={tab.city === currentTab ? 'filled' : 'soft'}
                                                 color={tab.city === currentTab ? 'info' : 'default'}
                                          >
                                                 {tab.count}
                                                 {/* { tab === 'Bafoussam' && 55 }
                                                 { tab === 'Douala' && 37 }
                                                 { tab === 'Bertoua' && 20 } */}
                                          </Label>
                                   }
                                   sx={{ textTransform: 'capitalize' }}
                            />
                     ))}
              </Tabs>
       );
}


TownTabs.propTypes = {
       handleFilterByTownSelected: PropTypes.func,
};