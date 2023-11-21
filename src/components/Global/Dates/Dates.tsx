const Dates = () => {
  const currentDate = new Date(); // Current date and time
  const fromDate = new Date();
  const toDate = new Date();

  const day = currentDate.getDate() - 1;
  const fMin = currentDate.getMinutes() - 5;
  const tMin = currentDate.getMinutes() + 1;

  fromDate.setDate(day);
  fromDate.setMinutes(fMin)
  toDate.setMinutes(tMin)

  // const formattedFromDate = fromDate.toLocaleString();
  // const formattedToDate = toDate.toLocaleString();

  const isoFromDate  = fromDate.toISOString();
  const isoToDate  = toDate.toISOString();

  console.log(isoFromDate,isoToDate);


  const new3 = new Date().toISOString();

  console.log(new3);
  

// toISOstring, toUTCstring does not accept object like timezone

/*
Both toISOString() and toUTCString() are methods of the Date object in JavaScript, but they have different purposes and output formats.

1. toISOString()
The toISOString() method returns a string representing the date and time in a simplified extended ISO 8601 format in UTC time. The ISO 8601 format is widely used and accepted for representing dates and times. The format is as follows:

plaintext
Copy code
YYYY-MM-DDTHH:MM:SS.sssZ
YYYY: Four-digit year.
MM: Two-digit month (01 for January, 02 for February, and so on).
DD: Two-digit day of the month.
T: Separator between the date and time parts.
HH: Two-digit hour (24-hour format).
MM: Two-digit minute.
SS: Two-digit second.
sss: Three-digit millisecond.
Z: Indicates UTC (Coordinated Universal Time).


  */
  // const now = new Date();
  // const isoString = now.toISOString();
  // // console.log(isoString);

  // const currentDate2 = new Date();
  // const utcString = currentDate2.toUTCString();
  // // console.log(utcString);

  return <div>Dates</div>;
};

export default Dates;
