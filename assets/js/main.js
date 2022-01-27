// 

$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});

let dataArray = [];
let pageArray = [];
let pageNumber = 0;
let pageLimitNumber = 0;
let dataNumber = 0;



$(document).ready(function(){

  $('li').click(function () {
    menu.classList.toggle("toggle-class")
    hamburger.classList.remove("is-active")
  });

var hamburger = document.querySelector(".hamburger");
    var menu = document.querySelector(".menu");
    var employeemodal = document.querySelector('#addEmployeeModal');
    var delemployeemodal = document.querySelector('#delEmployeeModal');
    // On click
    hamburger.addEventListener("click", function () {
        // Toggle class "is-active"
        hamburger.classList.toggle("is-active");
        // Do something else, like open/close menu
        menu.classList.toggle("toggle-class")
        employeemodal.style.display = ("none");
        delemployeemodal.style.display = ("none");
    });





  // Show all
  $.ajax({
  url: 'assets/php/getAll.php',
  success: function(item){
    dataArray = [];
    pageArray = [];
    pageNumber = 0;
    pageLimitNumber = 0;
    dataNumber = 0;

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
        let departmentName ="";
          $.ajax({
          url: 'assets/php/getDepartmentByID.php',
          method: 'POST',
          data: {'id': item.departmentID},
          success: function(returnedItem){
            departmentName = returnedItem.data[0].name;
            $('#result').append(`
              <div class="card">
                <div class="info">
                  <h3>${item.firstName} ${item.lastName}</h3>
                  <h4>${item.email}</h4>
                  <h4>${departmentName}</h4>
                  <h4>${item.name}</h4>
                </div>
              </div>
            `)
          }
        })
        console.log(departmentName);

        $('#pageNumber').html(`
        page: ${pageNumber + 1} of ${pageLimitNumber}
        `)
        if(pageNumber == 0){
          $('.fa-chevron-circle-left').css('visibility', 'hidden');
        }
        else{
          $('.fa-chevron-circle-left').css('visibility', 'visible');
        }
        if(pageNumber == pageLimitNumber -1){
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

    // $('.menu-btn-box').click(function(){
    //   $('.functionality').toggle('is-active');
    // })
  }
})

    
    $('#showAll').click(function(){
      $.ajax({
        url: 'assets/php/getAll.php',
        success: function(item){
          dataArray = [];
          pageArray = [];
          pageNumberShow = 0;
          pageLimitNumber = 0;
          dataNumber = 0;

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

          $('#pageNavigation').html(`
          <div id="pageNavigation">
            <div id="pageNumber"></div>
            <i class="fas fa-chevron-circle-left showall-left"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-chevron-circle-right showall-right"></i>
          </div>
          `)


          function resultPageShowAll(num){
            $('#result').html(``);
            pageLimit(dataNumber);
            dataArray[num].forEach(function(item){
              let departmentName ="";
              $.ajax({
              url: 'assets/php/getDepartmentByID.php',
              method: 'POST',
              data: {'id': item.departmentID},
              success: function(returnedItem){
                departmentName = returnedItem.data[0].name;
                $('#result').append(`
                  <div class="card">
                    <div class="info">
                      <h3>${item.firstName} ${item.lastName}</h3>
                      <h4>${item.email}</h4>
                      <h4>${departmentName}</h4>
                      <h4>${item.name}</h4>
                    </div>
                  </div>
                `)
              }
              })
              $('#pageNumber').html(`
              page: ${pageNumberShow + 1} of ${pageLimitNumber}
              `)
              if(pageNumberShow == 0){
                $('.showall-left').css('visibility', 'hidden');
              }
              else{
                $('.showall-left').css('visibility', 'visible');
              }
              if(pageNumberShow == pageLimitNumber -1){
                $('.showall-right').css('visibility', 'hidden');
              }
              else{
                $('.showall-right').css('visibility', 'visible');
              }
            })
          };
          
          resultPageShowAll(pageNumberShow);
          $('.showall-left').click(function(){
            pageNumberShow -= 1;
            resultPageShowAll(pageNumberShow);
          })
          $('.showall-right').click(function(){
            pageNumberShow += 1;
            resultPageShowAll(pageNumberShow);
          })

        }
      })
    });


    // Show all deparments
    $('#showDepartments').click(function(){
      $('#result').html(``);
      dataArray = [];
      pageArray = [];
      pageNumberDept = 0;
      pageLimitNumber = 0;
      dataNumber = 0;
      $.ajax({
        url: 'assets/php/getAllDepartments.php',
        success: function(item){
          let data = item.data;
          let dataNumberDept = data.length;
          for (let i = 0; i <= dataNumberDept - 1; i++){
            if (i % 6 != 0 || i ==0 ){
              pageArray.push(data[i]);
              if(i == dataNumberDept -1){
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


            $('#pageNavigation').html(`
              <div id="pageNavigation">
                <div id="pageNumber"></div>
                <i class="fas fa-chevron-circle-left dept-left"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fas fa-chevron-circle-right dept-right"></i>
              </div>
              `)

          pageLimit(dataNumberDept);
          function resultPageAllDepartment(num){
            $('#result').html(``);
            pageLimit(dataNumberDept);
            dataArray[num].forEach(function(item){
              $('#result').append(`
              <div class="card">
                <div class="info">
                  <h3>${item.name}</h3>
                </div>
              </div>
              `)
              $('#pageNumber').html(`
              page: ${pageNumberDept + 1} of ${pageLimitNumber}
              `)
              if(pageNumberDept == 0){
                $('.dept-left').css('visibility', 'hidden');
              }
              else{
                $('.dept-left').css('visibility', 'visible');
              }
              if(pageNumberDept == pageLimitNumber -1){
                $('.dept-right').css('visibility', 'hidden');
              }
              else{
                $('.dept-right').css('visibility', 'visible');
              }
            })

          }
          resultPageAllDepartment(pageNumberDept);
          $('.dept-left').click(function(){
            pageNumberDept -= 1;
            resultPageAllDepartment(pageNumberDept);
          })
          $('.dept-right').click(function(){
            pageNumberDept +=1;
            resultPageAllDepartment(pageNumberDept);
          })
        }
        
      })
    })


    // Show all Locations
    $('#showLocations').click(function(){
      $('#result').html(``);
      dataArray = [];
      pageArray = [];
      pageNumberLocation = 0;
      pageLimitNumber = 0;
      dataNumber = 0;   
      $.ajax({
        url: 'assets/php/getAllLocations.php',
        success: function(item){
          let data = item.data;
          let dataNumberLocation = data.length;
          for(let i = 0; i<=dataNumberLocation - 1; i++){
            if(i % 6 !=0 || i== 0){
              pageArray.push(data[i]);
              if(i == dataNumberLocation -1){
                dataArray.push(pageArray);
                pageArray = [];
              }
            }else{
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

              $('#pageNavigation').html(`
              <div id="pageNavigation">
                <div id="pageNumber"></div>
                <i class="fas fa-chevron-circle-left location-left"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fas fa-chevron-circle-right location-right"></i>
              </div>
              `)


          function resultPageAllLocation(num){
            $('#result').html(``);
            pageLimit(dataNumberLocation);    
            dataArray[num].forEach(function(item){
              $('#result').append(`
              <div class="card">
                <div class="info">
                  <h3>${item.name}</h3>
                </div>
              </div>
              `)              
            })  
            
            $('#pageNumber').html(`
            page: ${pageNumberLocation + 1} of ${pageLimitNumber}
            `)
            if(pageNumberLocation == 0){
              $('.location-left').css('visibility', 'hidden');
            }
            else{
              $('.location-left').css('visibility', 'visible');
            }
            if(pageNumberLocation == pageLimitNumber -1){
              $('.location-right').css('visibility', 'hidden');
            }
            else{
              $('.location-right').css('visibility', 'visible');
            } 
            if(pageLimitNumber == 0){
              $('.location-left').css('visibility', 'hidden');
              $('.location-right').css('visibility', 'hidden');
            }

          }

          resultPageAllLocation(pageNumberLocation);
          $('.location-left').click(function(){
            pageNumberLocation -= 1;
            resultPageAllLocation(pageNumberLocation);
          })
          $('.location-right').click(function(){
            pageNumberLocation += 1;
            resultPageAllLocation(pageNumberLocation);
          })
        }
      })
    })
    // Add new Employee
    $('#addEmployee').click(function(){
      $('#addEmployeeModal').css('visibility','visible');
      $.ajax({
        url: 'assets/php/getAllDepartments.php',
        success: function(item){
          let data = item.data;
          $('#addEmployeeInputsDept').html('');
          $('#addEmployeeInputsDept').append(`
            <select name="addDept" id="addDept" required>
          `)
          for(let i = 0; i< data.length; i++){
            $('#addDept').append(`
              <option value=${data[i]['id']}>${data[i]['name']}</option>
            `)
          }
          $('#addEmployeeInputsDept').append(`
            </select><br>
          `)
        }
      })
      $.ajax({
        url: 'assets/php/getAllLocations.php',
        success: function(item){
          let data = item.data;
          $('#addEmployeeInputsLocate').html('');
          $('#addEmployeeInputsLocate').append(`
            
            <select name="addLocate" id="addLocate" required>
          `)
          for(let i = 0; i< data.length; i++){
            $('#addLocate').append(`
              <option value=${data[i]['name']}>${data[i]['name']}</option>
            `)
          }
          $('#addEmployeeInputsLocate').append(`
            </select><br>
          `)
        }
      })
      $('#addEmployeeModal').css('right','2vw');
      $('#addEmployeeModal').css('display', 'grid');
      $('#addEmployeeClose').click(function(){
        $('#addEmployeeModal').css('right','-200vw');
      })
         // Close modal when pressing close button
      $( "#addEmployeeClose").click(function() {
         $('#addEmployeeModal').css('display', 'none');
    });
      $( "#delEmployeeClose").click(function() {
         $('#delEmployeeModal').css('display', 'none');
    });
    let validOrNot = 0;
    // Fix loop increase by 1

      // Check if all field is entered
      $('#addEmployeeSave').click(function(){
        let fName = $('#addFName').val();
        let lName = $('#addLName').val();
        let email = $('#addEmail').val();
        // let dept = $('#addDept').val();
        // let locate = $('#addLocate').val();
        let addEmployeeArray = [fName, lName, email];
        let addEmployeeArrayLength = addEmployeeArray.length;
        validOrNot = 0;
        addEmployeeArray.forEach(function(item){
          if(item == email){
            if((item.search('@') > 0) && (item.search('.com') > 0)){
              validOrNot += 1;
            }
          }else{
            if(item != ""){
              validOrNot += 1;
            }else{
              validOrNot -= 1;
            }
          }
        })
        if(validOrNot != addEmployeeArrayLength){
          alert('Please Enter All Fields');
        }else{
          $.ajax({
            url: 'assets/php/addEmployee.php',
            method: 'POST',
            data: {
              'fName' : fName,
              'lName' : lName,
              'email' : email
            },
            success: function(item){
              console.log(item);
              break;
            }
          })
        }
        validOrNot = 0;
      })
      $('#addEmployeeclear').click(function(){
        $('#addFName').val('');
        $('#addLName').val('');
        $('#addEmail').val('');
      })
    })
    // Delete Employee
    $('#delEmployee').click(function() {
      $('#delEmployeeModal').css('visibility','visible');
      $('#delEmployeeModal').css('right','2vw');
      $('#delEmployeeModal').css('display', 'grid');
      $('#delEmployeeClose').click(function(){
      $('#delEmployeeModal').css('right','-200vw');
      })
    })

    $('#delEmployeeSave').click(function(){
        let fName = $('#delFName').val();
        let lName = $('#delLName').val();
        $.ajax({
          url: 'assets/php/deleteEmployee.php',
          method: 'POST',
          data: {
            'fName' : fName,
            'lName' : lName
          },
          success: function(item){
            console.log(`Succesfully delete ${fName} ${lName} from Company Directory`);
          }
        })
      })
    $('#delEmployeeclear').click(function(){
      $('#delFName').val('');
      $('#delLName').val('');
    })
    // Search Employee
    $('#submit').click(function(){
      let searchParams = $('#search').val();
      let searchParamsArray = searchParams.split(" ");
      let searchParamsFName;
      let searchParamsLName;
        if(searchParamsArray.length > 1){
          searchParamsFName = searchParamsArray[0];
          searchParamsFName = searchParamsFName.charAt(0).toUpperCase() + searchParamsFName.slice(1);
          searchParamsLName = searchParamsArray[1];
          searchParamsLName = searchParamsLName.charAt(0).toUpperCase() + searchParamsLName.slice(1);
          $.ajax({
            url: 'assets/php/getPersonnelByID.php',
            method : 'POST',
            data: {
              'fName' : searchParamsFName,
              'lName' : searchParamsLName
          },
          success: function(item){
            let dataPersonnel = item.data.personnel[0];
            let dataDepartment = item.data.department;
            let dataDepartmentID = dataPersonnel.departmentID -1;
            let dataLocationID = dataDepartment[dataDepartmentID].locationID;
            
            $.ajax({
              url: 'assets/php/getLocationByID.php',
              method: 'POST',
              data: {'id': dataLocationID},
              success: function(item){
                let dataLocation = item.data[0].name
                if(dataPersonnel){
                  $('#result').html(`
                    <div class="card">
                      <div class="info">
                        <h3>${dataPersonnel.firstName} ${dataPersonnel.lastName}</h3>
                        <h4>${dataPersonnel.email}</h4>
                        <h4>${dataDepartment[dataDepartmentID].name}</h4>
                        <h4>${dataLocation}</h4>
                      </div>
                    </div>
                    `)
                }else{
                  $('#result').html(`
                  <h4>${searchParamsFName} ${searchParamsLName} does not exist in the Company Directory</h4>
                  `)
                }
            }
          })
          
        }
          })
        }else{
          $('#result').html(`
          <h4 class="result-err">
            <div>
                <span class="not-found">NOT FOUND</span>
            </div>
          Please enter the correct full name*</h4>
          `)
        }

    })
  }
)

