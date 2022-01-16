
$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});

let pageNumber = 0;
let pageLimitNumber = 0;
let dataNumber = 0;
$(document).ready(function(){
  $.ajax({
  url: 'assets/php/getAll.php',
  success: function(item){
    console.log(item)
    let dataArray = [];
    let pageArray = [];
    dataNumber = item.length;
    console.log(`datanumber = ${dataNumber}`)
    for (let i = 0; i <= item.length - 1; i++){
      if (i % 6 != 0 || i ==0){
        pageArray.push(item[i]);
        console.log(`the i = ${JSON.stringify(item[i])}`)
        if(i == dataNumber -1){
          dataArray.push(pageArray);
          pageArray = [];
        }
      }
      // From 97 to 100 id is not displayed. pagearray is not being pushed to dataarray
      else{
        dataArray.push(pageArray);
        pageArray = [];
        pageArray.push(item[i]);
      }
    }
    console.log(dataArray)
    
    function pageLimit(num){
      pageLimitNumber = num / 6;
      if(!Number.isInteger(pageLimitNumber)){
        pageLimitNumber += 1;
        pageLimitNumber = parseInt(pageLimitNumber);
      }
    }

    function resultPage(num){
      $('#result').html(``);
      pageLimit(dataNumber);
      dataArray[num].forEach(function(item){
        $('#result').append(`
        <div class="card">
          <div class="info">
            <h3>${item.firstName} ${item.lastName}</h3>
            <h4>${item.email}</h4>
            <h4>${item.name}</h4>
            <h4>${item.departmentID}</h4>
          </div>
        </div>
        `)
        $('#pageNumber').html(`
        page: ${pageNumber + 1} / ${pageLimitNumber}
        `)
      })
    };

    resultPage(pageNumber);
    $('.fa-chevron-circle-left').click(function(){
      pageNumber -= 1;
      resultPage(pageNumber);
    })
    $('.fa-chevron-circle-right').click(function(){
      pageNumber += 1;
      resultPage(pageNumber);
    })
    if(pageNumber == 1){
        $('.fa-chevron-circle-left').css('visibility', 'hidden');
      }
    if(pageNumber == pageLimitNumber){
      $('.fa-chevron-circle-right').css('visibility', 'hidden');
    }
  }
})
})








console.log("yay2222")
