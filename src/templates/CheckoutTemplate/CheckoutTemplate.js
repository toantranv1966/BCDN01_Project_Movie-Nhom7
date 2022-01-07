import { Fragment } from 'react';
import { Redirect, Route } from 'react-router';
import {USER_LOGIN} from '../../util/settings/config';


const CheckoutTemplate = (props) => {
// props, exact, Component
const {Component,...restProps} = props;

if(!localStorage.getItem(USER_LOGIN)){
    return <Redirect to='/login'/>
}

return <Route {...restProps} render={(propsRoute) => {

    // props.location, props.match, props.history
    return <Fragment>
        <Component {...restProps}/>
    </Fragment>

}}/>


}

export default CheckoutTemplate;