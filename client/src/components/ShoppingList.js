import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { loadUser } from "../actions/authActions";
import PropTypes from "prop-types";
import store from '../store';

class ShoppingList extends Component {

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getItems();
    this.setState({
      user: store.dispatch(loadUser())
    })
  }
  deleteThis = id => {
    this.props.deleteItem(id);
  };


  render() {
    const { items } = this.props.item;
    const userID = this.props.user;
    
    return (
      <Container>
        {this.props.isAuthenticated && this.props.user ? 
        <ListGroup>
          {items
          .map(({ _id, name, user }) => (
           userID._id === user ? 
            <ListGroupItem key={_id}>
              <Button
              className="remove-btn"
              color="danger"
              size="sm"
              onClick={this.deleteThis.bind(this, _id)}
              >
                &times;
              </Button>
              {name}
            </ListGroupItem>
            
            : null
          ))}
        </ListGroup> : <div>Log in first</div>}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, loadUser })(ShoppingList);
