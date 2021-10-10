import React from 'react';
import Axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { URL_API } from '../helper';


class Prescription extends React.Component {
    render() {
        
        return (
            <div style={{ backgroundColor: '#F8F9FA' }}>
                <div className="jumbotron mb-2 row" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-6">
                        <div style={{ width: '90%' }} className="m-auto">
                            <h1 className="display-4">Your Prescription</h1>
                            <p className="lead" style={{fontSize:"30px"}}>Upload this prescription and wait for our admin to prepare your order</p>
                           
                        </div>
                    </div>
                    <di className="col-md-3">
                        <img id="imgpreview" width="100%" />
                    </di>
                    <div className="col-md-3 p-4 bg-dark text-white text-left" style={{borderRadius: "30px"}}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp"  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="textarea" className="form-control" id="description" aria-describedby="emailHelp" style={{height: "300px"}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Image</label>
                                <input type="file" className="form-control" id="img" aria-describedby="emailHelp" onChange={this.onBtAddFile} />
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary float-right" >Add Data</button>
                    </div>
                </div>
                <div className="row container m-auto">
                    
                </div>
            </div>
        );
    }

}

export default Prescription;