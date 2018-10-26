import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onFindPetsClick = () => {
    let API;
    if (this.state.filters.type === 'all') {
      API = '/api/pets'
    } else {
      API = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(API).then(r => r.json()).then(pets => this.setState({pets}))
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    const newPets = this.state.pets.map(pet => {
      if(pet.id===id){
        pet.isAdopted = true
        return pet
      }else{
        return pet
      }
    })

    this.setState({
      pets: newPets
    })
  }

  render() {
    return (<div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default App
