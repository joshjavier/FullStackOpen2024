import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { Diagnosis, Entry, EntryType, HealthCheckRating, NewEntry } from "../types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  addEntry: (entry: NewEntry) => Promise<{ data?: Entry, error?: string }>
  codes: Array<Diagnosis['code']>
};

const AddEntry = ({ addEntry, codes }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState(EntryType.HealthCheck);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const marks = Object.keys(HealthCheckRating)
    .filter(v => isNaN(Number(v)))
    .map((v, i) => ({ value: i, label: v }));

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
              date: dayjs(formJson.date).format().slice(0, 10),
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
                  date: dayjs(formJson['discharge-date']).format().slice(0, 10),
                  criteria: formJson['discharge-criteria'],
                },
              };
            } else if (baseFields.type === 'OccupationalHealthcare') {
              newEntry = {
                ...baseFields,
                employerName: formJson.employerName,
                sickLeave: {
                  startDate: dayjs(formJson.startDate).format().slice(0, 10),
                  endDate: dayjs(formJson.endDate).format().slice(0, 10),
                },
              };
            }
            // console.log(formJson);
            // console.log(newEntry);

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
            {/* <TextField label="Date" name="date" required /> */}
            <DatePicker label="Date" name="date" />
            <TextField label="Specialist" name="specialist" required />

            {/* Type-specific fields */}
            {type === 'HealthCheck' ? (
              <>
                <Typography id="healthcheckrating-slider-label">Healthcheck rating</Typography>
                <Slider
                  aria-labelledby="healthcheckrating-slider-label"
                  name="healthCheckRating"
                  min={0}
                  max={3}
                  marks={marks}
                  style={{ marginBottom: 24, marginInline: 'auto', maxWidth: '50%' }}
                />
              </>
            ) : type === 'Hospital' ? (
              <>
                <DatePicker label="Discharge date" name="discharge-date" />
                <TextField label="Discharge criteria" name="discharge-criteria" required />
              </>
            ) : type === 'OccupationalHealthcare' ? (
              <>
                <TextField label="Employer name" name="employerName" required />
                <DatePicker label="Sick leave start date" name="startDate" />
                <DatePicker label="Sick leave end date" name="endDate" />
              </>
            ) : null}

            <FormControl>
              <InputLabel id="codes-label">Diagnosis codes</InputLabel>
              <Select
                multiple
                labelId="codes-label"
                name="diagnosisCodes"
                defaultValue={[]}
                input={<OutlinedInput label="Diagnosis codes" />}
                MenuProps={{ sx: { maxHeight: 250 } }}
              >
                {codes.map(c => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
