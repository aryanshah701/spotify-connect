import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

export default function TopArtists(props) {
  const { artists } = props;
  const classes = useStyles();
  console.log('From component ' + artists);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {artists.map((artist) => (
          <GridListTile
            className={classes.gridTile}
            key={artist ? artist.image.url : ''}
          >
            <Card className={classes.cardRoot}>
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image={artist ? artist.image.url : ''}
                  title="Track image"
                  component="img"
                />
                <Box className={classes.name} fontWeight={500}>
                  {artist ? artist.name : ''}
                </Box>
              </CardContent>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
