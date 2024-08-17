import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Entry, EntryType, NewEntry } from "../types";

type Props = {
  addEntry: (entry: NewEntry) => Promise<{ data?: Entry, error?: string }>
};

const AddEntry = ({ addEntry }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState(EntryType.HealthCheck);

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
            const baseFields = {
              type: formJson.type,
              description: formJson.description,
              date: formJson.date,
              specialist: formJson.specialist,
              diagnosisCodes: formJson.diagnosisCodes,
            };

            let newEntry;
            if (baseFields.type === 'HealthCheck') {
              newEntry = {
                ...baseFields,
                healthCheckRating: Number(formJson.healthCheckRating),
              };
            } else if (baseFields.type === 'Hospital') {
              newEntry = {
                ...baseFields,
                discharge: {
                  date: formJson['discharge-date'],
                  criteria: formJson['discharge-criteria'],
                },
              };
            } else if (baseFields.type === 'OccupationalHealthcare') {
              newEntry = {
                ...baseFields,
                employerName: formJson.employerName,
                sickLeave: {
                  startDate: formJson.startDate,
                  endDate: formJson.endDate,
                },
              };
            }

            const submitNewEntry = async (newEntry: NewEntry) => {
              const result = await addEntry(newEntry);
              if (result.error) {
                setError(result.error);
              } else {
                handleClose();
              }
            };

            submitNewEntry(newEntry as NewEntry);
          },
        }}
      >
        <DialogTitle>New Entry</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ paddingTop: '1rem' }}>
            <TextField label="Type" name="type" select value={type} onChange={(e) => setType(e.target.value as EntryType)}>
              {Object.values(EntryType).map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>

            {/* General fields */}
            <TextField label="Description" name="description" required autoFocus />
            <TextField label="Date" name="date" required />
            <TextField label="Specialist" name="specialist" required />

            {/* Type-specific fields */}
            {type === 'HealthCheck' ? (
              <TextField label="Healthcheck rating" name="healthCheckRating" required />
            ) : type === 'Hospital' ? (
              <>
                <TextField label="Discharge date" name="discharge-date" required />
                <TextField label="Discharge criteria" name="discharge-criteria" required />
              </>
            ) : type === 'OccupationalHealthcare' ? (
              <>
                <TextField label="Employer name" name="employerName" required />
                <TextField label="Sick leave start date" name="startDate" />
                <TextField label="Sick leave end date" name="endDate" />
              </>
            ) : null}

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
