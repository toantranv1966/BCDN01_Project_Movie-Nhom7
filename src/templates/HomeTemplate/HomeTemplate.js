<<<<<<< HEAD
import {Fragment} from 'react';
import { Route } from 'react-router';
=======
import { Fragment } from "react";
import { Route } from "react-router";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeHeader from "../../components/Home/HomeHeader/HomeHeader";
>>>>>>> minh_duc

export const HomeTemplate = (props) => {
  // path, exact, Component

  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match

<<<<<<< HEAD
        return <Fragment>

            <Component {...propsRoute}/>

        </Fragment>

    }} />
}
=======
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
>>>>>>> minh_duc
