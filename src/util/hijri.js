import moment from 'moment';
import imoment from 'moment-hijri';

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
    { names: ['Hijri New Year'], day: 1, month: 1 },
    { names: ['Ashura', 'Crossing The Red Sea'], day: 10, month: 1 },
    { names: ['Messenger Birth'], day: 12, month: 3 },
    { names: ['Israa'], day: 27, month: 7 },
    { names: ['Mid Shaaban'], day: 15, month: 8 },
    { names: ['Ramadan'], day: 1, month: 9 },
    { names: ['Badr'], day: 17, month: 9 },
    { names: ['Shawwal','Fitr'], day: 1, month: 10 },
    { names: ['Uhud'], day: 7, month: 10 },
    { names: ['Adha'], day: 10, month: 12 },
  ]
  
  const eventsBefore = (inputDate = new Date())=> {
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
    return `${output[0].feast.names.join(',')} ${output[0].daysBefore * -1} days ago`;
  }

  const eventsAfter = (inputDate = new Date())=> {
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
    return `${output[1].feast.names.join(',')} in ${output[1].daysAfter} days `;
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

  const todayHijraDate = ()=> {
    return `${imoment().iDate()}-${hijraMonths[imoment().iMonth()]}-${imoment().iYear()}`
  }
  export {eventsNearby, todayHijraDate, eventsBefore, eventsAfter}