import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify';
import MultiFilePreview from './preview-multi-file';
import RejectionFiles from './errors-rejection-files';
import Image from '../image'; // Assurez-vous que ce composant existe
import UploadIllustration from '../../assets/illustrations/upload-illustration';


export default function Upload({
       disabled,
       multiple = false,
       error,
       helperText,
       file,
       onDelete,
       files,
       thumbnail,
       onUpload,
       onRemove,
       onRemoveAll,
       sx,
       ...other
}) {
       const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
              multiple,
              disabled,
              ...other,
       });

       const hasFile = !!file && !multiple;
       const hasFiles = !!files && multiple && !!files.length;
       const hasError = isDragReject || !!error;

       const { isUploading } = useSelector((state) => state.uploadAnnonceImage);

       const [mainFile, setMainFile] = React.useState(null);

       useEffect(() => {
              if (files && files.length > 0) {
                     setMainFile(files[files.length - 1]); // La dernière photo devient la photo principale
              }
       }, [files]);

       const handleThumbnailClick = (clickedFile) => {
              console.log('clickedFile', clickedFile);
              setMainFile(clickedFile);
       };

       const renderMainImage = () => {
              if (!mainFile) {
                     return (
                            <Box sx={{ width: '100%', height: '200px', bgcolor: '#f0f0f0', textAlign: 'center', lineHeight: '200px' }}>
                                   Aucune photo principale
                            </Box>
                     );
              }

              // console.log( 'mainFile', mainFile );

              return (
                     <Image
                            alt={mainFile.name || 'Principale'}
                            src={typeof mainFile === 'string' ? mainFile : mainFile.preview}
                            ratio="1/1"
                            sx={{ borderRadius: 1.5 }}
                     />
              );
       };





       const renderMultiPreview = hasFiles && (
              <>
                     <Box sx={{ my: 3 }}>
                            <MultiFilePreview setCover={handleThumbnailClick} files={files} thumbnail={thumbnail} onRemove={onRemove} />
                     </Box>

                     <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                            {onRemoveAll && (
                                   <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
                                          Supprimer tout
                                   </Button>
                            )}

                            {/* {onUpload && (
                                   <Button
                                          size="small"
                                          variant="contained"
                                          onClick={onUpload}
                                          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                                   >
                                          Telecharger
                                   </Button>
                            )} */}

                            {onUpload && (
                                   <LoadingButton
                                          size="small"
                                          variant="contained"
                                          loading={isUploading}
                                          onClick={onUpload}
                                          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                                   >
                                          Telecharger
                                   </LoadingButton>
                            )}
                     </Stack>
              </>
       );


       const renderPlaceholder = () => (
              <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
                     <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
                     <Stack spacing={1} sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">Drop or Select file</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                   Drop files here or click
                                   <Box
                                          component="span"
                                          sx={{
                                                 mx: 0.5,
                                                 color: 'primary.main',
                                                 textDecoration: 'underline',
                                          }}
                                   >
                                          browse
                                   </Box>
                                   thorough your machine
                            </Typography>
                     </Stack>
              </Stack>
       );

       return (
              <Box sx={{ width: 1, position: 'relative', ...sx }}>
                     <Box
                            {...getRootProps()}
                            sx={{
                                   p: 5,
                                   outline: 'none',
                                   borderRadius: 1,
                                   cursor: 'pointer',
                                   overflow: 'hidden',
                                   position: 'relative',
                                   bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                                   border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
                                   transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                                   '&:hover': {
                                          opacity: 0.72,
                                   },
                                   ...(isDragActive && {
                                          opacity: 0.72,
                                   }),
                                   ...(disabled && {
                                          opacity: 0.48,
                                          pointerEvents: 'none',
                                   }),
                                   ...(hasError && {
                                          color: 'error.main',
                                          borderColor: 'error.main',
                                          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                                   }),
                                   ...(hasFile && {
                                          padding: '24% 0',
                                   }),
                            }}
                     >
                            <input {...getInputProps()} />

                            {hasFiles ? renderMainImage() : renderPlaceholder()}
                     </Box>

                     {helperText && helperText}

                     <RejectionFiles fileRejections={fileRejections} />

                     {renderMultiPreview}
              </Box>
       );
}

Upload.propTypes = {
       disabled: PropTypes.bool,
       error: PropTypes.bool,
       file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
       files: PropTypes.array,
       helperText: PropTypes.node,
       multiple: PropTypes.bool,
       onDelete: PropTypes.func,
       onRemove: PropTypes.func,
       onRemoveAll: PropTypes.func,
       onUpload: PropTypes.func,
       sx: PropTypes.object,
       thumbnail: PropTypes.bool,
};