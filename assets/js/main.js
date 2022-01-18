
$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});

let dataArray = [];
let pageArray = [];
$(document).ready(function(){
  // Show all
  $.ajax({
  url: 'assets/php/getAll.php',
  success: function(item){
    let pageNumber = 0;
    let pageLimitNumber = 0;
    let dataNumber = 0;

    let data = item.data;
    dataNumber = data.length;
    for (let i = 0; i <= data.length - 1; i++){
      if (i % 6 != 0 || i ==0){
        pageArray.push(data[i]);
        if(i == dataNumber -1){
          dataArray.push(pageArray);
          pageArray = [];
        }
      }
      else{
        dataArray.push(pageArray);
        pageArray = [];
        pageArray.push(data[i]);
      }
    }

    
    function pageLimit(num){
      pageLimitNumber = num / 6;
      if(!Number.isInteger(pageLimitNumber)){
        pageLimitNumber += 1;
        pageLimitNumber = parseInt(pageLimitNumber);
      }
    }

    function resultPageShowAll(num){
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
        page: ${pageNumber + 1} of ${pageLimitNumber}
        `)
        if(pageNumber == 0){
          console.log('page number is 1')
          $('.fa-chevron-circle-left').css('visibility', 'hidden');
        }
        else{
          $('.fa-chevron-circle-left').css('visibility', 'visible');
        }
        if(pageNumber == pageLimitNumber -1){
          console.log(`page number is ${pageLimitNumber}`)
          $('.fa-chevron-circle-right').css('visibility', 'hidden');
        }
        else{
          $('.fa-chevron-circle-right').css('visibility', 'visible');
        }
      })
    };
    
    resultPageShowAll(pageNumber);
    $('.fa-chevron-circle-left').click(function(){
      pageNumber -= 1;
      resultPageShowAll(pageNumber);
    })
    $('.fa-chevron-circle-right').click(function(){
      pageNumber += 1;
      resultPageShowAll(pageNumber);
    })

    $('.menu-btn-box').click(function(){
      $('.functionality').toggle('is-active');
    })

    
    $('#showAll').click(function(){
      pageNumber = 0;
      resultPageShowAll(pageNumber);
      $('.functionality').toggle('is-active');
    });


    // Show all deparments
    $('#showDepartments').click(function(){
      $('#result').html(``);
      $('.functionality').toggle('is-active');
      let pageArrayDept = [];
      let dataArrayDepartment = [];
      let pageNumberDept = 0;
      let pageNumberLimitDept = 0;
      $.ajax({
        url: 'assets/php/getAllDepartments.php',
        success: function(item){
          let data = item.data;
          let dataNumberDept = data.length;
          for(let i=0; i <=dataNumberDept -1; i++){
            if(i % 6 !=0 || i ==0){
              pageArrayDept.push(data[i]);
              if(i == dataNumberDept - 1){
                dataArrayDepartment.push(pageArrayDept);
                pageArrayDept = [];
              }
            }else{
              dataArrayDepartment.push(pageArrayDept);
              pageArrayDept = [];
              pageArrayDept.push(data[i]);
            }
          }
          // Add pagelimit function outside of ready 

          function pageLimit(num){
            pageNumberLimitDept = num / 6;
            if(!Number.isInteger(pageLimitNumber)){
              pageNumberLimitDept += 1;
              pageNumberLimitDept = parseInt(pageNumberLimitDept);
            }
          }
          function resultPageAllDepartment(num){
            $('#result').html(``);
            pageLimit(dataNumberDept);
            dataArrayDepartment[num].forEach(function(item){
              $('#result').append(`
              <div class="card">
                <div class="info">
                  <h3>${item.name}</h3>
                </div>
              </div>
              `)
              $('#pageNumber').html(`
              page: ${pageNumberDept + 1} of ${pageNumberLimitDept}
              `)
              if(pageNumberDept == 0){
                $('.fa-chevron-circle-left').css('visibility', 'hidden');
              }
              else{
                $('.fa-chevron-circle-left').css('visibility', 'visible');
              }
              if(pageNumberDept == pageNumberLimitDept -1){
                $('.fa-chevron-circle-right').css('visibility', 'hidden');
              }
              else{
                $('.fa-chevron-circle-right').css('visibility', 'visible');
              }
            })
          }
          resultPageAllDepartment(pageNumberDept);
          $('.fa-chevron-circle-left').click(function(){
            pageNumberDept -= 1;
            resultPageAllDepartment(pageNumberDept);
          })
          $('.fa-chevron-circle-right').click(function(){
            pageNumberDept += 1;
            resultPageAllDepartment(pageNumberDept);
          })
        }
      })
    })


    // Show all Locations
    $('#showLocations').click(function(){
      $('#result').html(``);
      $('.functionality').toggle('is-active');
      let pageArrayLocation = [];
      let dataArrayLocation = [];
      let pageNumberLocation = 0;
      let pageNumberLimitLocation = 0;     
      $.ajax({
        url: 'assets/php/getAllLocations.php',
        success: function(item){
          let data = item.data;
          let dataNumberLocation = data.length;
          for(let i = 0; i<=dataNumberLocation - 1; i++){
            if(i % 6 !=0 || i== 0){
              pageArrayLocation.push(data[i]);
              if(i == dataNumberLocation -1){
                dataArrayLocation.push(pageArrayLocation);
                pageArrayLocation = [];
              }
            }else{
              dataArrayLocation.push(pageArrayLocation);
              pageArrayLocation = [];
              pageArrayLocation.push(data[i]);
            }
          }
            function pageLimit(num){
              pageNumberLimitLocation = num / 6;
              if(!Number.isInteger(pageNumberLimitLocation)){
                pageNumberLimitLocation += 1;
                pageNumberLimitLocation = parseInt(pageNumberLimitLocation);
            }
          }
          function resultPageAllLocation(num){
            $('#result').html(``);
            pageLimit(dataNumberLocation);    
            dataArrayLocation[num].forEach(function(item){
              $('#result').append(`
              <div class="card">
                <div class="info">
                  <h3>${item.name}</h3>
                </div>
              </div>
              `)              
            })  
            $('#pageNumber').html(`
            page: ${pageNumberLocation + 1} of ${pageNumberLimitLocation}
            `)
            if(pageNumberLimitLocation == 0){
              $('.fa-chevron-circle-left').css('visibility', 'hidden');
            }
            else{
              $('.fa-chevron-circle-left').css('visibility', 'visible');
            }
            if(pageNumberLimitLocation == pageNumberLimitLocation -1){
              $('.fa-chevron-circle-right').css('visibility', 'hidden');
            }
            else{
              $('.fa-chevron-circle-right').css('visibility', 'visible');
            } 
            if(pageNumberLocation == 0){
              $('.fa-chevron-circle-left').css('visibility', 'hidden');
              $('.fa-chevron-circle-right').css('visibility', 'hidden');
            }

          }
          resultPageAllLocation(pageNumberLocation);
          $('.fa-chevron-circle-left').click(function(){
            pageNumberLocation -= 1;
            resultPageAllLocation(pageNumberLocation);
          })
          $('.fa-chevron-circle-right').click(function(){
            pageNumberLocation += 1;
            resultPageAllLocation(pageNumberLocation);
          })
        }
      })
    })
  }
})
})





console.log('oh22');