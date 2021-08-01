import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Anchor } from '../components/Anchor'
import { Select } from '../components/Select'
import { ErrorMessage } from '../components/ErrorMessage'


import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setHiddenAgents } from '../redux/userSlice'
import { sortAgents } from '../utils'
import { Preloader } from '../components/Preloader'

export default function HiddenAgents() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const [order, setOrder] = useState('')

    const [retrievedAgents, setRetrievedAgents] = useState([])

    const [agentsCopy, setAgentsCopy] = useState([])
    const [index, setIndex] = useState(3)

    const dispatch = useAppDispatch()
    const hiddenAgents = useAppSelector<any>((state) => state.user.hiddenAgents)

    useEffect(() => {
        if (hiddenAgents.length) {
            setAgentsCopy(hiddenAgents)
            setTimeout(() => setLoading(false), 2000)
        } else {
            setTimeout(() => setLoading(false), 2000)
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

    const handleAvailableAgentsRedirect = (e: any) => {
        e.preventDefault()
        if (agentsCopy.length) {
            let hiddenAgentsChange = hiddenAgents.filter((hiddenAgent: any) => !retrievedAgents.some((agent: any) => agent.id === hiddenAgent.id))
            dispatch(setHiddenAgents(hiddenAgentsChange))
        } else {
            dispatch(setHiddenAgents([]))
        }
        router.push('/agents')
    }
    const handleSelectAll = () => {
        dispatch(setHiddenAgents([]))
        setAgentsCopy([])
        setLoading(true)
    }
    const handleSelectOnChange = (option: any) => {
        setOrder(option.label)
        let newOrder = sortAgents({ agents: [...agentsCopy], type: option.value })
        setAgentsCopy(newOrder)
    }

    const handleShowMore = () => {
        setIndex(prev => prev + 3)
    }
    const handleShowLess = () => {
        setIndex(prev => prev - 3)
    }
    const handleClickedAgent = (index: any) => {
        let currentAgents = [...agentsCopy]
        let clickedAgent = currentAgents.splice(index, 1)
        setAgentsCopy(currentAgents)
        setRetrievedAgents([...retrievedAgents, ...clickedAgent])
        if (!currentAgents.length) setLoading(true)
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

                            {
                                agentsCopy.length ?
                                    <>
                                        <h1>Hidden agents</h1>
                                        <h2>Select the agents you would like to see again in your search feed</h2>
                                        <Menu>
                                            <Select
                                                value={order}
                                                label="Order agents by"
                                                className="order-select"
                                                options={selectOptions}
                                                onChange={handleSelectOnChange}
                                            />
                                            <Anchor
                                                onClick={handleSelectAll}
                                                className="select-all-hidden"
                                            >
                                                Select all
                                            </Anchor>
                                            <Button
                                                onClick={handleAvailableAgentsRedirect}
                                                className="agents-redirect-btn"
                                                icon="leftArrow"
                                            >
                                                Go back to your matches
                                            </Button>
                                        </Menu>
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
                                                disabled={index === 3}
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
                                        <h1>No hidden agents</h1>
                                        <ErrorMessage message="There's no agent being excluded from your feed." />
                                        <Button
                                            className="mt-20"
                                            onClick={handleAvailableAgentsRedirect}
                                            icon="leftArrow"
                                        >
                                            Go back to your matches
                                        </Button>
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
    padding:40px 0px;
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
        margin-bottom:30px;
    }
    .mt-20{
        margin-top: 20px;
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
const Menu = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    align-items:center;
    grid-template-areas: 'select anchor button';
    gap:25px;
    width:100%;
    margin-bottom:38px;
    .order-select{
        grid-area:select;
        width:220px;
    }
    .select-all-hidden{
        grid-area:anchor;
        align-self: end;
        justify-self: center;
    }
    .agents-redirect-btn{
        grid-area:button;
        align-self: end;
        justify-self: end;
    }
    @media(max-width:${({ theme }) => theme.device.md}){
        grid-template-columns:0.7fr 1.3fr;
        grid-template-rows: 1fr auto;
        grid-template-areas: 
        'select button'
        'anchor  anchor';
        .order-select{
            width:100%;
        }
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        grid-template-columns:1fr;
        grid-template-rows:auto;
        grid-template-areas: 
        'select'  
        'button'
        'anchor';
        .order-select{
            width:100%;
        }
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