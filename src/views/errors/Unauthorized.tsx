import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = makeStyles(() =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
);

export function Unauthorized() {
  const classes = styles();

  return (
    <div className={classes.container}>
      <h1>401! UNAUTHORIZED</h1>
      <Button variant="outlined" color="primary">
        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
          Go Home
        </Link>
      </Button>
    </div>
  );
}
