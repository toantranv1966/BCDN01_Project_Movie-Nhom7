import {Fragment} from 'react';
import { Route } from 'react-router';

export const HomeTemplate = (props) => {
    // path, exact, Component

    const {Component,...restProps} = props;

    return <Route {...restProps} render = {(propsRoute) => { 
        //props.location, props.history, props.match

        return <Fragment>

            <Component {...propsRoute}/>

        </Fragment>

    }} />
}