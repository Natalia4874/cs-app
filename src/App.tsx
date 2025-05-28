import styled from 'styled-components'

import TasksList from './components/TasksList'

import './App.css'

function App() {
  return (
    <Container>
      <TasksList />
    </Container>
  )
}

export default App

const Container = styled.div({})
