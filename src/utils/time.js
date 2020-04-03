// 修改时间格式
export function date0(data) {
  if (data) {
    let date = new Date(data)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
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

export function time0(data) {
  if (data) {
    let date = new Date(data)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
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
    if (seconds >= 0 && seconds <= 9) {
      seconds = '0' + seconds
    }
    return (`${year}-${month}-${strDate} ${hours}:${minutes}:${seconds}`)
  } else {
    return ('')
  }

}