import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import JobItem from './job-item';

// ----------------------------------------------------------------------

export default function JobList({ jobs }) {
       const router = useRouter();
       const [page, setPage] = useState(1);
       const [hasPageChanged, setHasPageChanged] = useState(false);
       const jobsPerPage = 12;

       // Calcul du nombre total de pages
       const totalPages = Math.ceil(jobs.length / jobsPerPage);

       // Déterminer les jobs à afficher pour la page actuelle
       const indexOfLastJob = page * jobsPerPage;
       const indexOfFirstJob = indexOfLastJob - jobsPerPage;
       const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

       const handleChangePage = (event, value) => {
              setPage(value);
              setHasPageChanged(true);
       };

       // Réinitialiser le défilement à chaque changement de page si l'utilisateur a cliqué
       useEffect(() => {
              if (hasPageChanged) {
                     window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                     });
                     setHasPageChanged(false);
              }
       }, [page, hasPageChanged]);

       const handleView = useCallback(
              (id) => {
                     router.push(paths.dashboard.job.details(id));
              },
              [router]
       );

       const handleEdit = useCallback(
              (id) => {
                     router.push(paths.dashboard.job.edit(id));
              },
              [router]
       );

       const handleDelete = useCallback((id) => {
              console.info('DELETE', id);
       }, []);

       return (
              <>
                     <Box
                            gap={3}
                            display="grid"
                            gridTemplateColumns={{
                                   xs: 'repeat(1, 1fr)',
                                   sm: 'repeat(3, 1fr)',
                                   md: 'repeat(4, 1fr)',
                            }}
                     >
                            {currentJobs.map((job) => (
                                   <JobItem
                                          key={job._id}
                                          job={job}
                                          onView={() => handleView(job._id)}
                                          onEdit={() => handleEdit(job._id)}
                                          onDelete={() => handleDelete(job._id)}
                                   />
                            ))}
                     </Box>

                     {totalPages > 1 && (
                            <Pagination
                                   count={totalPages}
                                   page={page}
                                   onChange={handleChangePage}
                                   sx={{
                                          mt: 8,
                                          [`& .${paginationClasses.ul}`]: {
                                                 justifyContent: 'center',
                                          },
                                   }}
                            />
                     )}
              </>
       );
}

JobList.propTypes = {
       jobs: PropTypes.array,
};
