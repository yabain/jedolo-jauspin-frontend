import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { useLocation, useParams } from 'react-router';
import { useAuthContext } from 'src/auth/hooks';

import { paths } from 'src/routes/paths';
import { useGetProfil } from 'src/1VALDO/hook/user/use-get-profile/use-get-profile';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';

// ----------------------------------------------------------------------

const TABS = [
       {
              value: 'profile',
              label: 'Profile',
              icon: <Iconify icon="solar:user-id-bold" width={24} />,
       },
       // {
       //        value: 'followers',
       //        label: 'Followers',
       //        icon: <Iconify icon="solar:heart-bold" width={ 24 } />,
       // },
       // {
       //        value: 'friends',
       //        label: 'Friends',
       //        icon: <Iconify icon="solar:users-group-rounded-bold" width={ 24 } />,
       // },
       // {
       //        value: 'gallery',
       //        label: 'Gallery',
       //        icon: <Iconify icon="solar:gallery-wide-bold" width={ 24 } />,
       // },
];

// ----------------------------------------------------------------------

export default function UserProfileView() {
       const settings = useSettingsContext();

       const { user } = useAuthContext();

       const [searchFriends, setSearchFriends] = useState('');

       const [currentTab, setCurrentTab] = useState('profile');

       const handleChangeTab = useCallback((event, newValue) => {
              setCurrentTab(newValue);
       }, []);

       const handleSearchFriends = useCallback((event) => {
              setSearchFriends(event.target.value);
       }, []);

       const location = useLocation();
       // const { data } = location.state || {};
       // const [data, setData] = useState(undefined)
       const [dataGet, setDataGet] = useState({})

       // console.log(data, 'dataaaaaaaaaaaaaaaaa');




       const handleGetSuccess = useCallback(((data) => {
              // console.log('data recu pour une mise a jour local', data);

              let photoURL;

              if (data !== undefined) {
                     photoURL = data?.photoURL !== '' ? data.photoURL : undefined;
              } else {
                     photoURL = user?.photoURL;
              }
              setDataGet({
                     name: data !== undefined ? data?.displayName || 0 : user?.displayName,
                     photoURL,
                     role: data !== undefined ? data?.role || 0 : user?.role,


                     age: data !== undefined ? data.age || 0 : user.age,
                     prix: data !== undefined ? data.price || 0 : user.price || 0,
                     email: data !== undefined ? data.email || '' : user?.email,
                     city: data !== undefined ? data.city || '' : user.city,
                     localisation: data !== undefined ? data.location || '' : user.location,
                     about: data !== undefined ? data.about : user.about,
                     country: data !== undefined ? data.country : user.coutry,

              })
       }
       ), [user])

       const show = false
       const userId = useParams().id;
       const { isFulled, isError } = useGetProfil(userId, handleGetSuccess)

       return (
              <Container maxWidth={settings.themeStretch ? false : 'xl'}>
                     <CustomBreadcrumbs
                            heading="Profile"
                            links={[
                                   { name: '', href: paths.dashboard.root },
                                   //    { name: 'User', href: paths.dashboard.user?.root },
                                   //    { name: user?.displayName },
                            ]}
                            sx={{
                                   mb: { xs: 3, md: 5 },
                            }}
                     />

                     {isFulled && <Card
                            sx={{
                                   mb: 3,
                                   height: 290,
                            }}
                     >
                            <ProfileCover
                                   role={dataGet.role}
                                   name={dataGet?.name}
                                   avatarUrl={dataGet?.photoURL}
                                   coverUrl={_userAbout.coverUrl}
                            />

                            {/* <Tabs
                                   value={ currentTab }
                                   onChange={ handleChangeTab }
                                   sx={ {
                                          width: 1,
                                          bottom: 0,
                                          zIndex: 9,
                                          position: 'absolute',
                                          bgcolor: 'background.paper',
                                          [ `& .${ tabsClasses.flexContainer }` ]: {
                                                 pr: { md: 3 },
                                                 justifyContent: {
                                                        sm: 'center',
                                                        md: 'flex-end',
                                                 },
                                          },
                                   } }
                            >
                                   { TABS.map( ( tab ) => (
                                          <Tab key={ tab.value } value={ tab.value } icon={ tab.icon } label={ tab.label } />
                                   ) ) }
                            </Tabs> */}
                     </Card>}
                     {/* !isPending && !isError && */}
                     <ProfileHome isFulled={isFulled} dataGet={dataGet} />


                     {/* { currentTab === 'profile' && <ProfileHome info={ _userAbout } posts={ _userFeeds } /> } */}

                     {/* { currentTab === 'followers' && <ProfileFollowers followers={ _userFollowers } /> }

                     { currentTab === 'friends' && (
                            <ProfileFriends
                                   friends={ _userFriends }
                                   searchFriends={ searchFriends }
                                   onSearchFriends={ handleSearchFriends }
                            />
                     ) }

                     { currentTab === 'gallery' && <ProfileGallery gallery={ _userGallery } /> } */}
              </Container>
       );
}
