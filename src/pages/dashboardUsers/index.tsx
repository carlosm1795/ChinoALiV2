import React from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import ProfileCard from 'src/views/dashboard/ProfileCard'
const index = () => {
  return (
    <ApexChartWrapper>
        <Grid container spacing={6}>
           <Grid item xs={12} md={12}>
          <ProfileCard />
        </Grid>
        </Grid>
        </ApexChartWrapper>
  )
}

export default index