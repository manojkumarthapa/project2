// 

$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});


$(document).ready(function(){
  $('li').click(function () {
    menu.classList.toggle("toggle-class")
    hamburger.classList.remove("is-active")
    main.classList.remove("result-padding")
    main.classList.remove("mobile-padding")
    main.classList.remove("medium-padding")
     main.classList.remove("large-padding")
  });

var hamburger = document.querySelector(".hamburger");
    var menu = document.querySelector(".menu");
    var main = document.getElementsByTagName('main')[0];
    // On click
    hamburger.addEventListener("click", function () {
        // Toggle class "is-active"
        hamburger.classList.toggle("is-active");
        // Do something else, like open/close menu
        menu.classList.toggle("toggle-class")
        main.classList.toggle('result-padding');

        if (window.matchMedia("(min-width: 580px)").matches) {
            main.classList.toggle('mobile-padding');
        } 
        if (window.matchMedia("(max-width: 580px)").matches) {
            main.classList.toggle('mobile-padding');
        } 
         if (window.matchMedia("(max-width: 768px)").matches) {
            main.classList.toggle('result-padding');
        } 
         if (window.matchMedia("(min-width: 768px)").matches) {
            main.classList.toggle('medium-padding');
        } 
        if (window.matchMedia("(max-width: 1200px)").matches) {
            main.classList.toggle('result-padding');
        } 
        if (window.matchMedia("(min-width: 1800px)").matches) {
            main.classList.toggle('large-padding');
        } 
      });
$(window).scroll(function(){
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $('#backToTop').css('display', 'block');
  } else {
    $('#backToTop').css('display', 'none');
  }
})
$('#backToTop').click(function(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
   

  // At load show all
  
  $.ajax({
  url: 'assets/php/getAll.php',
  success: function(item){
    $('#result').html('');
    $('#showAllDeparment').html('');
    $('#showAllLocations').html('');
    $('#add >img').css('display', 'none');
    $('#addEmployee').css('display', 'block');
    let data = item.data;
    let currentId = 0;
    data.forEach(function(item){
      $('#result').append(`
      <div class="card">
        <div class="info">
          <div class= "fontAwesome">
          <i class="fas fa-user-alt"></i>
          <i class="fas fa-envelope"></i>
          <i class="fas fa-building"></i>
          <i class="fas fa-globe-americas"></i>
          </div>
          <div>
            <h3 id="fullName${currentId}">${item.lastName}, ${item.firstName}</h3>
            <h4 id="email${currentId}">${item.email}</h4>
            <h4 id="department${currentId}">${item.departmentName}</h4>
            <h4 id="location${currentId}">${item.locationName}</h4>
          </div>
          <div>
          </div>
          <div class=showAllFunctions>
            <button class= 'edit' id='edit${currentId}'>Edit</button>
            <button class='delete' id='delete${currentId}'>Delete</button>
          </div>
        </div>
      </div>
      `)
      currentId += 1;
      $('#addEmployee').css('display', 'block');
    })
    let editId;

    $('.edit').click(function(){
      let fullName;
      let fullNameArray;
      Swal.fire({
      title: 'ENTER EMPLOYEE DETAILS',
      html:
      '<div id="showAllEdit">'+
      '<label for="showAllFname">First Name: </label>'+
      '<input type="text" name="showAllFname" id="showAllFname"><br>'+
      '<label for="showAllFname">Last Name: </label>'+
      '<input type="text" name="showAllLname" id="showAllLname"><br>'+
      '<label for="showAllFname">Email: </label>'+
      '<input type="email" name="showAllEmail" id="showAllEmail"><br>'+
      '<label for="showAllDeparment">Department: </label>'+
      '<select name="showAllDeparment" id="showAllDeparment">'
      ,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    },$.ajax({
        url: 'assets/php/getAllDepartments.php',
        success: function(departments){
          departments.data.forEach(function(item){
            $('#showAllDeparment').append(`
              <option value = '${item.id}'>${item.name}</option>
            `)
          })
        }
       })
      ,$('#showAllEdit').append(`
        </select><br>
        </div>
      `),
      editId = $(this).attr('id')
      ,editId = editId.slice(4)
      ,fullName = $(`#fullName${editId}`).text()
      ,fullNameArray = fullName.split(" ")
      ,thisFname = fullNameArray[1]
      ,thisLname = fullNameArray[0]
      ,thisLname = thisLname.slice(0,-1)
      ,thisEmail = $(`#email${editId}`).text()
      ,thisDept = $(`#department${editId}`).text()
      ,$.ajax({
        url: 'assets/php/searchDepartment.php',
        method: 'POST',
        data: {'oldName' : thisDept},
        success:function(item){
          let thisDeptID = item.data.personnel[0].id;
          $('#showAllFname').val(`${thisFname}`)
          $('#showAllLname').val(`${thisLname}`)
          $('#showAllEmail').val(`${thisEmail}`)
          $('#showAllDeparment').val(`${thisDeptID}`)
        }
      })
    ).then((result) => {
      let firstNameChange = $('#showAllFname').val();
      let lastNameChange = $('#showAllLname').val();
      let emailChange = $('#showAllEmail').val();
      let departmentIDChange = $('#showAllDeparment').val();
      console.log(fullNameArray)
      $.ajax({
        url: 'assets/php/searchEmployee.php',
        method: 'POST',
        data: {
          'fName': fullNameArray[1],
          'lName' : fullNameArray[0]
        },
        success: function(personnel){
          let data = personnel.data.personnel[0];
          let dataID = data.id;
          if(!firstNameChange){
            firstNameChange = data.firstName;
          }else if(!lastNameChange){
            lastNameChange = data.lastName;
          }else if(!emailChange){
            emailChange = data.email;
          }else if(!departmentIDChange){
            departmentIDChange = data.departmentID;
          }else{
          $.ajax({
            url: 'assets/php/updateEmployee.php',
            method: 'POST',
            data: {
              'firstName' : firstNameChange,
              'lastName' : lastNameChange,
              'email' : emailChange,
              'departmentID' : departmentIDChange,
              'id' : dataID
            }
          })
          }


          

        }
      })
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    })

    $('.delete').click(function(){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          editId = $(this).attr('id');
          editId = editId.slice(6);
          let fullName = $(`#fullName${editId}`).text();
          let fullNameArray = fullName.split(" ");  
          $.ajax({
            url: 'assets/php/deleteEmployee.php',
            method: 'POST',
            data: {
              'fName' : fullNameArray[1],
              'lName' : fullNameArray[0]
            }
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    })
  }
  })

  //  When user clicks show all
  $('#showAll').click(function(){
    $('#add >img').css('display', 'none');
    $('#addEmployee').css('display', 'block');
    $.ajax({
    url: 'assets/php/getAll.php',
    success: function(item){
      $('#result').html('');
      $('#showAllDeparment').html('');
      $('#showAllLocations').html('');
      let data = item.data;
      let currentId = 0;
      data.forEach(function(item){
      $('#result').append(`
      <div class="card">
        <div class="info">
          <div class= "fontAwesome">
          <i class="fas fa-user-alt"></i>
          <i class="fas fa-envelope"></i>
          <i class="fas fa-building"></i>
          <i class="fas fa-globe-americas"></i>
          </div>
          <div class="details">
            <h3 id="fullName${currentId}">${item.lastName}, ${item.firstName}</h3>
            <h4 id="email${currentId}">${item.email}</h4>
            <h4 id="department${currentId}">${item.departmentName}</h4>
            <h4 id="location${currentId}">${item.locationName}</h4>
          </div>
          <div>
          </div>
          <div class=showAllFunctions>
            <button class= 'edit' id='edit${currentId}'>Edit</button>
            <button class='delete' id='delete${currentId}'>Delete</button>
          </div>
        </div>
      </div>
      `)
        currentId += 1;
        $('#addEmployee').css('display', 'block');
      })
      let editId;

      $('.edit').click(function(){
        let fullName;
        let fullNameArray;
        Swal.fire({
        title: 'ENTER EMPLOYEE DETAILS',
        html:
        '<div id="showAllEdit">'+
        '<label for="showAllFname">First Name: </label>'+
        '<input type="text" name="showAllFname" id="showAllFname"><br>'+
        '<label for="showAllFname">Last Name: </label>'+
        '<input type="text" name="showAllLname" id="showAllLname"><br>'+
        '<label for="showAllFname">Email: </label>'+
        '<input type="email" name="showAllEmail" id="showAllEmail"><br>'+
        '<label for="showAllDeparment">Department: </label>'+
        '<select name="showAllDeparment" id="showAllDeparment">'
        ,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }
        ,$.ajax({
          url: 'assets/php/getAllDepartments.php',
          success: function(departments){
            departments.data.forEach(function(item){
              $('#showAllDeparment').append(`
                <option value = '${item.id}'>${item.name}</option>
              `)
            })
          }
        })
        ,$('#showAllEdit').append(`
          </select><br>
        `)
        ,editId = $(this).attr('id')
        ,editId = editId.slice(4)
        ,fullName = $(`#fullName${editId}`).text()
        ,fullNameArray = fullName.split(" ")
        ,thisFname = fullNameArray[1]
        ,thisLname = fullNameArray[0]
        ,thisLname = thisLname.slice(0,-1)
        ,thisEmail = $(`#email${editId}`).text()
        ,thisDept = $(`#department${editId}`).text()
        ,$.ajax({
          url: 'assets/php/searchDepartment.php',
          method: 'POST',
          data: {'oldName' : thisDept},
          success:function(item){
            let thisDeptID = item.data.personnel[0].id;
            $('#showAllFname').val(`${thisFname}`)
            $('#showAllLname').val(`${thisLname}`)
            $('#showAllEmail').val(`${thisEmail}`)
            $('#showAllDeparment').val(`${thisDeptID}`)
          }
        })
      ).then((result) => {
        let firstNameChange = $('#showAllFname').val();
        let lastNameChange = $('#showAllLname').val();
        let emailChange = $('#showAllEmail').val();
        let departmentIDChange = $('#showAllDeparment').val();
        console.log(fullNameArray)
        $.ajax({
          url: 'assets/php/searchEmployee.php',
          method: 'POST',
          data: {
            'fName': fullNameArray[1],
            'lName' : fullNameArray[0]
          },
          success: function(personnel){
            let data = personnel.data.personnel[0];
            let dataID = data.id;
            if(!firstNameChange){
              firstNameChange = data.firstName;
            }
            if(!lastNameChange){
              lastNameChange = data.lastName;
            }
            if(!emailChange){
              emailChange = data.email;
            }
            if(!departmentIDChange){
              departmentIDChange = data.departmentID;
            }
            $.ajax({
              url: 'assets/php/updateEmployee.php',
              method: 'POST',
              data: {
                'firstName' : firstNameChange,
                'lastName' : lastNameChange,
                'email' : emailChange,
                'departmentID' : departmentIDChange,
                'id' : dataID
              }
            })
          }
        })
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      })


      $('.delete').click(function(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            editId = $(this).attr('id');
            editId = editId.slice(6);
            let fullName = $(`#fullName${editId}`).text();
            let fullNameArray = fullName.split(" ");  
            $.ajax({
              url: 'assets/php/deleteEmployee.php',
              method: 'POST',
              data: {
                'fName' : fullNameArray[1],
                'lName' : fullNameArray[0]
              }
            })
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      })
    }
    })
  });


    // Show all deparments
  $('#showDepartments').click(function(){
    $('#result').html(``);
    $('#add >img').css('display', 'none');
    $('#addDepartment').css('display', 'block');
    let currentId = 0;
    $.ajax({
      url: 'assets/php/getAllDepartments.php',
      success: function(item){
        let data = item.data;
        data.forEach(function(department){
          $('#result').append(`
          <div class="card">
            <div class="info">
              <div class= "fontAwesome">
                <i class="fas fa-building"></i>
              </div>
              <div>
              <h3 id="departmentName${currentId}">${department.name}</h3>
              </div>
              <div>
              </div>
              <div class=showDepartmentFunctions>
                <button class= 'edit' id='departmentEdit${currentId}'>Edit</button>
                <button class='delete' id='departmentDelete${currentId}'>Delete</button>
              </div>
            </div>
          </div>
          `) 
          currentId +=1;  
          $('#addDepartment').css('display', 'block');    
        })
        // Add edit and delete sweet alert as well as on input value change to send to php to edit the datas
        $('.edit').click(function(){
          let deptEditId = $(this).attr('id')
          deptEditId = deptEditId.slice(14)
          let departmentValue = $(`#departmentName${deptEditId}`).text();
          let departmentValueID;
          let departmentLocationID;


          $.ajax({
            url: 'assets/php/getDepartmentByName.php',
            method: 'POST',
            data: {'name': departmentValue},
            success: function(item){
              departmentValueID = item.data[0].id;
              departmentLocationID = item.data[0].locationID;

              
              $.ajax({
                url: 'assets/php/checkDepartmentDepend.php',
                method: 'POST',
                data: {'id': departmentValueID},
                success: function(item){
                  let personnelCount = item.data.personnelCount[0].pc;

                  if(personnelCount > 0){
                    Swal.fire({
                      icon: 'warning',
                      title: 'Not authorized!',
                      text: `${departmentValue} is linked with employee details`
                    })
                  }else{
                    Swal.fire({
                      title: 'EDIT DEPARTMENT DETAILS',
                      html:
                        '<div id="departmentEdit">'+
                          '<label for="departmentName">Name: </label>'+
                          `<input type="text" name="departmentName" id="departmentName" value=${departmentValue}><br>` +
                          '<label for="showAllLocation">Location: </label>'+
                          '<select name="showAllLocation" id="showAllLocation">'
                      ,
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: 'Save',
                      denyButtonText: `Don't save`,
                    },$.ajax({
                      url: 'assets/php/getAllLocations.php',
                      success: function(locations){
                        locations.data.forEach(function(item){
                          $('#showAllLocation').append(`
                            <option value = '${item.id}'>${item.name}</option>
                          `)
                        })
                        $('#showAllLocation').val(departmentLocationID);
                      }
                      })
                    ).then((result)=>{
                      let deptNameChange = $('#departmentName').val();
                      let locationIDChange = $('#showAllLocation').val();
                      if(!deptNameChange){
                        Swal.fire('Department new name was not entered', '', 'error')
                      }
                      if (result.isConfirmed) {
                        $.ajax({
                          url: 'assets/php/updateDepartment.php',
                          method: 'POST',
                          data: {
                            'deptNameChange' : deptNameChange,
                            'locationIDChange' : locationIDChange,
                            'oldName' : departmentValue,
                          }
                        })
                        Swal.fire('Saved!', '', 'success')
                      } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                      }
                    })
                   
                  }
                }
              })

            }
          })

        })

        $('.delete').click(function(){

          let deptDeleteId = $(this).attr('id')
          deptDeleteId = deptDeleteId.slice(16)
          let departmentDeleteValue = $(`#departmentName${deptDeleteId}`).text();
          let departmentDeleteValueID;
          let departmentDeleteLocationID;


          $.ajax({
            url: 'assets/php/getDepartmentByName.php',
            method: 'POST',
            data: {'name': departmentDeleteValue},
            success: function(item){
              departmentDeleteValueID = item.data[0].id;
              departmentDeleteLocationID = item.data[0].locationID;
              $.ajax({
                url: 'assets/php/checkDepartmentDepend.php',
                method: 'POST',
                data: {'id': departmentDeleteValueID},
                success: function(item){
                  let personnelCount = item.data.personnelCount[0].pc;
                  if(personnelCount > 0){
                    Swal.fire({
                      icon: 'warning',
                      title: 'Not authorized!',
                      text: `${departmentDeleteValue} is linked with employee details`
                    })
                  }else{
                    Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log(departmentDeleteValue);
                      $.ajax({
                        url: 'assets/php/deleteDepartment.php',
                        method: 'POST',
                        data: {'deptName' : departmentDeleteValue}
                      })
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                  })
                  }
                }
              })
            }
          })
        })
      }      
    })
  })


    // Show all Locations
  $('#showLocations').click(function(){
    $('#result').html(``);
    $('#add >img').css('display', 'none');
    $('#addLocation').css('display', 'block');
    let currentId = 0;
    let locationEditId;
    $.ajax({
      url: 'assets/php/getAllLocations.php',
      success: function(item){   
        let data = item.data;     
        data.forEach(function(location){
        $('#result').append(`
        <div class="card">
          <div class="info">
            <div class= "fontAwesome">
              <i class="fas fa-globe-americas"></i>
            </div>
            <div>
            <h3 id=locationName${currentId}>${location.name}</h3>
            </div>
            <div></div>
            <div class=showDepartmentFunctions>
              <button class= 'edit' id='locationEdit${currentId}'>Edit</button>
              <button class='delete' id='locationDelete${currentId}'>Delete</button>
            </div>
          </div>
        </div>
        `) 
        currentId += 1;
        $('#addLocation').css('display', 'block'); 
        }) 



        $('.edit').click(function(){

        let locationEditId = $(this).attr('id');
        locationEditId = locationEditId.slice(12)
        let locationOldName = $(`#locationName${locationEditId}`).text();
        $.ajax({
          url: 'assets/php/getLocationByName.php',
          method: 'POST',
          data: {'name': locationOldName},
          success: function(item){
            let thisLocationID = item.data[0].id;
            $.ajax({
              url: 'assets/php/checkLocationDepend.php',
              method: 'POST',
              data: {'id': thisLocationID},
              success: function(item){
                let departmentCount = item.data.departmentCount[0].dc;
                if(departmentCount >0){
                  Swal.fire({
                      icon: 'warning',
                      title: 'Not authorized!',
                      text: `${locationOldName} is linked with department details`
                    })
                }else{  
                Swal.fire({
                title: 'EDIT Location DETAILS',
                html:
                  '<div id="locationEdit">'+
                    '<label for="locationName">New Name: </label>'+
                    `<input type="text" name="locationName" id="locationName" value='${locationOldName}'><br>`+
                  '</div>',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
                }).then((result)=>{
                  let locationNameChange = $('#locationName').val();
                  console.log(locationNameChange);
                  console.log(locationOldName);
                  if(result.isConfirmed){
                    if(locationNameChange){
                      $.ajax({
                        url: 'assets/php/updateLocation.php',
                        method: 'POST',
                        data: {
                          'locationNameChange' : locationNameChange,
                          'locationOldName' : locationOldName
                        }
                      })
                    }
                    if(!locationNameChange){
                      Swal.fire('Need to enter location name', '', 'error')
                    }
                    Swal.fire('Saved', '', 'success')
                  } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
                })
                }
              }
            })
          }
        })
                })
        
        


   


        $('.delete').click(function(){
          let locationDelete = $(this).attr('id');
          locationDelete = locationDelete.slice(14);
          let locationNameOld = $(`#locationName${locationDelete}`).text();
          $.ajax({
            url: 'assets/php/getLocationByName.php',
            method: 'POST',
            data:{'name' : locationNameOld},
            success: function(item){
              let locationDeleteID = item.data[0].id;
              $.ajax({
                url: 'assets/php/checkLocationDepend.php',
                method: 'POST',
                data: {'id' : locationDeleteID},
                success: function(item){
                  let locationDepend = item.data.departmentCount[0].dc;
                  if(locationDepend >0){
                    Swal.fire({
                      icon: 'warning',
                      title: 'Not authorized!',
                      text: `${locationNameOld} is linked with department details`
                    })
                  }else{
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result)=>{
                      if (result.isConfirmed) {
                      $.ajax({
                        url: 'assets/php/deleteLocation.php',
                        method: 'POST',
                        data: {'locationName' : locationNameOld}
                      })
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                    })
                  }
                }
              })
            }
          })
        })
      }
    })
  })
  // Add new Employee
  $('#add > #addEmployee').click(function(){

  Swal.fire({
    title: 'ENTER NEW EMPLOYEE DETAILS',
    html:
    '<div id="addEmployeeModal">'+
      '<div id="addEmployeeLabels">'+
        '<label for="addFName">First Name:&nbsp;&nbsp;&nbsp; </label>'+
        '<input type="text" name="addFName" id="addingFName" required><br>'+
        '<label for="addLName">Last Name:&nbsp;&nbsp;&nbsp; </label>'+
        '<input type="text" name="addLName" id="addingLName" required><br>'+
        '<label for="addEmail">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input type="email" name="addEmail" id="addingEmail" required><br>'+
        '<label for="addDept">Department: </label>'+
        '<select name="addDept" id="addingDept" required>'
    
    ,showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
  },
    $.ajax({
      url: 'assets/php/getAllDepartments.php',
      success: function(item){
        let data = item.data;
        for(let i = 0; i< data.length; i++){
          $('#addingDept').append(`
            <option class="deptOptions" value=${data[i]['id']}>${data[i]['name']}</option>
          `)
        }
        $('#addEmployeeModal').append(`
          </select>
          </div>
          </div>
        `)
      }
    })
    
  )
  .then((result) => {
    let fName = $('#addingFName').val()
    let lName = $('#addingLName').val()
    let email = $('#addingEmail').val()
    let dept = $('#addingDept').val()
    if (result.isConfirmed) {
      if((email.search('@') >= 0) && ((email.search('.') >= 0)) && (fName != "") &&  (lName !="") && (dept >= 0) ) {
        $.ajax({
          url: 'assets/php/addEmployee.php',
          method: 'POST',
          data: {
            'fName' : fName,
            'lName' : lName,
            'email' : email,
            'deptID' :dept
          }
        })
        Swal.fire(`${fName} ${lName} saved!`, '', 'success')
      }else if((fName == "") || (lName =="")){
        alert('Enter all required details')
      }else if((email.search('@') < 0) || (email.search('.') < 0)){
        alert('Enter email')
      }

      
    }else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }

  })
  })

    // Add new Department
    $('#addDepartment').click(async function(){
      let allLocations = []
      let allLocationsObj = {};
      $.ajax({
        url: 'assets/php/getAllLocations.php',
        success: async function(item){
          let data = item.data;
          data.forEach(function(item){
            allLocations.push(item);
          })
          console.log(allLocations);
          allLocations.forEach(function(key){
            console.log(key.name)
            allLocationsObj[key.name] = key.name;
          })
          let locationName = '';
          let newDepartmentName = '';
          const { value: location } = await Swal.fire({
          title: 'Department Info',
          html: '<label for="addDepartmentName">Name: </label>' +
          '<input type="text" id="addDepartmentName" name="addDepartmentName"><br>',
          input: 'select',
          inputOptions: allLocationsObj,
          inputPlaceholder: 'Select a location',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              newDepartmentName = $('#addDepartmentName').val();
              if(value){
                let departmentLocationName = value;
                console.log(departmentLocationName)
                if(newDepartmentName == ""){
                  resolve('Enter a name for new Department');
                }
                else if(newDepartmentName != ""){
                  $.ajax({
                    url: 'assets/php/getLocationID.php',
                    method: 'POST',
                    data: {'name' : departmentLocationName},
                    success: function(item){
                      let locationID = item.data[0].id;
                      $.ajax({
                        url: 'assets/php/addDepartment.php',
                        method: 'POST',
                        data: {
                          'deptName' : newDepartmentName,
                          'locationID' : locationID
                        }
                      })
                    }
                  })

                  resolve();
                }
              }else{
                resolve('You need to select location')
              }
              

            })
          }
        })

        }
      })
    })

    // Add new Location
    $('#addLocation').click(function(){
      Swal.fire({
      title: 'Enter new location name',
      html: 
      '<label for="addLocationName">Name: </label>' +
      '<input type="text" name="addLocationName" id="addLocationName">',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Save',
      denyButtonText: `cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          let locationName = $('#addLocationName').val();
          if(!locationName){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Enter location name to save',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            $.ajax({
              url: 'assets/php/addLocation.php',
              method: 'POST',
              data: {'locationName' : locationName},
              success: function(){
                Swal.fire(`${locationName} saved!`, '', 'success')
              }
            })
          }
        }else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    })


    // Search Employee
    $('#submit').click(function(){
      $('#add > img').css('display', 'none');
      console.log('submit')
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
            console.log(item)
            if(item.data.personnel.length > 0){
              let dataPersonnelDepartmentID = item.data.personnel[0].departmentID;
              let dataPersonnelEmail = item.data.personnel[0].email;
              $.ajax({
              url: 'assets/php/getDepartmentByID.php',
              method: 'POST',
              data: {'id' : dataPersonnelDepartmentID},
              success: function(item){
                if(item.data.length > 0){
                  let returnedDepartmentName = item.data[0].name;
                  let returnedLocationID = item.data[0].locationID;
                  $.ajax({
                    url: 'assets/php/getLocationByID.php',
                    method: 'POST',
                    data: {'id': returnedLocationID},
                    success: function(item){
                      let returnedLocationName = item.data[0].name;
                      if(item.data.length > 0){
                        $('#result').html(`
                        <div class="cardSearch">
                          <div class="info">
                            <div class= "fontAwesome">
                            <i class="fas fa-user-alt"></i>
                            <i class="fas fa-envelope"></i>
                            <i class="fas fa-building"></i>
                            <i class="fas fa-globe-americas"></i>
                            </div>
                            <div class="details">
                              <h3>${searchParamsLName} ${searchParamsFName}</h3>
                              <h4>${dataPersonnelEmail}</h4>
                              <h4>${returnedDepartmentName}</h4>
                              <h4>${returnedLocationName}</h4>          
                            </div>
                            <div>
                            </div>
                            <div class=showAllFunctions>
                              <button class= 'edit' id='edit${searchParamsFName}'>Edit</button>
                              <button class='delete' id='delete${searchParamsFName}'>Delete</button>
                            </div>
                          </div>
                        </div>
                        `)
                      }
                      console.log(item)
                      $(`#edit${searchParamsFName}`).click(function(){
                        let thisId;
                        Swal.fire({
                          title: 'ENTER EMPLOYEE DETAILS',
                          html:
                          '<div id="showAllEdit">'+
                          '<label for="showAllFname">First Name: </label>'+
                          `<input type="text" name="showAllFname" id="showAllFname" value="${searchParamsFName}"><br>`+
                          '<label for="showAllFname">Last Name: </label>'+
                          `<input type="text" name="showAllLname" id="showAllLname" value="${searchParamsLName}"><br>`+
                          '<label for="showAllFname">Email: </label>'+
                          '<input type="email" name="showAllEmail" id="showAllEmail"><br>'+
                          '<label for="showAllDeparment">Department: </label>'+
                          '<select name="showAllDeparment" id="showAllDeparment">'
                          ,
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Save',
                          denyButtonText: `Don't save`,
                        }
                          ,$.ajax({
                            url: 'assets/php/getAllDepartments.php',
                            success: function(departments){
                              departments.data.forEach(function(item){
                                $('#showAllDeparment').append(`
                                  <option value = '${item.id}'>${item.name}</option>
                                `)
                              })
                            }
                          })
                          ,$('#showAllEdit').append(`
                            </select><br>
                          `)

                          ,$.ajax({
                            url: 'assets/php/searchEmployee.php',
                            method: 'POST',
                            data: {
                              'fName': searchParamsFName,
                              'lName': searchParamsLName
                            },
                            success: function(item){
                              let data = item.data.personnel[0];
                              let searchEmail = data.email;
                              let searchDept = data.departmentID;
                              $('#showAllEmail').val(`${searchEmail}`)
                              $('#showAllDeparment').val(`${searchDept}`)
                              thisId = data.id;
                            }
                          })
                        ).then((result)=>{
                          if(result.isConfirmed){
                            console.log(thisId)
                            let thisSearchFName = $('#showAllFname').val();
                            let thisSearchLname = $('#showAllLname').val();
                            let thisSearchEmail = $('#showAllEmail').val();
                            let thisSeachDept = $('#showAllDeparment').val();
                            console.log(thisSearchFName)
                            console.log(thisSearchLname)
                            console.log(thisSearchEmail)
                            console.log(thisSeachDept)
                            if(($('#showAllFname').val()) && ($('#showAllLname').val()) && ($('#showAllEmail').val()) &&($('#showAllDeparment').val())){
                              $.ajax({
                                url: 'assets/php/updateEmployee.php', 
                                method: 'POST',
                                data: {
                                  'firstName' : thisSearchFName,
                                  'lastName' : thisSearchLname,
                                  'email' : thisSearchEmail,
                                  'departmentID' : thisSeachDept,
                                  'id' : thisId
                                }
                              })
                              Swal.fire(`${thisSearchFName} ${thisSearchLname} saved!`, '', 'success');
                            }
                          }
                          
                        })
                      })

                      $(`#delete${searchParamsFName}`).click(function(){
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            let deleteFname = searchParamsFName;
                            let deleteLname =  searchParamsLName;
                            // let fullName = $(`#fullName${editId}`).text();
                            // let fullNameArray = fullName.split(" ");  
                            $.ajax({
                              url: 'assets/php/deleteEmployee.php',
                              method: 'POST',
                              data: {
                                'fName' : deleteFname,
                                'lName' : deleteLname
                              }
                            })
                            Swal.fire(
                              'Deleted!',
                              `${deleteFname} ${deleteLname} has been deleted.`,
                              'success'
                            )
                          }
                        })
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
        }
          })
        }else{
          $('#result').html(`
          <h4 class="result-err">
            <img id="noDataImg" src="assets/images/noData.jpg" alt="no data" title="no data">
            <div>
                <span class="not-found">NOT FOUND</span>
            </div>
          Please enter the correct full name*</h4>
          `)
        }

    })


  }
)

console.log('lmaozzz')