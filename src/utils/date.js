// 修改时间格式
export function date(data) {
  if (data) {
    let date = ''
    if (typeof(data) == 'string') {
      date = new Date(data.replace(/-/g,'/'))
    }else{
      date = new Date(data)
    }
    // let date = new Date(data.replace(/-/g,'/'))
    let year = date.getYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    year = year - 100
    if (year >= 1 && year <= 9) {
      year = "0" + year
    }
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    return (`${year}-${month}-${strDate}`)
  } else {
    return ('')
  }
}

export function date_(data) {
  if (data) {
    let date = ''
    if (typeof(data) == 'string') {
      date = new Date(data.replace(/-/g,'/'))
    }else{
      date = new Date(data)
    }
    let year = date.getYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    year = year - 100
    if (year >= 1 && year <= 9) {
      year = "0" + year
    }
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    return (`${year}.${month}.${strDate}`)
  } else {
    return ('')
  }
}

export function time(data) {
  if (data) {
    let date = ''
    if (typeof(data) == 'string') {
      date = new Date(data.replace(/-/g,'/'))
    }else{
      date = new Date(data)
    }
    let year = date.getYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    year = year - 100
    if (year >= 1 && year <= 9) {
      year = "0" + year
    }
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    if (hours >= 0 && hours <= 9) {
      hours = '0' + hours
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes
    }
    return (`${year}-${month}-${strDate} ${hours}:${minutes}`)
  } else {
    return ('')
  }

}