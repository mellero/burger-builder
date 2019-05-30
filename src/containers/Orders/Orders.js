import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axiosOrders from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders()
    }
    
    render() {
        let order = this.props.loading ?
            <Spinner />
            : this.props.orders.map(order => 
                <Order 
                    key={order.id}
                    price={order.price.toFixed(2)}
                    ingredients={order.ingredients}
            />)

        return (
            <div>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));