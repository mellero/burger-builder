import React, { Fragment, useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => req, err => {
            setError(err);
            return Promise.reject(err)
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
            return Promise.reject(err)
        });

        useEffect(() => {
            return function cleanup() {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <Fragment>
                <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}



export default withErrorHandler;