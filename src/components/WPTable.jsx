import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(WP, Coordinates, Distance) {
    return { WP, Coordinates, Distance };
}

function haversineDistance(coord1, coord2) {
    console.log(coord1, coord2);
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = R * c;
    const distanceInMeters = distanceInKm * 1000;

    return Number(distanceInMeters.toFixed(1));
}

const WPTable = ({ drawing }) => {
    let wp = 0;

    const getWP = (wp) => {
        if (wp < 10) {
            return "0" + wp;
        } else return wp;
    }

    const rows = drawing?.coords?.map((coords, i) => {
        wp++;
        let distance;
        if (i === 0) {
            distance = "--";
        } else {
            distance = haversineDistance(coords, drawing.coords[i - 1]);
        }
        return createData(getWP(wp), coords.join(", "), distance);
    }) || [];


    return (
        <TableContainer
            component={Paper}
            sx={{
                minWidth: 300,
                maxHeight: 300, // Limit the height
                overflowY: 'auto', // Enable vertical scrolling
            }}
        >
            <Table stickyHeader sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>WP</TableCell>
                        <TableCell align="right">Coordinates</TableCell>
                        <TableCell align="right">Distance&nbsp;(m)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.WP}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.WP}
                            </TableCell>
                            <TableCell align="right">{row.Coordinates}</TableCell>
                            <TableCell align="right">{row.Distance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WPTable;