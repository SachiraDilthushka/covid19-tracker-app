import { Card, Container, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function InfoBox({ title, cases, total }) {
    const classes = useStyles();
    return (

        <Container>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className="infoBox_title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className="infoBox_cases">{cases}</h2>
                    <Typography className="infoBox_total" color="textSecondary">
                        {total} Total
                    </Typography>

                </CardContent>

            </Card>
        </Container>



    )
}

export default InfoBox
