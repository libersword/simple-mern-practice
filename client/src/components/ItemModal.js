import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { loadUser } from '../actions/authActions';
import store from '../store';

class ItemModal extends Component {
  componentDidMount() {
    this.setState({
      user: store.dispatch(loadUser())
    })
  }
  
  state = {
    modal: false,
    name: ''
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      user: this.props.user._id,
      name: this.state.name
    }

    //Add item via Add Item Action
    this.props.addItem(newItem);

    //close modal
    this.toggle();

  }

  render() {
    return(
      <div>
        { this.props.isAuthenticated ? 
        <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={this.toggle}
        >Add Item</Button>
        : <h4>Please Log In to Manage Items</h4>}
        <Modal
        isOpen = {this.state.modal}
        toggle={this.toggle}
        > 
          <ModalHeader 
          toggle = {this.toggle}
          >Add Item</ModalHeader>
        <ModalBody>
          <Form
          onSubmit={this.onSubmit}
          >
            <FormGroup>
              <Label for="item">
                Item Name
              </Label>
              <Input
              type="text"
              name="name"
              id = "item"
              placeholder = "Add item"
              onChange = {this.onChange}
              />
              <Button 
              color="dark"
              style={{marginTop:'2rem'}}
              block
              >Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);