import React, { Component } from 'react';
import './App.css';


let validInput=null;
class App extends Component {

  state={
    list:[],
    inputValue:'',
    search:[],
    isLoaded:false,
    items:'',
    map:false,
    url:''
  };

componentDidMount(){
   console.log('component did mount')
fetch('http://api.citybik.es/v2/networks')
  .then(response=>response.json())
  .then(data => this.setState({list:data.networks,isLoaded:true}))
}


handleChange=(e)=> {
  this.setState({inputValue:e.target.value});
}

handleSubmit=(e)=> {
  e.preventDefault();
 //this.setState((state) => ({search:state.inputValue.charAt(0).toUpperCase() + state.inputValue.slice(1), inputValue:''}));
  
 

 this.setState({search:this.state.inputValue.charAt(0).toUpperCase() + this.state.inputValue.slice(1).toLowerCase(), inputValue:''});
 // this.setState({search:this.state.inputValue, inputValue:''});

}

long2tile=(lon,zoom) => {
  return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}

lat2tile=(lat,zoom) => {
  return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
 }

fechMap=(longi,lati)=>{
/* var array = [...this.state.items];
  if(array.length>0){
    array.splice(0,1);
    this.setState({items:array});
  }
*/
  //var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
   var targetUrl = 'https://api.tomtom.com/map/1/tile/basic/main/16/'+ longi+'/'+lati+'.png?tileSize=512&view=Unified&key=faXGbNVlE5zDJbp7rqh136LQNGUw7C3y';

  fetch(targetUrl)
  .then(res=> res.blob())
  //.then(blob => {this.setState({items:URL.createObjectURL(blob)})

  //.then(blob => {let images=URL.createObjectURL(blob);
  //.then(blob => {const images=URL.createObjectURL(blob);
 .then(blob => {this.setState({url:URL.createObjectURL(blob)})

    URL.revokeObjectURL(blob);
 })
 .catch(error => console.log('error is', error));
}

matchLocation=() => {
        if(this.state.search.length >=1){
         
            validInput=0;
            var {url}=this.state;
     return this.state.list.map( (item) =>{

        if(item.location.city.length === this.state.search.length){


          let counter=0;
             for(let i=0; i<item.location.city.length; i++){
                 if(item.location.city[i]===this.state.search[i]){
                     counter++;
                 }

             }

            if(counter===item.location.city.length){
              let longi=this.long2tile(item.location.longitude,16);

              let lati=this.lat2tile(item.location.latitude,16);
                this.fechMap(longi,lati);
                validInput=1;  /* true     */

            return <div> <p>Longitude {item.location.longitude}</p>
                   <p>Latitude {item.location.latitude}</p>
                   <p>X coordinate {longi}</p>
                   <p>Y coordinate {lati}</p>
                  <p><h1>Bike available in {this.state.search}</h1></p>
                  <p><h2>business: {item.name}</h2></p>
                  <p><h2>website: {item.source}</h2></p>

                  <div>  <img src={url} width="500" height="350" /></div>
                   </div>
            }
       }


     })
   }

     }



ifNoMatch(){

  if(validInput===0){

        return   <div>
           <p>No bikes in this city</p>
           </div>
  }

}

render=() => {
    var {isLoaded}=this.state;
     if(!isLoaded) {
       return <div>Loading......</div>;
     }
     else{

  return (
    <div className="App">
      <h2>Bicycle Rentals </h2>
      <h1>In what city?</h1>
      <form onSubmit={(e)=> this.handleSubmit(e)}  >
      <input value={this.state.inputValue} type="text" onChange={(e)=>this.handleChange(e)} />
      <button onClick={this.handleSubmit} className="bigButton"
      disabled={!this.state.inputValue}>{"Add search #"}</button>
      </form>
       {this.matchLocation()}
       {this.ifNoMatch()}
    </div>
  );
 }
}

}

export default App;
