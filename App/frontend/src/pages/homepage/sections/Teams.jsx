import { Grid } from "@chakra-ui/react"
import TeamCard from "../components/TeamCard"
import { teams } from "../../../utils/mockup"

const Teams = ({queryType})=>{
    return(
        <Grid gridTemplateColumns="repeat(4,1fr)" gap={10}>
        {
            Array.from({length:12}).map(()=>{
                return(
                    <TeamCard data={teams[0]}/>
                )
            })
        }
    </Grid>
    )
}

export default Teams