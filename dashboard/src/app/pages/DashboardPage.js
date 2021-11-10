import React from 'react';
import { Header } from 'app/components/Header';
import { DashboardProfileWidget } from 'app/pages/DashboardProfileWidget';

export const DashboardPage = () => {
  //const classes = useStyles();

  return (
    <div>
      <Header />
      <DashboardProfileWidget />
      
    </div>
  );
};
