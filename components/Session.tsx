"use client";

import { Session } from "@/types";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import SessionItem from "./SessionItem";
const titleOptions = [
  "none",
  "vc",
  "product",
  "data",
  "data2",
  "data3",
  "scrum",
  "product2",
  "product",
  "growth",
];
const statusOptions = ["none", "OFFERING", "RUNNING", "OFFBOARDING"];
export default function Session() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [sessions, setSessions] = useState<Session[]>();
  const [loading, setLoading] = useState(true);

  const onChageSelect =
    (action: Dispatch<SetStateAction<string>>) =>
    (e: SelectChangeEvent<string>) => {
      const selected = e.target.value;
      action(selected === "none" ? "" : selected);
    };

  useEffect(() => {
    (async () => {
      let baseAPI = "/api/sessions";
      if (status || title) {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (title) params.append("short_title", title);
        baseAPI += "?" + params.toString();
      }
      const response = await fetch(baseAPI);
      const data = (await response.json()) as Session[];
      setSessions(data.filter((_, idx) => idx < 50));
      setLoading(false);
    })();
  }, [title, status]);
  if (loading) {
    return <CircularProgress style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }} />
  }
  if(!loading && !sessions) {
    return <h1>No result</h1>
  }
  return (
    <Stack display="flex">
      <Stack
        display="flex"
        gap="100px"
        flexDirection="row"
        marginBottom={"100px"}
        marginLeft={"10px"}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="short-title-label">Short Title</InputLabel>
          <Select
            labelId="short-title-label"
            id="short-title-select"
            value={title}
            onChange={onChageSelect(setTitle)}
            label="Title"
          >
            {titleOptions.map((option, idx) => {
              return (
                <MenuItem key={idx} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={status}
            onChange={onChageSelect(setStatus)}
            label="Status"
          >
            {statusOptions.map((option, idx) => {
              return (
                <MenuItem key={idx} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {sessions && sessions.length > 0 ? (
          sessions
            .filter((_, idx) => idx < 50)
            .map(session => {
              return <SessionItem session={session} key={session.id} />;
            })
        ) : (
          <h1>No Result</h1>
        )}
      </div>
    </Stack>
  );
}
