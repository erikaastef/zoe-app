import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

export default function Home() {
  const [agents, setAgents] = useState([])
  const [agentsCopy, setAgentsCopy] = useState([])
  const [hiddenAgents, setHiddenAgents] = useState([])
  const [index, setIndex] = useState(3)
  const [search, setSearch] = useState('')

  const fetchAgents = async () => {
    try {
      const promise = await axios.get('/api/agents')
      const response = promise.data
      const agents = response.result
      setAgents(agents)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchAgents()
  }, [])

  useEffect(() => {
    console.log(hiddenAgents)
  }, [hiddenAgents])

  const handleChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    if (search.length === 5) {
      let filteredData = agents.filter((agent: any) => agent.income <= (Number(search) + 10000) && agent.income >= (Number(search) - 10000))
      setAgentsCopy(filteredData)
    }
  }
  const handleShowMore = () => {
    setIndex(prev => prev + 3)
  }
  const handleShowLess = () => {
    setIndex(prev => prev - 3)
  }
  const handleClickedAgent = (index: any) => {
    let currentAgents = [...agentsCopy]
    let removedAgent = currentAgents.splice(index, 1)
    setAgentsCopy(currentAgents)
    setHiddenAgents([...hiddenAgents, ...removedAgent])
  }
  return (
    <Container>
      <Input
        type="number"
        value={search}
        onChange={handleChange}
      />
      <Button
        onClick={handleClick}
      >
        Match
      </Button>
      {
        agentsCopy.length ?
          agentsCopy.slice(0, index).map((agent, index) => (
            <div
              key={agent.id}
              onClick={() => handleClickedAgent(index)}
            >
              {agent.name}
            </div>
          )) : ''
      }
      <Button
        onClick={handleShowMore}
      >
        Show more
      </Button>
      <Button
        onClick={handleShowLess}
      >
        Show less
      </Button>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
`
const Input = styled.input`
  border: 1px solid gray;
`
const Button = styled.button`
  border: 1px solid gray;
`
