import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/byTemplate/_examples/component-hero';

import IconButtons from './icon-buttons';
import ButtonGroups from './button-groups';
import ToggleButtons from './toggle-buttons';
import ButtonVariants from './button-variants';
import FloatingActionButton from './floating-action-button';

// ----------------------------------------------------------------------

const TABS = [
       {
              value: 'contained',
              label: 'Contained Buttons',
              component: <ButtonVariants variant="contained" />,
       },
       {
              value: 'outlined',
              label: 'Outlined Buttons',
              component: <ButtonVariants variant="outlined" />,
       },
       { value: 'text', label: 'Text Buttons', component: <ButtonVariants /> },
       {
              value: 'soft',
              label: 'Soft Buttons',
              component: <ButtonVariants variant="soft" />,
       },
       { value: 'icon', label: 'Icon Buttons', component: <IconButtons /> },
       {
              value: 'fab',
              label: 'Floating Action Button',
              component: <FloatingActionButton />,
       },
       { value: 'groups', label: 'Button Groups', component: <ButtonGroups /> },
       { value: 'toggle', label: 'Toggle Buttons', component: <ToggleButtons /> },
];

// ----------------------------------------------------------------------

export default function ButtonView()
{
       const [ currentTab, setCurrentTab ] = useState( 'contained' );

       const handleChangeTab = useCallback( ( event, newValue ) =>
       {
              setCurrentTab( newValue );
       }, [] );

       return (
              <>
                     <ComponentHero>
                            <CustomBreadcrumbs
                                   heading="Buttons"
                                   links={ [
                                          {
                                                 name: 'Components',
                                                 href: paths.components,
                                          },
                                          { name: 'Buttons' },
                                   ] }
                                   moreLink={ [
                                          'https://mui.com/components/buttons',
                                          'https://mui.com/components/button-group',
                                          'https://mui.com/components/floating-action-button',
                                          'https://mui.com/components/toggle-button',
                                   ] }
                            />
                     </ComponentHero>

                     <Container sx={ { my: 10 } }>
                            <Tabs value={ currentTab } onChange={ handleChangeTab }>
                                   { TABS.map( ( tab ) => (
                                          <Tab key={ tab.value } value={ tab.value } label={ tab.label } />
                                   ) ) }
                            </Tabs>

                            { TABS.map(
                                   ( tab ) =>
                                          tab.value === currentTab && (
                                                 <Box key={ tab.value } sx={ { mt: 5 } }>
                                                        { tab.component }
                                                 </Box>
                                          )
                            ) }
                     </Container>
              </>
       );
}
