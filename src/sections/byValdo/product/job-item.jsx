import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function JobItem({ job, mettreALaUne, Sponsoriser, onEdit, onDelete, clickFromProfile }) {
  const popover = usePopover();

  const { id, name, company, createdAt, coverUrl, nbrView, rating, salary, nbrComment, sponsored, aLaUne } = job;
  // console.log( job );
  const renderPublish = (row) => {
    let statut;
    if (row.publish === 'published') statut = 'Publié';
    if (row.publish !== 'published') statut = 'banit';
    return (
      <Label variant="soft" color={(row.publish === 'published' && 'info') || 'error'}>
        {statut}
      </Label>
    );
  };

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar alt={coverUrl} src={coverUrl} variant="rounded" sx={{ width: 132, height: 132, mb: 2 }} />

          <ListItemText
            sx={{ mb: 1 }}
            primary={<Link color="inherit">{name}</Link>}
            secondary={`Créer le: ${fDate(createdAt)}`}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Box display="flex" alignItems="center">
            <Box mr={1}>
              <Label color={aLaUne ? 'info' : 'error'}>A la Une : {aLaUne ? 'OUI' : 'NON'}</Label>
            </Box>

            <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: sponsored ? 'primary.main' : 'error.main', typography: 'caption' }}>
              <Iconify width={16} icon="solar:users-group-rounded-bold" />
              {sponsored && `Sponsoriser`}
              {!sponsored && `Non sponsoriser`}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
          {[
            {
              label: renderPublish(job),
              // icon: <Iconify width={ 16 } icon="carbon:skill-level-basic" sx={ { flexShrink: 0 } } />,
            },
            {
              label: `${rating || 0} /5`,
              icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: `${nbrView || 0} Vues`,
              icon: <Iconify width={16} icon="solar:wad-of-money-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: `${nbrComment || 0} commentaires`,
              icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
            },
          ].map((item) => (
            <Stack key={item.label} spacing={0.5} flexShrink={0} direction="row" alignItems="center" sx={{ color: 'text.disabled', minWidth: 0 }}>
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        {clickFromProfile === undefined ? (
          <>
            <MenuItem
              onClick={() => {
                mettreALaUne();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Mettre à la une
            </MenuItem>

            {/*   <MenuItem
                                                        onClick={ () =>
                                                        {
                                                               popover.onClose();
                                                               Sponsoriser();
                                                        } }
                                                 >
                                                        <Iconify icon="solar:pen-bold" />
                                                        Sponsoriser
                                                 </MenuItem> */}

            <MenuItem
              onClick={() => {
                popover.onClose();
                onEdit();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Modifier
            </MenuItem>

            <MenuItem
              onClick={() => {
                popover.onClose();
                onDelete();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Supprimer
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              popover.onClose();
              clickFromProfile();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            Voir
          </MenuItem>
        )}
      </CustomPopover>
    </>
  );
}

JobItem.propTypes = {
  job: PropTypes.object,
  mettreALaUne: PropTypes.func,
  Sponsoriser: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  clickFromProfile: PropTypes.func,
};
