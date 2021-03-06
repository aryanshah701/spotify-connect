import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Box from '@material-ui/core/Box';

// Styles for grid list, grid tiles, and cards to showcase top tracks
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    fontWeight: '700',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1200,
    height: 300,
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  gridTile: {
    position: 'relative',
    float: 'left',
    width: '100%',
    minHeight: '250px',
    minWidth: '175px',
    maxWidth: '225px',
    overflow: 'hidden',
    height: '100% !important',
  },
  cardRoot: {
    minWidth: 150,
    maxWidth: 200,
    minHeight: 250,
    flex: 1,
    //backgroundColor: '#1DB954',
    backgroundColor: '#191414',
    color: 'white',
    fontWeight: 'fontWeightBold !important',
  },
  name: {
    fontSize: 16,
    height: '100%',
    display: 'block',
    marginTop: '2rem',
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
});

export default function TopTracks(props) {
  const { tracks } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tracks.map((track) => (
          <GridListTile
            className={classes.gridTile}
            key={track ? track.image : ''}
          >
            <Card className={classes.cardRoot}>
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image={track ? track.image : ''}
                  title="Track image"
                  component="img"
                />
                <Box className={classes.name} fontWeight={500}>
                  {track ? track.name : ''}
                </Box>
              </CardContent>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
