import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {fetchUserProfile, submitAddress} from '../../actions';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";



  const mapStateToProps = state => ({
    userAddress: state.userAddress,
    userLat: state.userLat,
    userLng: state.userLng,
    addressSaved: state.addressSaved
  });


const mapDispatchToProps = dispatch => ({
  fetchUserProfile: payload => dispatch(fetchUserProfile(payload)),
  submitAddress: payload => dispatch(submitAddress(payload))
});


export class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
    this.showState = this.showState.bind(this);
    this.onChange = (address) => this.setState({address})
  }

showState() {
  geocodeByAddress(this.state.address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log('Successfully got latitude and longitude', { lat, lng })
      this.setState({lat})
      this.setState({lng})

      let data = {
        address: this.state.address,
        lat: this.state.lat,
        lng: this.state.lng
      }
      console.log('data', data);
      this.props.submitAddress(data);

    })
}

componentDidMount() {
  this.props.fetchUserProfile()
}

// pick off address, lat, lng, then dispatch

  render() {
console.log('state address', this.state);
console.log('prop address', this.props);

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    const myStyles = {
      autocompleteContainer: {
        paddingBottom: '20px',
        backgroundSize: 'auto 12px',
        backgroundPosition: 'bottom left 10px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url('https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png')"
      }
    };

    return (<div>

      <PlacesAutocomplete id='Autocomplete'
      inputProps={inputProps}
      styles={myStyles}
      googleLogo={false}/>

  <button type='button' onClick={this.showState}>  {!this.props.addressSaved && <p>Submit</p>}
    {this.props.addressSaved && <p>Saved</p>}</button>

    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
