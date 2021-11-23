import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '6f79bef438a340d9954d9b8d20ba6854'
});


export class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }
  
  calculateFaceBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imagee');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: width * clarifaiFace.left_col,
      topRow: height * clarifaiFace.top_row,
      rightCol: width - (width * clarifaiFace.right_col),
      bottomRow: height - (height * clarifaiFace.bottom_row)
    }
  }
  displayFacebox = (box) => {
   
    this.setState({ box: box });
  }
  onChangeEvent = (event) => {
    this.setState({ input: event.target.value });
  }
  onButtonChange = () => {
    console.log('click')
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(response => {
       
        if (response) {
          this.displayFacebox(this.calculateFaceBox(response));
          
        }
     
      })
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  

  render() {
    return (
      <div>
        <Navigation onRouteChange={this.onRouteChange} _isSigned={this._isSigned} />
        
        {      
          this.state.route === 'home'
            
            ?
            <div>
                <Logo />
                   <Rank/>
                  <ImageLinkForm
                  onChangeEvent={this.onChangeEvent}
                  onButtonChange={this.onButtonChange}
                  />
                  <FaceRecognition   imgUrl={this.state.imgUrl}
                       
                        box={this.state.box}
                    />
             </div> 
            
            
            : (
              this.state.route === 'signin' ?
                <Signin onRouteChange={this.onRouteChange} />
                :
                <Register onRouteChange={this.onRouteChange }/>
            )
            
        }
             
        </div>
    );
  }

}

export default App;

