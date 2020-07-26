import { TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from 'actions';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  Btn,
  DataWrapper,
  Left,
  LinkStyle,
  Right,
} from 'styles/checkoutStyles';

const CustomerByEmail = ({ email, loading, data, errorMsg, ...props }) => {
  const { changeEmail, customerByEmail, resetData } = props;
  if (loading) return <CircularProgress />;
  if (data.name !== '')
    return (
      <DataWrapper>
        <Typography variant="h4">Welcome back, {data.name}</Typography>
        <Typography variant="body1">ID: {data.id}</Typography>
        <Typography variant="body1">Address: {data.address}</Typography>
        {data.phone ? (
          <Typography variant="body1">Phone Number: {data.phone}</Typography>
        ) : (
          <></>
        )}
        <Typography variant="body1">Email: {email}</Typography>
        <LinkStyle variant="body2" onClick={() => resetData()}>
          No {data.name.split(' ')[0]}? Lookup again
        </LinkStyle>
      </DataWrapper>
    );
  return (
    <>
      <Left />
      <Right>
        <form onSubmit={(e) => customerByEmail(e, email)}>
          <TextField
            fullWidth
            required
            margin="dense"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={changeEmail}
            error={errorMsg !== null}
            helperText={errorMsg ? `Customer not found. ${errorMsg}` : ''}
          />
          <Btn type="submit" variant="outlined">
            Lookup
          </Btn>
        </form>
      </Right>
    </>
  );
};

CustomerByEmail.propTypes = {
  customerByEmail: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    address: PropTypes.string,
    phone: PropTypes.number,
  }),
  errorMsg: PropTypes.string,
};

const mapStateToProps = ({ customer: { data, isLoading, errorMsg } }) => ({
  email: data.email,
  loading: isLoading,
  data,
  errorMsg,
});
export default connect(mapStateToProps, actions)(CustomerByEmail);
