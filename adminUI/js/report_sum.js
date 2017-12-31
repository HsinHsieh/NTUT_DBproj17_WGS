$(document).ready(function() {
  $('#reportNumDate_start').val('2017-12-01');
  $('#reportNumDate_end').val('2017-12-31');
  var ShowSumDay = function(msg) {
    var resObj = JSON.parse(msg);
    console.log(resObj);

    var chart = c3.generate({
      bindto: '#SumDayChart',
      data: {
        json: resObj,
        keys: {
          x: 'DateF',
          value: ['Osum']
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      },
      legend: {
        show: false
      }
    });
  };
  var ShowSumWeek = function(msg) {
    var resObj = JSON.parse(msg);
    var chart = c3.generate({
      bindto: '#SumWeekChart',
      data: {
        json: resObj,
        keys: {
          x: 'DateF',
          value: ['Osum']
        }
      },
      axis: {
        x: {
          type: 'category'
        }
      },
      legend: {
        show: false
      }
    });
  };
  var ShowSumMonth = function(msg) {
    var resObj = JSON.parse(msg);
    var chart = c3.generate({
      bindto: '#SumMonthChart',
      data: {
        json: resObj,
        keys: {
          x: 'DateF',
          value: ['Osum']
        }
      },
      axis: {
        x: {
          type: 'category'
        }
      },
      legend: {
        show: false
      }
    });
  };
  var ShowCatgoryNum = function(msg) {
    var resObj = JSON.parse(msg);
    var data = {};
    var num = [];
    resObj.forEach(function(e) {
      num.push(e.Category);
      data[e.Category] = e.Cnum;
    })
    var chart = c3.generate({
      bindto: '#categoryNumChart',
      data: {
        json: [data],
        keys: {
          value: num
        },
        type: 'pie',
      }
    });
  };
  $('#reportNumSubmit').click(function() {
    var data = {
      Date_start: $('#reportNumDate_start').val(),
      Date_end: $('#reportNumDate_end').val()
    }
    Post('/admin/api/reportDateSumDay', data, ShowSumDay);
    Post('/admin/api/reportDateSumWeek', data, ShowSumWeek);
    Post('/admin/api/reportDateSumMonth', data, ShowSumMonth);
  })
});