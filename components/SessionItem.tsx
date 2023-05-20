"use client";

import { Program, Session } from "@/types";
import Image from "next/image";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { formatDateString } from "@/utils";

export default function SessionItem({ session }: { session: Session }) {
  return (
    <Box sx={{ flex: "0 0 calc(33% - 20px)", margin: "10px" }}>
      <Card variant="outlined">
        <CardContent>
          <Image
            src={session.program[0].thumbnail_img_url}
            width={100}
            height={60}
            alt="program_thumnail"
          />
          <Typography variant="h6">
            {session.program[0].display_title}
          </Typography>
          <Typography variant="subtitle1">
            {formatDateString(session.start_date)} -{" "}
            {formatDateString(session.end_date)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
