import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function DialogAnnonceBuyCreation({ items, taxes, shipping, discount, subTotal }) {
  // console.log( 'item recu', items );
  const totalAmount = items.reduce((total, item) => total + Number(item.montant), 0);

  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ my: 3, textAlign: 'right', typography: 'body2' }}>
      {/* <Stack direction="row">
                            <Box sx={ { color: 'text.secondary' } }>Subtotal</Box>
                            <Box sx={ { width: 160, typography: 'subtitle2' } }>{ fCurrency( subTotal ) || '-' }</Box>
                     </Stack>

                     <Stack direction="row">
                            <Box sx={ { color: 'text.secondary' } }>Shipping</Box>
                            <Box
                                   sx={ {
                                          width: 160,
                                          ...( shipping && { color: 'error.main' } ),
                                   } }
                            >
                                   { shipping ? `- ${ fCurrency( shipping ) }` : '-' }
                            </Box>
                     </Stack> */}

      {/* <Stack direction="row">
                            <Box sx={ { color: 'text.secondary' } }>Discount</Box>
                            <Box
                                   sx={ {
                                          width: 160,
                                          ...( discount && { color: 'error.main' } ),
                                   } }
                            >
                                   { discount ? `- ${ fCurrency( discount ) }` : '-' }
                            </Box>
                     </Stack> */}

      <Stack direction="row">
        <Box textAlign="start" sx={{ color: 'text.secondary' }}>
          Frais transactions
        </Box>
        <Box sx={{ width: 160 }}> 2%</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1', width: { xs: 1, sm: 'max-content' }, justifyContent: { xs: 'space-between' } }}>
        <Box textAlign="start">Total</Box>
        <Box sx={{ width: 160 }}>{totalAmount + totalAmount * 0.02}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ boxShadow: 'none' }}>
      {/* <CardHeader
                            title="Details"
                            action={
                                   <IconButton>
                                          <Iconify icon="solar:pen-bold" />
                                   </IconButton>
                            }
                     /> */}

      <Stack
        sx={{
          px: 3,
        }}
      >
        {/* <Scrollbar> */}
        {items.map((item) => (
          <Stack
            key={item.id}
            direction={{ xs: 'column', sm: 'row' }} // 👈 responsive direction
            alignItems={{ xs: 'start', sm: 'center' }} // adapte aussi l'alignement
            sx={{
              py: 3,
              minWidth: 1,
              borderBottom: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
            }}
          >
            <Avatar src={item.coverUrl} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />

            <ListItemText
              sx={{ width: '100%' }}
              primary={item.titre}
              primaryTypographyProps={{
                typography: 'h6',
                sx: {
                  mt: { xs: 2, sm: 0.2 },
                  overflow: 'hidden',
                  width: '100%',
                  whiteSpace: 'normal',
                  lineHeight: 1.5,
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  wordBreak: 'break-all',
                  display: '-webkit-box',
                },
              }}
              secondary={
                <Box>
                  {item.validite && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: { xs: 3, sm: 0.2 } }}>
                      {`validité ${item.validite} jour`}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{
                      overflow: 'hidden',
                      mt: 0.5,
                      width: '100%',
                      whiteSpace: 'normal',
                      lineHeight: 1.5,
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-all',
                      display: '-webkit-box',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              }
            />

            {/* <Box sx={ { typography: 'body2' } }>x{ item.quantity }</Box> */}

            <Box sx={{ textAlign: 'right', typography: 'subtitle2', mt: { xs: 2, sm: 0 } }}>{item.montant} FCFA</Box>
          </Stack>
        ))}
        {/* </Scrollbar> */}

        {items.length > 0 && renderTotal}
      </Stack>
    </Card>
  );
}

DialogAnnonceBuyCreation.propTypes = {
  discount: PropTypes.number,
  items: PropTypes.array,
  shipping: PropTypes.number,
  subTotal: PropTypes.number,
  taxes: PropTypes.number,
  // totalAmount: PropTypes.number,
};
