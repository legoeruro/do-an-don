import { Grid } from "@mantine/core";

export default function StylizedGrid({...rest}){
    return (
        <Grid
            {...rest}
            style={{
                border: '1px solid black',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px',
                backgroundColor: 'lightgrey',
            }}
        >
            {rest.children}
        </Grid>
    );
}