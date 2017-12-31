$(document).ready(function() {
  $('#reportNumDate_start').val('2017-12-01');
  $('#reportNumDate_end').val('2017-12-31');
  var ShowProductNum = function(msg) {
    var resObj = JSON.parse(msg);
    var psum = resObj.map(function(a) {
      return a.Psum;
    });
    var pname = resObj.map(function(a) {
      return a.Product_Name;
    });
    var chart = c3.generate({
      bindto: '#productNumChart',
      data: {
        json: resObj,
        keys: {
          x: 'Product_Name',
          value: ['Pnum']
        },
        type: 'bar'
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
  var ShowGenderNum = function(msg) {
    var resObj = JSON.parse(msg);
    var data = {};
    var num = [];
    resObj.forEach(function(e) {
      var g = (e.Gender == 0) ? "女" : (e.Gender == 1) ? "男" : "都不是";
      num.push(g);
      data[g] = e.Gnum;
    })
    var chart = c3.generate({
      bindto: '#genderNumChart',
      data: {
        json: [data],
        keys: {
          value: num
        },
        type: 'pie',
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
    Post('/admin/api/reportProductNum', data, ShowProductNum);
    Post('/admin/api/reportCategoryNum', data, ShowCatgoryNum);
    Post('/admin/api/reportGenderNum', data, ShowGenderNum);
  })
});