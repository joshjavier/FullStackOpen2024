import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Entry, NewEntry } from "../types";

type Props = {
  addEntry: (entry: NewEntry) => Promise<{ data?: Entry, error?: string }>
};

const AddEntry = ({ addEntry }: Props) => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>Add New Entry</Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formJson = Object.fromEntries((formData as any).entries());
            const newEntry: NewEntry = {
              type: 'HealthCheck',
              description: formJson.description,
              date: formJson.date,
              specialist: formJson.specialist,
              healthCheckRating: Number(formJson.healthCheckRating),
              diagnosisCodes: formJson.diagnosisCodes,
            };
            console.log(newEntry);

            const submitNewEntry = async (newEntry: NewEntry) => {
              const result = await addEntry(newEntry);
              if (result.error) {
                setError(result.error);
              } else {
                handleClose();
              }
            };

            submitNewEntry(newEntry);
          },
        }}
      >
        <DialogTitle>New Healthcheck Entry</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ paddingTop: '1rem' }}>
            <TextField label="Description" name="description" autoFocus required />
            <TextField label="Date" name="date" required />
            <TextField label="Specialist" name="specialist" required />
            <TextField label="Healthcheck rating" name="healthCheckRating" required />
            <TextField label="Diagnosis codes" name="diagnosisCodes" />
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: '0 1.5rem 1rem' }}>
          <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
          <Button type="submit" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEntry;
