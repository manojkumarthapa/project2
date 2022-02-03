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
  });

var hamburger = document.querySelector(".hamburger");
    var menu = document.querySelector(".menu");
    var employeemodal = document.querySelector('#addEmployeeModal');
    // On click
    hamburger.addEventListener("click", function () {
        // Toggle class "is-active"
        hamburger.classList.toggle("is-active");
        // Do something else, like open/close menu
        menu.classList.toggle("toggle-class")
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
    let data = item.data;
    let currentId = 0;
    data.forEach(function(item){
      $('#result').append(`
      <div class="card">
        <div class="info" >
          <h3 id="fullName${currentId}">${item.lastName} ${item.firstName}</h3>
          <h4>${item.email}</h4>
          <h4>${item.departmentName}</h4>
          <h4>${item.locationName}</h4>
        </div>
        <div class=showAllFunctions>
          <button class= 'edit' id='edit${currentId}'>Edit</button>
          <button class='delete' id='delete${currentId}'>Delete</button>
        </div>
      </div>
      `)
      currentId += 1;
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
        </div>
      `),
      editId = $(this).attr('id')
      ,editId = editId.slice(4)
      ,fullName = $(`#fullName${editId}`).text()
      ,console.log(fullName)
      ,fullNameArray = fullName.split(" ")
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
console.log('maamamazz')

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
          <div class="info" >
            <h3 id="fullName${currentId}">${item.lastName} ${item.firstName}</h3>
            <h4>${item.email}</h4>
            <h4>${item.departmentName}</h4>
            <h4>${item.locationName}</h4>
          </div>
          <div class=showAllFunctions>
            <button class= 'edit' id='edit${currentId}'>Edit</button>
            <button class='delete' id='delete${currentId}'>Delete</button>
          </div>
        </div>
        `)
        currentId += 1;
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
        `),
        editId = $(this).attr('id')
        ,editId = editId.slice(4)
        ,fullName = $(`#fullName${editId}`).text()
        ,console.log(fullName)
        ,fullNameArray = fullName.split(" ")
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
    $('#result').html(``);;
    let currentId = 0;
    let deptEditId;
    $.ajax({
      url: 'assets/php/getAllDepartments.php',
      success: function(item){
        let data = item.data;
        data.forEach(function(department){
          $('#result').append(`
          <div class="card">
            <div class="info">
              <h3 id="departmentName${currentId}">${department.name}</h3>
            </div>
            <div class=showDepartmentFunctions>
              <button class= 'edit' id='departmentEdit${currentId}'>Edit</button>
              <button class='delete' id='departmentDelete${currentId}'>Delete</button>
            </div>
          </div>
          `) 
          currentId +=1;      
        })
        // Add edit and delete sweet alert as well as on input value change to send to php to edit the datas
        $('.edit').click(function(){
          let deptOldName;
          Swal.fire({
          title: 'EDIT DEPARTMENT DETAILS',
          html:
            '<div id="departmentEdit">'+
              '<label for="departmentName">Name: </label>'+
              '<input type="text" name="departmentName" id="departmentName"><br>' +
              '<label for="showAllLocation">Location: </label>'+
              '<select name="showAllLocation" id="showAllLocation">'
          ,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        },
          $.ajax({
          url: 'assets/php/getAllLocations.php',
          success: function(locations){
            locations.data.forEach(function(item){
              $('#showAllLocation').append(`
                <option value = '${item.id}'>${item.name}</option>
              `)
            })
          }
          })
      ,$('#departmentEdit').append(`
        </select><br>
        </div>
      `),
      deptEditId = $(this).attr('id')
      ,deptEditId = deptEditId.slice(14)
      ,deptOldName = $(`#departmentName${deptEditId}`).text()
    ).then((result) => {
      let deptNameChange = $('#departmentName').val();
      let locationIDChange = $('#showAllLocation').val();
      console.log(deptOldName)
      $.ajax({
        url: 'assets/php/searchDepartment.php',
        method: 'POST',
        data: {
          'oldName': deptOldName
        },
        success: function(deptData){
          console.log(deptData)
          let data = deptData.data.personnel[0];
          let dataID = data.id;

          if(!deptNameChange){
            Swal.fire('Department new name was not entered', '', 'error')
          }else{
            $.ajax({
            url: 'assets/php/updateDepartment.php',
            method: 'POST',
            data: {
              'deptNameChange' : deptNameChange,
              'locationIDChange' : locationIDChange,
              'oldName' : deptOldName
            }
          })
          }
          if(!locationIDChange){
            locationIDChange = dataID;
          }
          // $.ajax({
          //   url: 'assets/php/updateDepartment.php',
          //   method: 'POST',
          //   data: {
          //     'deptNameChange' : deptNameChange,
          //     'locationIDChange' : locationIDChange,
          //     'oldName' : deptOldName
          //   }
          // })
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
              let departmentDelete = $(this).attr('id');
              departmentDelete = departmentDelete.slice(16);
              console.log(departmentDelete);
              let departmentDeleteText = $(`#departmentName${departmentDelete}`).text();
              console.log(departmentDeleteText)
              $.ajax({
                url: 'assets/php/deleteDepartment.php',
                method: 'POST',
                data: {'deptName' : departmentDeleteText}
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
  })


    // Show all Locations
  $('#showLocations').click(function(){
    $('#result').html(``);
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
            <h3 id=locationName${currentId}>${location.name}</h3>
          </div>
          <div class=showDepartmentFunctions>
            <button class= 'edit' id='locationEdit${currentId}'>Edit</button>
            <button class='delete' id='locationDelete${currentId}'>Delete</button>
          </div>
        </div>
        `) 
        currentId += 1;
        }) 

        $('.edit').click(function(){
          Swal.fire({
          title: 'EDIT Location DETAILS',
          html:
            '<div id="locationEdit">'+
              '<label for="locationName">New Name: </label>'+
              '<input type="text" name="locationName" id="locationName"><br>',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
          }
      ,$('#locationEdit').append(`
        </div>
      `),
      locationEditId = $(this).attr('id')
      ,locationEditId = locationEditId.slice(14)
      ,locationOldName = $(`#locationName${locationEditId}`).text()
    ).then((result) => {
      let locationNameChange = $('#locationName').val();
      $.ajax({
        url: 'assets/php/searchDepartment.php',
        method: 'POST',
        data: {
          'oldName': locationOldName
        },
        success: function(locationData){
          let data = locationData.data.personnel[0];
          if(!locationNameChange){
            Swal.fire('Location name was not saved', '', 'error')
          }
          $.ajax({
            url: 'assets/php/updateDepartment.php',
            method: 'POST',
            data: {
              'locationOldName' : locationOldName,
              'locationNameChange' : locationNameChange
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
              let locationDelete = $(this).attr('id');
              locationDelete = locationDelete.slice(14);
              let locationNameOld = $(`#locationName${locationDelete}`).text();
              console.log(locationNameOld)
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





        })
      }
    })
  })
  // Add new Employee
  $('#addEmployee').click(function(){
    console.log('fking adding22zzzzzzzzzzzzzzzzzzzzzzzzzzzz')


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
    // ,fName = $('#addFName').text()
    // ,lName = $('#addLName').text()
    // ,email = $('#addEmail').text()
    // ,dept = $('#addDept').text()
    
  ).then(()=>{
        let fName = $('#addingFName').val()
    let lName = $('#addingLName').val()
    let email = $('#addingEmail').val()
    let dept = $('#addingDept').val()
    console.log('fkmzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
      console.log(email);
      console.log(fName);
      console.log(lName);
      console.log(dept);
      
      if((email.search('@') >= 0) || ((email.search('.') >= 0)) || (fName != "") ||  (lName !="") || (dept >= 0) ) {
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
      }else if((fName == "") || (lName =="")){
        alert('Enter all required details')
      }else if((email.search('@') < 0) || (email.search('.') < 0)){
        alert('Enter email')
      }

  })
  .then((result) => {
    
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
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
          }
          $.ajax({
            url: 'assets/php/addLocation.php',
            method: 'POST',
            data: {'locationName' : locationName},
            success: function(){
              Swal.fire('Saved!', '', 'success')
            }
          })
          
        }else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    })


    // Search Employee
    $('#submit').click(function(){
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
                        <div class="card">
                          <div class="info" >
                            <h3>${searchParamsLName} ${searchParamsFName}</h3>
                            <h4>${dataPersonnelEmail}</h4>
                            <h4>${returnedDepartmentName}</h4>
                            <h4>${returnedLocationName}</h4>
                          </div>
                        `)
                      }
                      console.log(item)
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

