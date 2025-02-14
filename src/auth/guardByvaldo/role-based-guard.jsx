import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function RoleBasedGuard( { hasContent, roles, children, sx } )
{

       const setUser = useSelector( ( state ) => state.setUsers.selectedUser ); // Assure-toi que `selectedUser` est bien défini dans le store

       // console.log( 'setUser', setUser );

       // Logic here to get current user role
       const { user } = useMockedUser();

       // const currentRole = 'user';
       const currentRole = setUser?.role; // admin;

       if ( roles.length === 0 && currentRole === '' ) 
       {

              console.log( 'role get', roles );
              return <> { children } </>;
       }


       if ( typeof roles !== 'undefined' && !roles.includes( currentRole ) )
       {
              return null
       }




       return <> { children } </>;
}

RoleBasedGuard.propTypes = {
       children: PropTypes.node,
       hasContent: PropTypes.bool,
       roles: PropTypes.arrayOf( PropTypes.string ),
       sx: PropTypes.object,
};
