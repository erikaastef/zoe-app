import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Anchor } from '../components/Anchor'
import { Select } from '../components/Select'
import { ErrorMessage } from '../components/ErrorMessage'


import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setAgents, setHiddenAgents, setCurrentIncome } from '../redux/userSlice'
import { currencyFormat, sortAgents } from '../utils'
import { Preloader } from '../components/Preloader'

export default function Agents() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [showInstructions, setShowInstructions] = useState(false)

    const [order, setOrder] = useState('')

    const [agentsCopy, setAgentsCopy] = useState([])
    const [index, setIndex] = useState(3)

    const dispatch = useAppDispatch()
    const currentIncome = useAppSelector<any>((state) => state.user.currentIncome)
    const agents = useAppSelector<any>((state) => state.user.agents)
    const hiddenAgents = useAppSelector<any>((state) => state.user.hiddenAgents)


    const fetchAgents = async () => {
        try {
            const promise = await axios.get('/api/agents')
            const response = promise.data
            const availableAgents = response.result
            const filteredData = availableAgents.filter((agent: any) => agent.income <= (Number(currentIncome) + 10000) && agent.income >= (Number(currentIncome) - 10000))
            dispatch(setAgents(availableAgents))
            setAgentsCopy(filteredData)
            setTimeout(() => setLoading(false), 2000)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (agents.length) {
            let filteredData = agents.filter((agent: any) => agent.income <= (Number(currentIncome) + 10000) && agent.income >= (Number(currentIncome) - 10000))
            if (hiddenAgents.length) {
                let noHiddenAgents = filteredData.filter((agent: any) => !hiddenAgents.some((hiddenAgent: any) => hiddenAgent.id === agent.id))
                setAgentsCopy(noHiddenAgents)
            } else {
                setAgentsCopy(filteredData)
            }
            setTimeout(() => setLoading(false), 2000)
        } else {
            fetchAgents()
        }
    }, [])


    useEffect(() => {
        if (loading) {
            setTimeout(() => setLoading(false), 2000)
        }
    }, [loading])

    const selectOptions = [
        {
            value: 'name',
            label: 'Name (A-Z)',
        },
        {
            value: 'id',
            label: 'ID',
        },
        {
            value: 'lowestIncome',
            label: 'Income: Low first',
        },
        {
            value: 'highestIncome',
            label: 'Income: High first',
        }
    ]

    const handleSelectOnChange = (option: any) => {
        setOrder(option.label)
        let newOrder = sortAgents({ agents: [...agentsCopy], type: option.value })
        setAgentsCopy(newOrder)
    }

    const handleInputChange = (e: any) => {
        let value = e.target.value
        setSearch(value)
        if (value.length < 5) {
            if (!showInstructions) setShowInstructions(true)
        } else {
            setShowInstructions(false)
        }
    }
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && search.length >= 5) {
            handleNewSearch()
        }
    }
    const handleNewSearch = () => {
        setLoading(true)
        let filteredData = agents.filter((agent: any) => agent.income <= (Number(search) + 10000) && agent.income >= (Number(search) - 10000))
        if (hiddenAgents.length) {
            let noHiddenAgents = filteredData.filter((agent: any) => !hiddenAgents.some((hiddenAgent: any) => hiddenAgent.id === agent.id))
            setAgentsCopy(noHiddenAgents)
        } else {
            setAgentsCopy(filteredData)
        }
        dispatch(setCurrentIncome(search))
        setSearch('')
        setOrder('')
        setIndex(3)
        setTimeout(() => setLoading(false), 2000)
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
        dispatch(setHiddenAgents([...hiddenAgents, ...removedAgent]))
        if (!currentAgents.length) setLoading(true)
    }
    const handleHiddenAgentsRedirect = (e: any) => {
        e.preventDefault()
        router.push('/hidden-agents')
    }
    return (
        <>
            <Header />
            <AnimatePresence exitBeforeEnter>
                {
                    loading ?
                        <Container
                            key="noMatch"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Preloader maxWidth={300} />
                        </Container> :
                        <Container
                            key="match"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {agentsCopy.length ? <h1>Your matches</h1> : <h1>No matches</h1>}
                            <h2>Your income: <strong>{currencyFormat(currentIncome)}</strong></h2>
                            <Form>
                                <Input
                                    type="number"
                                    value={search}
                                    icon="dollar"
                                    label="Search new income"
                                    showInstructions={showInstructions}
                                    instructions="Enter an amount of at least 5 digits."
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <Button
                                    className="match-btn"
                                    onClick={handleNewSearch}
                                    disabled={search.length < 5}
                                    icon="leftArrow"
                                >
                                    Get matches
                                </Button>
                            </Form>
                            {
                                agentsCopy.length ?
                                    <>
                                        <Flex>
                                            <Select
                                                value={order}
                                                label="Order agents by"
                                                className="order-select"
                                                options={selectOptions}
                                                onChange={handleSelectOnChange}
                                            />
                                            <Button
                                                onClick={handleHiddenAgentsRedirect}
                                                className="hidden-agents-redirect-btn"
                                                icon="leftArrow"
                                                disabled={!hiddenAgents.length}
                                            >
                                                See hidden agents
                                            </Button>
                                        </Flex>
                                        <Grid>
                                            {agentsCopy.slice(0, index).map((agent: any, index) => (
                                                <Card
                                                    key={agent.id}
                                                    onClick={() => handleClickedAgent(index)}
                                                    agent={agent}
                                                />
                                            ))}
                                        </Grid>
                                        <Controllers>
                                            <Anchor
                                                onClick={handleShowLess}
                                                disabled={index === 3 || agentsCopy.length <= 3}
                                            >
                                                Show less -
                                            </Anchor>
                                            <Anchor
                                                onClick={handleShowMore}
                                                disabled={index >= agentsCopy.length}
                                            >
                                                Show more +
                                            </Anchor>
                                        </Controllers>
                                    </> :
                                    <>
                                        <ErrorMessage message="No available Agents based on your income.<br/> Please try a different income value." />
                                        {
                                            hiddenAgents.length ?
                                                <Button
                                                    onClick={handleHiddenAgentsRedirect}
                                                >
                                                    Check hidden agents
                                                </Button>
                                                : ''

                                        }
                                    </>
                            }
                        </Container>
                }
            </AnimatePresence>

        </>
    )
}

