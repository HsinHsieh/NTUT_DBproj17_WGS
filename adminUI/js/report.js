// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var ShowCategoryChart = function(msg) {
    var resObj = JSON.parse(msg);
    var category = resObj.map(function(a) {
      return a.Category + " " + a.Category_Name;
    });
    var categoryNum = resObj.map(function(a) {
      return a.Onum;
    });
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'doughnut',
      // The data for our dataset
      data: {
        labels: category,
        datasets: [{
          label: "銷售數量",
          backgroundColor: ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(80, 162, 235, 1)',
            'rgba(255, 57, 86, 1)',
            'rgba(75, 89, 192, 1)',
            'rgba(153, 152, 255, 1)'
          ],
          indexLabelFontSize: 16,
          indexLabel: "{Category}",
          data: categoryNum,
        }]
      },

      // Configuration options go here
      options: {}
    });

  }
  var productT10Row = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    //$("#productSearch_catagory").reset();
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "<tr><th>" + (i + 1) + "</th><td>" + resObj[i].Product_Name + "</td><td>" + resObj[i].Snum + "</td></tr>";
    }
    $(".productT10_list").html(resStr);
  }
  Get('/admin/api/reportSaleCategory', ShowCategoryChart);
  Get('/admin/api/reportT10product', productT10Row);
});