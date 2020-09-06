export default function getDatefrom(days) {
  let dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - days);
  dateFrom = dateFrom.toISOString().slice(0, 10);

  console.log(dateFrom);
  return dateFrom;
}
