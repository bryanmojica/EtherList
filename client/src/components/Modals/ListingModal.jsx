import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ViewListing from './ViewListing.jsx';

export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: '',
    }
  }

  expressBuyerInterest() {
    var nonCircularListing = this.props.clickedListing;
    delete nonCircularListing['cluster'];
    var postObj = {
      listing_id: this.props.clickedListing.id, 
      terms: this.state.terms, 
      listing: nonCircularListing,
      buyerId: this.props.userId['id'],
      sellerId: this.props.clickedListing.userId
    };

    fetch('/contracts', {credentials: 'same-origin', method: 'post', 
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
      body: JSON.stringify(postObj)})
    .then((response) => {
      if(response.status !== 200) {
        console.log('err in then');
      } else {
        return response.json()
        .then((jsonResponse) => console.log('successfully posted', jsonResponse))
        .then(this.props.toggleModal)
      }
    }).catch((err) => {
      console.error('err in catch is', err);
    });
  }


  handleTermsChange(e) {
    this.setState({terms: e.target.value});
  }

  render() {
    return (
      <Modal show={this.props.showViewListingModal} onHide={this.props.toggleModal}
        container={this} aria-labelledby="contained-modal-title"
      >
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">View Listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          View listing details:
          <ViewListing handleChange={this.props.handleChange} clickedListing={this.props.clickedListing} handleTermsChange={this.handleTermsChange.bind(this)}/>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-success" onClick={this.expressBuyerInterest.bind(this)}>Contact Seller</Button>
          <Button className="btn btn-danger" onClick={this.props.toggleModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
