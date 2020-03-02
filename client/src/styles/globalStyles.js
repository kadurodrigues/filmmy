import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

export const useDialogStyles = makeStyles(theme => ({
  dialogContentText: {
    marginTop: theme.spacing(2),
  }
}));