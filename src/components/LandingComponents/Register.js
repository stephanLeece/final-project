import React from 'react';
import {connect} from 'react-redux';
import {postRegisterForm, propChange} from '../../actions';
import {
  Router,
  Route,
  Link,
  IndexRoute,
  redirect,
  hashHistory,
  browserHistory
} from 'react-router';

const mapStateToProps = state => ({error: state.error});

const mapDispatchToProps = dispatch => ({
  postForm: payload => dispatch(postRegisterForm(payload)),
  propChange: payload => dispatch(propChange(payload))
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {})
  }

  handleSubmit(event) {
    event.preventDefault();
    const {fname, lname, email, pword, usertype} = this.state;
    const data = {
      fname,
      lname,
      email,
      pword,
      usertype
    };
    this.props.postForm(data).then(function() {})
  }

  componentDidMount() {
    let data = {
      name: 'error',
      value: false
    }
    this.props.propChange(data)
  }

  render() {

    return (<div className='main' id='register'>
<h1>First we need a few details.</h1>
      <form className='beaconForm'>
        <label>
          First Name:
          <input onChange={this.handleChange} name="fname" type="text"/>
        </label>
        <label>
          Last Name:
          <input onChange={this.handleChange} name="lname" type="text"/>
        </label>
        <label>
          Email:
          <input onChange={this.handleChange} name="email" type="text"/>
        </label>
        <label>
          Password:
          <input onChange={this.handleChange} name="pword" type="password"/>
        </label>
        <label>
          <input onChange={this.handleChange} type="radio" name="usertype" value="0"/>
          Need volunteers
        </label>
        <label>
          <input onChange={this.handleChange} type="radio" name="usertype" value="1"/>
          Want to volunteer
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
        {this.props.error && <p>{this.props.error}</p>}
      </form>

    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
