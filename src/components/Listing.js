import React, {Component} from 'react';
import  Timer from "react-time-counter"

export default class Listing extends Component{
    
    constructor(props) {
        super(props);
        this.state = { cars:[] };
    }

    currentBid(bid){
        if(!Array.isArray(bid) || !bid.length){
            return 0 ;
        }else{
            let amount = bid[bid.length - 1].amount;
            if(amount){
                return amount;
            }
        }
    }

    formatKm(km){
        let k = km / 1000;
        return k.toFixed(1);
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
                                <img src={car.imageUrl} title={car.make} alt={car.mark}/>
                                <figcaption>ver detalhes</figcaption>
                            </figure>
                            <div className="innerInfo">
                                <ul className="topInfo">
                                    <li><span className="label">tempo restante</span></li>
                                    <li><span className="label">ultima oferta</span></li>
                                    <li>
                                        <time><Timer backward={true} minutes={Math.ceil(car.remainingTime / (1000 * 60))}/></time>
                                    </li>
                                    <li>
                                        
                                        <span className="oferta">
                                            {new Intl.NumberFormat('pt-BR', { 
                                                style: 'currency', 
                                                currency: 'BRL' ,
                                                minimumFractionDigits: 0
                                            }).format(this.currentBid(car.bids))}
                                        </span>
                                    </li>
                                </ul>
                                <div className="carDetails">
                                    <p>{car.make} {car.model} {car.version}</p>
                                </div>
                                <ul className="bottomInfo">
                                    <li>{car.year}</li>
                                    <li>{this.formatKm(car.km)} KM</li>
                                </ul>
                                <div className="buttomInfo">
                                    <button className="button">fazer oferta</button>
                                </div>
                            </div>
                        </div>
                    )
                })
                this.setState({cars: cars});
            })
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