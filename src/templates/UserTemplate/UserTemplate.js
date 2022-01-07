import { Fragment } from 'react';
import { Route } from 'react-router';

export const UserTemplate = (props) => {
    // Path, exact, Component

    const {Component, ...restProps} = props;


    return (
            <Route {...restProps} render={(propsRoute)=>{
                // props.location, props.match, props.history

                return <Fragment>
                    <div className="lg:flex">
                      <Component {...propsRoute}/>
                    </div>
                      </Fragment>
            }} />
    )
}
