import React, {Component} from 'react';
import Moment from 'react-moment';

export default class Listing extends Component{
    
    constructor(props) {
        super(props);
        this.state = { cars:[] };
    }

    currentBid(bid = 0){
        //console.log(bid.slice(-1)[0].amount);
        

        

        
        // if(bid){
        //     //return bid.slice(-1)[0].amount;
        //     console.log(bid.slice(-1))
        // }else{
        //     return 0;
        // }
        
    }

    componentDidMount(){
        fetch('https://s3-sa-east-1.amazonaws.com/config.instacarro.com/recruitment/auctions.json')
        .then(results => {
                return results.json();
            }).then(data => {

                data.sort((a,b) => a.remainingTime - b.remainingTime);

                let cars = data.map((car, i) => {

                    return(
                        <div className="flexCar" key={car.id} data-order={car.remainingTime}>
                            <figure>
                                <img src={car.imageUrl} title={car.make}/>
                                <figcaption>ver detalhes</figcaption>
                            </figure>
                            <div className="innerInfo">
                                <ul className="topInfo">
                                    <li>
                                        <span className="label">tempo restante</span>
                                        <Moment interval={100} format="HH:mm:ss">{car.remainingTime}</Moment>
                                    </li>
                                    <li>
                                        <span className="label">ultima oferta</span>
                    <span className="oferta">R$ {this.currentBid(car.bids)}</span>
                                    </li>
                                </ul>
                                <div className="carDetails">
                                    <p>{car.make} {car.model} {car.version}</p>
                                </div>
                                <ul className="bottomInfo">
                                    <li>{car.year}</li>
                                    <li>{car.km % 1000} KM</li>
                                </ul>
                                <button className="button">fazer oferta</button>
                            </div>
                        </div>
                    )
                })
                this.setState({cars: cars});
            })
    }

    millisecondsToHours(ms){
        return Math.round((ms / 1000 / 60 / 60) * 100) / 100;
    }

    // countdown() {
    //     this.setState(prevState => ({
    //       time: prevState.time - 1
    //     }));
    // }

    // componentDidMount() {
    //     this.interval = setInterval(() => this.countdown(), 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }


    render(){
        return(
            <section className="wrapper grid-container" id="listing">
                {this.state.cars}
            </section>
        );
    }
}