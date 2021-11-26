import React from 'react';
import { Header } from 'app/components/Header';
import { DashboardProfileWidget } from 'app/pages/DashboardProfileWidget';

export const DashboardPage = () => {

  return (
    <div>
      <Header />
      <DashboardProfileWidget />
    </div>
  );
};
