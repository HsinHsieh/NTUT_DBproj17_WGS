// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var ProductNum = function(msg) {
    var resObj = JSON.parse(msg);
    $(".stat_product").html(resObj[0].Pnum);
  }
  var OrderNum = function(msg) {
    var resObj = JSON.parse(msg);
    $(".stat_order").html(resObj[0].Onum);
  }
  var CategoryNum = function(msg) {
    var resObj = JSON.parse(msg);
    $(".stat_category").html(resObj[0].CAnum);
  }
  var ShowCategoryChart = function(msg) {
    var resObj = JSON.parse(msg);
    var category = resObj.map(function(a) {
      return a.category + " " + a.Category_Name;
    });
    var categoryNum = resObj.map(function(a) {
      return a.CNum;
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      // The data for our dataset
      data: {
        labels: category,
        datasets: [{
          label: "商品數量",
          backgroundColor: ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          data: categoryNum,
        }]
      },

      // Configuration options go here
      options: {}
    });

  }
  Get('/admin/api//mainProductCategory', ShowCategoryChart);
  Get('/admin/api/mainProductNum', ProductNum);
  Get('/admin/api/mainOrderNum', OrderNum);
  Get('/admin/api/mainCategoryNum', CategoryNum);
});