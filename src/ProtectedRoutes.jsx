import React from "react";
import { ReactDOM } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect

} from "react-router-dom";
const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return loggedIn ? (
                    <Comp {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                prevLocation: path,
                                error: "You need to login first!",
                            },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;