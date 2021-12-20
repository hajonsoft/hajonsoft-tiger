import React from 'react';
import moment from 'moment';
import imoment from 'moment-hijri';
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
  { names: [t('hijri-new-year'), "Muhram "], day: 1, month: 1 },
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

const eventsBefore = (inputDate = new Date()) => {
  const currentHijraYear = imoment().iYear();
  const departureMoment = moment(inputDate)
  const output = [
    { daysBefore: -1000, feast: {} },
    { daysAfter: 1000, feast: {} },

  ]
  festivals.forEach(festival => {
    const gDate = imoment(`${currentHijraYear}/${festival.month}/${festival.day}`, 'iYYYY/iM/iD')
    const gDateNext = imoment(`${currentHijraYear + 1}/${festival.month}/${festival.day}`, 'iYYYY/iM/iD')
    const diffThisYear = gDate.diff(departureMoment, 'days')
    if (diffThisYear < 0 && diffThisYear > output[0].daysBefore) {
      output[0].daysBefore = diffThisYear;
      output[0].feast = festival;
    } else if (diffThisYear > 0 && diffThisYear < output[1].daysAfter) {
      output[1].daysAfter = diffThisYear;
      output[1].feast = festival;
    }

    const diffNextYear = gDateNext.diff(departureMoment, 'days')
    if (diffNextYear < 0 && diffNextYear > output[0].daysBefore) {
      output[0].daysBefore = diffNextYear;
      output[0].feast = festival;
    } else if (diffNextYear > 0 && diffNextYear < output[1].daysAfter) {
      output[1].daysAfter = diffNextYear;
      output[1].feast = festival;
    }
  })
  return (
    <div>
      {output?.[0]?.feast?.names.map(name => <span style={{marginRight: '8px'}}>{name}</span>)}
      <span>
        {`${output?.[0]?.daysBefore * -1} days ago`}
      </span>
    </div >
  );
}

const eventsAfter = (inputDate = new Date()) => {
  const currentHijraYear = imoment().iYear();
  const departureMoment = moment(inputDate)
  const output = [
    { daysBefore: -1000, feast: {} },
    { daysAfter: 1000, feast: {} },

  ]
  festivals.forEach(f => {
    const gDate = imoment(`${currentHijraYear}/${f.month}/${f.day}`, 'iYYYY/iM/iD')
    const gDateNext = imoment(`${currentHijraYear + 1}/${f.month}/${f.day}`, 'iYYYY/iM/iD')
    const diffThisYear = gDate.diff(departureMoment, 'days')
    if (diffThisYear < 0 && diffThisYear > output[0].daysBefore) {
      output[0].daysBefore = diffThisYear;
      output[0].feast = f;
    } else if (diffThisYear > 0 && diffThisYear < output[1].daysAfter) {
      output[1].daysAfter = diffThisYear;
      output[1].feast = f;
    }

    const diffNextYear = gDateNext.diff(departureMoment, 'days')
    if (diffNextYear < 0 && diffNextYear > output[0].daysBefore) {
      output[0].daysBefore = diffNextYear;
      output[0].feast = f;
    } else if (diffNextYear > 0 && diffNextYear < output[1].daysAfter) {
      output[1].daysAfter = diffNextYear;
      output[1].feast = f;
    }
  })
  return (
    <div>
      {output?.[1]?.feast?.names.map(name => <span style={{marginRight: '8px'}}>{name}</span>)}
      <span>
        {`in ${output?.[1]?.daysAfter} days`}
      </span>
    </div >
  );
}

const eventsNow = (inputDate = new Date()) => {
  let reply = ` ${imoment(inputDate).iDayOfYear()} 👉 ${imoment(inputDate).format("iYYYY/iMMM/iD [is] YYYY/MMM/D")}`;
  const hajjAkbarDate = imoment(`${imoment().iYear()}/12/8`, "iYYYY/iM/iD");
  reply += "👉 Hajj akbar in Tawba:3 👉 " + hajjAkbarDate.fromNow();

  return reply;
}
const eventsNearby = (inputDate) => {

  const currentHijraYear = imoment().iYear();
  const departureMoment = moment(inputDate)
  const output = [
    { daysBefore: -1000, feast: {} },
    { daysAfter: 1000, feast: {} },

  ]
  festivals.forEach(f => {
    const gDate = imoment(`${currentHijraYear}/${f.month}/${f.day}`, 'iYYYY/iM/iD')
    const gDateNext = imoment(`${currentHijraYear + 1}/${f.month}/${f.day}`, 'iYYYY/iM/iD')
    const diffThisYear = gDate.diff(departureMoment, 'days')
    if (diffThisYear < 0 && diffThisYear > output[0].daysBefore) {
      output[0].daysBefore = diffThisYear;
      output[0].feast = f;
    } else if (diffThisYear > 0 && diffThisYear < output[1].daysAfter) {
      output[1].daysAfter = diffThisYear;
      output[1].feast = f;
    }

    const diffNextYear = gDateNext.diff(departureMoment, 'days')
    if (diffNextYear < 0 && diffNextYear > output[0].daysBefore) {
      output[0].daysBefore = diffNextYear;
      output[0].feast = f;
    } else if (diffNextYear > 0 && diffNextYear < output[1].daysAfter) {
      output[1].daysAfter = diffNextYear;
      output[1].feast = f;
    }
  })
  return `${output?.[0]?.feast?.names?.join(',')} ${Math.abs(output?.[0]?.daysBefore)} days ago, ${output?.[1]?.feast?.names?.join(',')} in ${output?.[1]?.daysAfter} days `;
}

const todayHijraDate = () => {
  return `${imoment().iDate()}-${hijraMonths[imoment().iMonth()]}-${imoment().iYear()}`
}
export { eventsNearby, todayHijraDate, eventsBefore, eventsAfter, eventsNow }