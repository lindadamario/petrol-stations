import React, { Component } from 'react'
import _ from 'lodash'
const accessToken = 'e6bdb60d3ec5313a17274fc3db04a4fe3d28b0fbe6b0b8305c2c84785a5ac700';
const spaceId = '52dq79v5sxg3';
import Util from '../common/Util'
import PetrolStationDetails from '../components/PetrolStationDetails'

export default class extends Component {
    state = { 
        city: '',
        cities: [],
        selectedStationId: null,
        selectedStationName: null, 
        selectedStationPrice: null,
        selectedStationDiesel: null,
        selectedStationNinetyFive: null,
    }


    static async getInitialProps({ query, req }) {
        
        const productId = _.get(query, 'id');
        const product = await Util.fetchProduct(productId);

        return {
            product
        };
    }
    
    onInputChange(city) {
        this.setState({ city });
        this.props.onSearchTermChange(city);
    }
    
    showDetails = (
        e, 
        newStationId, 
        newStationName, 
        newStationPrice, 
        newStationDiesel, 
        newStationNinetyFive
    ) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            selectedStationId: newStationId,
            selectedStationName: newStationName,
            selectedStationPrice: newStationPrice,
            selectedStationDiesel: newStationDiesel,
            selectedStationNinetyFive: newStationNinetyFive
            
        })
        console.log(this.state.selectedStationId)
    }

    render() {
        console.log(this.props.product)
        const stations = this.props.product.stations;
        
        return (
            <div>
                <form>
                    <input 
                        value={this.state.city}
                        onChange={event => this.onInputChange(event.target.city)} />
                    <button type='submit'>Search</button>
                </form>
                <div>
                    <p>name: {stations[0].station}</p>
                    <p>fuel: {stations[0].diesel}</p>
                    
                </div>
                <div>
                    <h2>List of the Petrol Stations in Finland</h2>
                    <ul>
                        {stations.map((item, i) =>
                            <li key={item.id}>
                                <a onClick={e => this.showDetails(e, item.id, item.station, item.diesel, item.ninetyFive)}>
                                    {item.station}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <h3>Details: {this.state.selectedStationId}</h3>
                    <p>petrol Station: {this.state.selectedStationName}</p>
                    <p>price for diesel: {this.state.selectedStationDiesel}</p>
                    <p>price for gasoline: {this.state.selectedStationNinetyFive}</p>
                </div>
                <style>
                    {`
                        div {
                            padding: 20px;
                        }
                        input {
                            width: 180px;
                        }
                        input, button {
                            height: 30px;
                            margin-right: 10px;
                        }
                    `}
                </style>
            </div>
        );
    }
}