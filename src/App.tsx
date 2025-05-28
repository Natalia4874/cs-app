import styled from 'styled-components'

import TasksList from './components/TasksList'

import './App.css'

import TaskForm from './forms/TaskForm'

function App() {
  return (
    <Container>
      <TaskForm />
      <TasksList />
    </Container>
  )
}

export default App

const Container = styled.div({
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  backgroundColor: '#fff'
})
