import React, { Component } from 'react'
import axios from 'axios'
import _groupBy from 'lodash/groupBy'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: center;
  margin: 10px auto;
`
const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px solid #ccc;
`
const User = styled.div`
  text-align: center;
  padding: 5px;
`
const UserImage = styled.img`
  width: 100%;
`
const Header = styled.h2`
  font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
  color: #777;
`
const Name = styled.div`
  font-size: calc(6px + (16 - 6) * ((100vw - 300px) / (1600 - 300)));
  margin-bottom: 10px;
`

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

class App extends Component {
  state = {

  }
  componentDidMount() {
    axios.get('http://uinames.com/api/?ext&amount=25')
      .then(res => res.data)
      .then(data => this.mutateData(data))
  }
  mutateData = (data) => {
    const insertData = data.map(user => {
      const { birthday: { mdy = null } } = user
      return {
        ...user,
        birthdayOfWeek: daysOfWeek[new Date(mdy).getDay()]
      }
    })
    const sortData = _groupBy(insertData, 'birthdayOfWeek')
    this.setState({ ...sortData })
  }
  renderUserInThisDay = (day) => {
    return this.state[day] && this.state[day].map(user => (
      <User key={user.password} >
        <UserImage src={user.photo} />
        <Name>{user.name}</Name>
      </User>
    ))
  }
  renderColumn = () => daysOfWeek.map(day => (
      <Column key={day} >
        <Header>{day}</Header>
        {this.renderUserInThisDay(day)}
      </Column>
    )
  )
  render() {
    console.log(this.state)
    return (
      <Container>
        {this.renderColumn()}
      </Container>
    )
  }
}

export default App
