import React from 'react';
import clsx from 'clsx';
import { Card } from 'react-bootstrap';
import { ListLocations } from 'app/pages/ListLocations';
import { AddLocationForm } from 'app/pages/AddLocationForm';
import { useSelector } from 'react-redux';
import { selectUserCustid } from 'app/redux/userSlice';
import {
  Box,
  makeStyles,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faWind,
  faShieldVirus,
  faCloudSunRain,
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginBottom: '2em',
    flexDirection: 'column',
    justifyContent: 'flexStart',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: '1',

    '@media (max-width: 390px)': {
      flexDirection: 'column',
      justifyContent: 'flexStart',
    },
  },
  card: {
    padding: 1,
    color: '#000000',
    flexShrink: '1',
    backgroundColor: 'white',
    width: '30%',
    '@media (max-width: 390px)': {
      width: '100%',
      margin: '1vw',
    },
  },
  text: {
    marginLeft: '1vw',
    marginRight: '1vw',
  },
  textfield: {
    marginRight: '1rem',
  },
}));

export const LocationsStep = ({
  step
}) => {
  const custid = useSelector(selectUserCustid);
  const classes = useStyles();
  console.log(`LocationsStep custid: `, custid);
  const weatherIcon = (
    <FontAwesomeIcon icon={ faCloudSunRain } size="3x" color="#2cb7e3" />
  );
  const virusIcon = (
    <FontAwesomeIcon icon={ faShieldVirus } size="3x" color="#ffb017" />
  );
  const airIcon = <FontAwesomeIcon icon={ faWind } size="3x" color="#2cb7e3" />;

  const cards = [
    {
      name: 'weatheralert',
      title: 'Weather Alerts',
      icon: weatherIcon,
      blurb:
        'Up to date severe weather alerts from the National Weather Service for the locations you select.',
    },
    {
      name: 'virusalert',
      title: 'Covid Alerts',
      icon: virusIcon,
      blurb:
        'Up to date health and Coronavirus alerts sent to you when updated by the Center for Disease Control.',
    },
    {
      name: 'airalert',
      title: 'Air Quality Alerts',
      icon: airIcon,
      blurb:
        'Poor air quality can reduce life expectancy by an average of 2 years. Change that for yourself, your loved ones, and your community.',
    },
  ];

  const LocationsHeader = () => {
    return (
      <div className="classes.page">
        <div key="lhdiv01" className={ `card card-custom` }>
          {/* begin::Header */ }
          <div
            className="card-header border-0 py-5"
            style={ { justifyContent: 'center' } }
            key="lhdiv01">
            <h3 className="card-title align-items-start flex-column" key="h301">
              <span
                className="card-label font-weight-bolder text-dark"
                key="hsp01">
                Alert locations
              </span>
              <span
                className="text-muted mt-3 font-weight-bold font-size-sm "
                key="hsp02">
                You can add as many locations to monitor as you want. Enter a city and
                state and we'll find the zip code. From here, you can also switch alerts on and off
                for each location. Note that turning off locations for your
                account will not turn them off for any friends & family you've
                added. Friends & family should create their own account to control
                their alerts.
              </span>
            </h3>
          </div>
        </div>
      </div>
    );
  }; // LocationsHeader
  console.log(`LocationsStep custid: `, custid);
  return (
    <Box p={ 2 }>
      {/* begin::Head */ }
      <Box className="head">
        <div className="text-center mt-10">
          <p className="text-muted font-weight-bold">
            You can choose the alerts you'd like to receive for each location
          </p>
        </div>
      </Box>
      {/* begin::Content */ }
      <Box className={ classes.row }>
        { cards.map((el, index) => (
          <Card className={ clsx(classes.card) } key={ index }>
            <div className={ classes.head }>
              <Card.Title style={ { fontSize: '32' } }>
                { el.icon }&nbsp;&nbsp;{ el.title }
              </Card.Title>
            </div>
            { step === 1 ? (
              <Card.Text className="text-muted mt-3 font-weight-bold font-size-sm ">
                { el.blurb }
              </Card.Text>
            ) : null }
          </Card>
        )) }
      </Box>
      <LocationsHeader />
      <AddLocationForm />
      <ListLocations />
    </Box>

  );
};
