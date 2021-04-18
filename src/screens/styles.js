import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  button: {
    marginTop: '40px',
    marginBottom: '40px'
  },
  cardGrid: {
    padding: '20px 0'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default useStyles;