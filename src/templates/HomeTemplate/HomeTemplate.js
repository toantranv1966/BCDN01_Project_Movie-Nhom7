import {Fragment} from 'react';
import { Route } from 'react-router';
import HomeFooter from "../../components/Home/HomeFooter";
import HomeHeader from "../../components/Home/HomeHeader/HomeHeader";

export const HomeTemplate = (props) => {
  // path, exact, Component

  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match

        return (
          <Fragment>
            <HomeHeader />
            <Component {...propsRoute} />
            <HomeFooter />
          </Fragment>
        );
      }}
    />
  );
};
