'use client';

import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Grid, CircularProgress, Button, Container } from '@mui/material';
import { HistoricalChart } from '../config/service';

import { Line } from 'react-chartjs-2';
const Coinchart = ({ id }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    async function getHistoricalData() {
        setIsLoading(true);
        let histData = await axios.get(HistoricalChart(id, days, currency));
        setHistoricalData(histData?.data?.prices || []);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [historicalData]);

    useEffect(() => {
        getHistoricalData();
    }, [days, currency]);

    function handledateChange(event) {
        setDays(event.target.value);
    }
    return (
        <Grid>
            {loading ? (
                <Grid
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress />
                </Grid>
            ) : (
                <Container>
                    <Grid sx={{ m: '10px' }}>
                        <Line
                            data={{
                                labels: (historicalData || []).map((val) => {
                                    let date = new Date(val[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${
                                                  date.getHours() - 12
                                              }:${date.getMinutes()}PM`
                                            : `${date.getHours()}:${date.getMinutes()}AM`;
                                    return days === 1
                                        ? time
                                        : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicalData.map(
                                            (val) => val[1]
                                        ),
                                        label: `Price (past ${days} days) in ${currency}`,
                                        borderColor: '#EEBC1D',
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        ></Line>
                        <Grid
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 2,
                            }}
                        >
                            <Button
                                variant="outlined"
                                on
                                onClick={handledateChange}
                                sx={{ mr: 1 }}
                                value="1"
                            >
                                24 hours
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handledateChange}
                                sx={{ mr: 1 }}
                                value="30"
                            >
                                30 Days
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handledateChange}
                                sx={{ mr: 1 }}
                                value="90"
                            >
                                3 months
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handledateChange}
                                value="365"
                            >
                                1 year
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Grid>
    );
};

export default Coinchart;
