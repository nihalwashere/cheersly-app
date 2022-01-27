import React from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useMergeState } from "../../utils/custom-hooks";
import { DAYS, TIMES, TIMEZONES } from "../../utils/constants";
import { PrimaryButton } from "../../components/CustomButton";

const saveMatchMoment = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/v1/match-moments",
      payload
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const MatchMomentsContainer = () => {
  const [state, setState] = useMergeState({
    teamId: "T018LGG2CTY",
    day: "",
    time: "",
    timezone: "",
  });

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    const payload = { ...state };

    console.log("payload : ", payload);

    await saveMatchMoment(payload);
  };

  return (
    <div>
      Match Moments
      <div>
        <FormControl variant="outlined" className="input-select-field">
          <div className="filter-label-text">Day</div>
          <Select
            name="day"
            value={state.day}
            onChange={handleChange}
            autoComplete="off"
            inputProps={{
              autoComplete: "new-password",
            }}
          >
            {DAYS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="outlined" className="input-select-field">
          <div className="filter-label-text">Time</div>
          <Select
            name="time"
            value={state.time}
            onChange={handleChange}
            autoComplete="off"
            inputProps={{
              autoComplete: "new-password",
            }}
          >
            {TIMES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="outlined" className="input-select-field">
          <div className="filter-label-text">Timezone</div>
          <Select
            name="timezone"
            value={state.timezone}
            onChange={handleChange}
            autoComplete="off"
            inputProps={{
              autoComplete: "new-password",
            }}
          >
            {TIMEZONES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
    </div>
  );
};

export default MatchMomentsContainer;
