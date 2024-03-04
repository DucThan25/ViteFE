import * as moment from "moment"

import { DATE_FORMAT, DATE_TIME_FORMAT, CLIENT_DATE_TIME_FORMAT, SERVER_DATE_TIME_FORMAT } from "@/constants"

export const dateFormat = "d/m/Y"
export function formatDate (date, defaultValue, inputFormat) {
  if (!date) {
    return defaultValue || date
  }

  return moment(date, inputFormat || "YYYY-MM-DD hh:mm:ss").format(
    "DD/MM/YYYY"
  )
}
export function formatCurrency (number, n, x, s, c) {
  if (isNaN(+number)) {
    return number
  }
  let re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")"
  let num = (+number).toFixed(Math.max(0, ~~n))

  return (
    (c ? num.replace(".", c) : num).replace(
      new RegExp(re, "g"),
      "$&" + (s || ",")
    ) + " vnđ"
  )
}
// export function formatCurrency(number, n, x, s, c) {
//   if (isNaN(+number)) {
//     return number;
//   }
//   let re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")";
//   let num = (+number).toFixed(Math.max(0, ~~n));

//   return (c ? num.replace(".", c) : num).replace(
//     new RegExp(re, "g"),
//     "$&" + (s || ",")
//   );
// }

export function parseDate (date) {
  if (!date) return null
  let format = "ddd MMM DD hh:mm:ss [ICT] YYYY"
  let parsedDate = moment(date, format)
  if (!parsedDate.isValid()) {
    format = DATE_FORMAT
    parsedDate = moment(date, format)
  }

  if (!parsedDate.isValid()) return null

  return parsedDate.format(DATE_FORMAT)
}
export function parseServerDateTime (date) {
  if (!date) return null
  let format = DATE_TIME_FORMAT
  let parsedDate = moment(date, format)

  // try other formats then return common format
  // ...

  if (!parsedDate.isValid()) return null

  return parsedDate.format(DATE_TIME_FORMAT)
}
export function toServerDateTime (date) {
  if (!date) return null
  const d = moment(date, CLIENT_DATE_TIME_FORMAT)
  if (!d.isValid()) return null

  return d.format(SERVER_DATE_TIME_FORMAT)
}

export function formatCurrencyNoVND (number, n, x, s, c) {
  if (isNaN(+number)) {
    return number
  }
  let re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")"
  let num = (+number).toFixed(Math.max(0, ~~n))

  return (c ? num.replace(".", c) : num).replace(
    new RegExp(re, "g"),
    "$&" + (s || ",")
  )
}
function parseDateOrDefault (date) {
  if (!date) return null

  // let format = "ddd MMM DD hh:mm:ss [ICT] YYYY";
  let format = "YYYY-MM-DD hh:mm:ss"
  let parsedDate = moment(date, format)
  if (!parsedDate.isValid()) {
    format = DATE_FORMAT
    parsedDate = moment(date, format)
  }
  if (!parsedDate.isValid()) {
    format = "ddd MMM DD hh:mm:ss [ICT] YYYY"
    parsedDate = moment(date, format)
  }

  if (!parsedDate.isValid()) return date

  return parsedDate.format(DATE_FORMAT)
}
export function convertDateKeysFromObject (obj) {
  let rs = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]

      if (key.toLowerCase().includes('ngay')) {
        rs[key] = parseDateOrDefault(element)
      } else {
        rs[key] = element
      }
    }
  }
  return rs
}
export function transformKeysToLower (obj) {
  let newObj = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key.toLowerCase()] = obj[key]
    }
  }
  return newObj
}
