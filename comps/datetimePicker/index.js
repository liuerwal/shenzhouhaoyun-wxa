var _ = require('../../asset/js/util');

var date = new Date()
var years = []
var months = []
var days = []
var hours = []
var year = date.getFullYear()
var start_year = 1970;


var tomorrow = new Date(_.strtotime('+1 day')*1000)

for (let i = start_year; i <= 2038; i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}

for (let i = 0 ; i <= 23; i++) {
  hours.push(i)
}

module.exports = {
    data: {
        dt_years: years,
        dt_months: months,
        dt_days: days,
        dt_hours: hours,
        dt_value: [ tomorrow.getFullYear()-start_year, tomorrow.getMonth(), tomorrow.getDate()-1, tomorrow.getHours()],
        dt_show: false,
        datetime: ''
    },
    customData: {
        dt_pickerData: ''
    },
    datetimePickerShow: function(){
        this.setData({
            dt_show: true
        })
    },
    datetimePickerHide: function(){
        console.log('hidden')
        this.setData({
            dt_show: false
        })
    },
    datetimePickerChange: function(e) {
        var val = e.detail.value
        console.log('picker发送选择改变，携带值为', e.detail.value)

        this.customData.dt_pickerData = this.format(val)

    },
    datetimePickerChoose: function(e) {

        console.log('choose')

        this.setData({
            datetime: this.customData.dt_pickerData || this.format( this.data.dt_value ),
        })
        this.datetimePickerHide()

    },
    format: function(val){
        return _.sprintf('%d-%d-%d %d:00', years[val[0]], months[val[1]], days[val[2]], hours[val[3]])
    },
    donothing: function(e){
        //catch tap
        //do nothing
    }
}