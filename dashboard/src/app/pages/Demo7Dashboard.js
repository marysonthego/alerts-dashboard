import React from 'react';
import {
  ListsWidget1,
  ListsWidget3,
  ListsWidget4,
  ListsWidget8,
  ListsWidget9,
  ListsWidget10,
  ListsWidget11,
  ListsWidget14,
  MixedWidget1,
  MixedWidget4,
  MixedWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget12,
  MixedWidget14,
  TilesWidget1,
  TilesWidget3,
  TilesWidget10,
  TilesWidget11,
  TilesWidget12,
  TilesWidget13,
  TilesWidget14,
  AdvanceTablesWidget1,
  AdvanceTablesWidget2,
  AdvanceTablesWidget4,
  AdvanceTablesWidget7,
  AdvanceTablesWidget9,
  StatsWidget10,
  StatsWidget11,
  StatsWidget12,
} from '_metronic/_partials/widgets';

export function Demo7Dashboard() {
  return (
    <>
      {/* begin::Dashboard */}

      <div className="row">
        <div className="col-xl-4">
          <TilesWidget1 className="gutter-b card-stretch" chartColor="danger" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <TilesWidget3 className="gutter-b" widgetHeight="150px" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-9">
          <TilesWidget10 className="gutter-b" widgetHeight="150px" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <TilesWidget11 className="gutter-b" widgetHeight="175px" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <TilesWidget12
            className="gutter-b"
            baseColor="primary"
            widgetHeight="150px"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <TilesWidget13
            className="gutter-b"
            iconColor="success"
            widgetHeight="150px"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <TilesWidget14 className="gutter-b card-stretch" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xxl-8">
          <AdvanceTablesWidget1 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xxl-8">
          <AdvanceTablesWidget2 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xxl-8">
          <AdvanceTablesWidget4 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xxl-8">
          <AdvanceTablesWidget7 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xxl-8">
          <AdvanceTablesWidget9 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MixedWidget1 className="gutter-b card-stretch" chartColor="danger" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <MixedWidget4 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <MixedWidget6 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <MixedWidget10 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <MixedWidget11 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <MixedWidget12 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <MixedWidget14 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <ListsWidget1 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget3 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget4 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget8 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget9 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget10 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget11 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <ListsWidget14 className="card-stretch gutter-b" />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <StatsWidget10
            className="gutter-b"
            symbolShape="circle"
            baseColor="danger"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <StatsWidget11
            className="gutter-b"
            symbolShape="circle"
            baseColor="info"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <StatsWidget12
            className="gutter-b"
            symbolShape="circle"
            baseColor="info"
          />
        </div>
      </div>
    </>
  );
}
