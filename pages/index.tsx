import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Input } from '../components/Input'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

import { useAppDispatch } from '../redux/hooks'
import { setCurrentIncome } from '../redux/userSlice'

export default function Home() {
  const [search, setSearch] = useState('')
  const [showInstructions, setShowInstructions] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleChange = (e: any) => {
    let value = e.target.value
    setSearch(value)
    if (value.length < 5) {
      if (!showInstructions) setShowInstructions(true)
    } else {
      setShowInstructions(false)
    }
  }
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && search.length) {
      handleClick(e)
    }
  }
  const handleClick = (e: any) => {
    e.preventDefault()
    dispatch(setCurrentIncome(search))
    router.push('/agents')
  }
  return (
    <>
      <Header />
      <Container>
        <Icon src="/icons/team-icon.svg" alt="" />
        <h1>Find the best agent for you!</h1>
        <h2>Fill the information below to get your matches.</h2>
        <Form>
          <Input
            type="number"
            value={search}
            icon="dollar"
            label="Current income"
            showInstructions={showInstructions}
            instructions="Enter an amount of at least 5 digits."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="match-btn"
            onClick={handleClick}
            disabled={search.length < 5}
            icon="leftArrow"
          >
            Get matches
          </Button>
        </Form>
      </Container>

    </>
  )
}

const Icon = styled.img`
    width:90px;
    height:60px;
    margin-bottom: 24px;
`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:414px;
    height:100%;
    min-height: calc(100vh - 60px);
    margin:0 auto;
    h1{
        text-align:center;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 126%;
        letter-spacing: -0.01em;
        margin-bottom:16px;
    }
    h2{
        text-align:center;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 126%;
        letter-spacing: -0.01em;
        margin-bottom:56px;
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        width:85vw;
        padding:30px 0px;
    }
`
const Form = styled.form`
    display:flex;
    flex-direction:column;
    gap:40px;
    width:80%;
    margin:0 auto;
    .match-btn{
        align-self:flex-end;
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        width:100%;
        margin:0px;
    }
`

