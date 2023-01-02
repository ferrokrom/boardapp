import { format } from "date-fns";
import React from "react";

function formatDate(datePm: string | Date) {
  const result = format(new Date(datePm), "MM/dd/yyyy");

  return result;
}

export default formatDate;
