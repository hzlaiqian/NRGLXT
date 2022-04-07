export default {
  dateFormatter(date){
    let dateResult = date.getFullYear() + '-' + Number(date.getMonth()+1) + '-' + date.getDate()
    console.log('sssssssssssssss',dateResult)
    return dateResult
  },
}
