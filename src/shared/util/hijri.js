import { Typography } from '@material-ui/core';
import moment from 'moment';
import imoment from 'moment-hijri';
import React from 'react';
import t from '../util/trans';

const hijraMonths = [
  'Muharram', //1
  'Safar', //2
  'Rabi al-Awwal', //3
  'Rabi ath-Thani', //4
  'Jumada al-Ula', //5
  'Jumada ath-Thaniyah', //6
  'Rajab', //7
  'Shaaban', //8
  'Ramadan', //9
  'Shawwal', //10
  'Du al-Qadah', //11
  'Du al-Hijjah' //12
]

const festivals = [
  { names: [t('hijri-new-year'), t('muhram')], day: 1, month: 1 },
  { names: [t('ashura'), t('crossing-the-red-sea'), t('haram-month-tawba-36')], day: 10, month: 1 },
  { names: [t('ragab-haram-month-tawba-36')], day: 1, month: 7 },
  { names: [t('israa')], day: 27, month: 7 },
  { names: [t('mid-shaaban')], day: 15, month: 8 },
  { names: [t('ramadan')], day: 1, month: 9 },
  { names: [t('shawwal')], day: 1, month: 10 },
  { names: [t('dhul-qadah-haj-month-tawba-36')], day: 1, month: 11 },
  { names: [t('dhul-hijjah-hajj-month-tawba-36')], day: 1, month: 12 },
  { names: [t('hajj-akbar-tawba-3')], day: 10, month: 12 },
]

function getBeforeAndAfter(inputDate) {
  const nowHijraYear = imoment().iYear();
  const centerDate = moment(inputDate)
  const beforeAndAfter = [
    { daysBefore: -1000, feast: {} },
    { daysAfter: 1000, feast: {} },

  ]
  festivals.forEach(festival => {
    const festivalHijriDate = imoment(`${nowHijraYear}/${festival.month}/${festival.day}`, 'iYYYY/iM/iD')
    const festivalNextYearDate = imoment(`${nowHijraYear + 1}/${festival.month}/${festival.day}`, 'iYYYY/iM/iD')
    const diffThisYear = festivalHijriDate.diff(centerDate, 'days')
    if (diffThisYear < 0 && diffThisYear > beforeAndAfter[0].daysBefore) {
      beforeAndAfter[0].daysBefore = diffThisYear;
      beforeAndAfter[0].feast = festival;
    } else if (diffThisYear > 0 && diffThisYear < beforeAndAfter[1].daysAfter) {
      beforeAndAfter[1].daysAfter = diffThisYear;
      beforeAndAfter[1].feast = festival;
    }

    const diffNextYear = festivalNextYearDate.diff(centerDate, 'days')
    if (diffNextYear < 0 && diffNextYear > beforeAndAfter[0].daysBefore) {
      beforeAndAfter[0].daysBefore = diffNextYear;
      beforeAndAfter[0].feast = festival;
    } else if (diffNextYear > 0 && diffNextYear < beforeAndAfter[1].daysAfter) {
      beforeAndAfter[1].daysAfter = diffNextYear;
      beforeAndAfter[1].feast = festival;
    }
  })
  return beforeAndAfter;
}

const eventsBefore = (inputDate = new Date()) => {
  const beforeAndAfter = getBeforeAndAfter(inputDate);

  return (
    <Typography variant='caption'>
      {beforeAndAfter?.[0]?.feast?.names.map(name => <span style={{ marginRight: '8px' }}>{name}</span>)}
    </Typography>
  );
}

const eventsAfter = (inputDate = new Date()) => {
  const beforeAndAfter = getBeforeAndAfter(inputDate);

  return (
    <Typography variant="caption">
      {beforeAndAfter?.[1]?.feast?.names.map(name => <span style={{ marginRight: '8px' }}>{name}</span>)}
    </Typography >
  );
}

const eventsNow = (inputDate = new Date()) => {
  let reply = ` ${imoment(inputDate).iDayOfYear()} 👉 ${imoment(inputDate).format("iYYYY/iMMMM-iM/iD [is] dddd YYYY/MMM/D")}`;
  const hajjAkbarDate = imoment(`${imoment().iYear()}/12/8`, "iYYYY/iM/iD");
  reply += "👉 Hajj akbar in Tawba:3 👉 " + hajjAkbarDate.fromNow();

  return reply;
}
const eventsNearby = (inputDate) => {
  // const beforeAndAfter = getBeforeAndAfter(inputDate);
  return ''; // `${beforeAndAfter?.[0]?.feast?.names?.join(',')} ${Math.abs(beforeAndAfter?.[0]?.daysBefore)} days ago, ${beforeAndAfter?.[1]?.feast?.names?.join(',')} in ${beforeAndAfter?.[1]?.daysAfter} days `;
}

const todayHijraDate = () => {
  return `${imoment().iDate()}-${hijraMonths[imoment().iMonth()]}-${imoment().iYear()}`
}
export { eventsNearby, todayHijraDate, eventsBefore, eventsAfter, eventsNow };
