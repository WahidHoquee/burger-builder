import React, { Component } from "react";

import Aux from "../Auxilary/Auxilary";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount(){
            axios.interceptors.request.use(
                request => {
                    this.setState({error:null})
                    return request;
                }
            )
            axios.interceptors.response.use(
                response => response,
                error => {
                    this.setState({error:error})
                }
            )
        }
        render() {
            return (
                <Aux>
                    <Modal modalVisibility={this.state.error}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
};

export default withErrorHandler;
