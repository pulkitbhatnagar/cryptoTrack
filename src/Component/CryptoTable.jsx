import React, { useState } from 'react';
import { Typography, Grid, Container, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    LinearProgress,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { CryptoState } from '../CryptoContext';

import { numberToComma } from '../utils/numberToAmountConversion';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CryptoTable = () => {
    let [input, setInput] = useState('');
    let [page, setPage] = useState(1);
    let { symbol, coins, loading } = CryptoState();
    let history = useNavigate();

    function filterCoins() {
        let filteredData = coins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(input.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(input.toLowerCase())
            );
        });
        return filteredData;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Typography
                    variant="h4"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                        color: '#fccb06',
                    }}
                >
                    Coins By Market Capital
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Search By Coin ..."
                    variant="outlined"
                    sx={{ width: '100%', mt: 2, mb: 2 }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {loading ? (
                    <LinearProgress color="secondary" />
                ) : (
                    <TableContainer component={Paper}>
                        <Table
                            sx={{
                                maxWidth: 'auto',
                            }}
                            aria-label="simple table"
                        >
                            <TableHead
                                sx={{
                                    backgroundColor: 'gold',

                                    width: '100%',
                                }}
                            >
                                <TableRow
                                    sx={{
                                        fontSize: '24px',
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            fontSize: '24px',
                                            color: 'black',
                                        }}
                                    >
                                        Coin
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: '24px',
                                            color: 'black',
                                        }}
                                    >
                                        Price
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: '24px',
                                            color: 'black',
                                            display: {
                                                xs: 'none',
                                                sm: 'revert',
                                            },
                                        }}
                                    >
                                        24 hour Change
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: '24px',
                                            color: 'black',
                                            display: {
                                                xs: 'none',
                                                sm: 'revert',
                                            },
                                        }}
                                    >
                                        Market Cap
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterCoins()
                                    .slice(
                                        (page - 1) * 10,
                                        (page - 1) * 10 + 10
                                    )
                                    .map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                onClick={() =>
                                                    history(`/coins/${row.id}`)
                                                }
                                            >
                                                <Grid>
                                                    <Grid
                                                        sx={{ display: 'flex' }}
                                                    >
                                                        <img
                                                            src={row.image}
                                                            alt={row.name}
                                                            style={{
                                                                height: '60px',
                                                            }}
                                                        />
                                                        <Grid
                                                            sx={{ pl: '10px' }}
                                                        >
                                                            <Grid>
                                                                <Typography variant="h5">
                                                                    {row.symbol.toUpperCase()}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid>
                                                                <Typography variant="h5">
                                                                    {row.name}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}
                                                {numberToComma(
                                                    row.current_price
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    color:
                                                        row.price_change_percentage_24h >
                                                        0
                                                            ? 'green'
                                                            : 'red',
                                                    display: {
                                                        xs: 'none',
                                                        sm: 'revert',
                                                    },
                                                }}
                                            >
                                                {numberToComma(
                                                    row.price_change_percentage_24h
                                                )}
                                                %{' '}
                                                <span s>
                                                    {row.price_change_percentage_24h >
                                                    0
                                                        ? '⬆'
                                                        : '⬇'}
                                                </span>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    display: {
                                                        xs: 'none',
                                                        sm: 'revert',
                                                    },
                                                }}
                                            >
                                                {symbol}
                                                {numberToComma(row.market_cap)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {!loading && (
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '20px',
                        }}
                    >
                        <Pagination
                            count={(filterCoins()?.length / 10).toFixed(0)}
                            variant="outlined"
                            shape="rounded"
                            onChange={(e, page) => setPage(page)}
                        />
                    </Grid>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default CryptoTable;
