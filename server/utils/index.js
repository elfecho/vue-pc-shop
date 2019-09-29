exports.randomOrderNum = () => {
    var myDate = new Date()
    const OrderNum = String(myDate.getFullYear()) + String(myDate.getMonth() + 1) + 
        String(myDate.getDate()) + String(myDate.getHours()) + String(myDate.getMinutes()) +
        String(myDate.getSeconds()) +  parseInt(Math.random() * 10000)
    return OrderNum
}