const Container = styled(motion.div)`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:85vw;
    height:100%;
    min-height: calc(100vh - 60px);
    margin:0 auto;
    padding:30px 0px;
    h1{
        text-align:center;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 126%;
        letter-spacing: -0.01em;
        margin-bottom:12px;
    }
    h2{
        text-align:center;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 126%;
        letter-spacing: -0.01em;
        margin-bottom:12px;
    }
`
const Grid = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap:24px;
    width:100%;
    @media(max-width:${({ theme }) => theme.device.md}){
        grid-template-columns: 1fr 1fr;
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        grid-template-columns: 1fr;
    }
`
const Flex = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
    gap:25px;
    width:100%;
    margin-bottom:38px;
    .order-select{
        width:220px;
        @media(max-width:${({ theme }) => theme.device.sm}){
            width:100%;
        }
    }
    .hidden-agents-redirect-btn{
        align-self: flex-end;
    }
`
const Form = styled.div`
    display:flex;
    flex-direction:column;
    gap:5px;
    width:414px;
    margin:0 auto;
    margin-bottom:10px;
    .match-btn{
        align-self:flex-end;
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        width:100%;
        margin-bottom:25px;
    }
`
const Controllers = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:15px;
    margin-top:38px;
    width:100%;
    @media(max-width:${({ theme }) => theme.device.sm}){
        justify-content:space-between;
    }
`
