import React from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import ProfileCard from 'src/views/dashboard/ProfileCard'
import CardInsertions from 'src/views/cards/CardInsertions'
import Graphs from 'src/views/dashboard/Graphs'

const index = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} md={12}>
          <Graphs/>
        </Grid>
        <Grid item xs={12} md={12}>
          <CardInsertions/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default index
