
// $(window).on('load', function () {
//   if ($('#preloader').length) {
//     $('#preloader').delay(1000).fadeOut('slow', function () {
//       $(this).remove();
//     });
//   }
// });
console.log('hello')

$.ajax({
  url: 'assets/php/getAll.php',
  success: function(item){
    console.log(item)
    let dataArray = [];
    let pageArray = [];
    for (let i = 0; i <= item.length; i++){
      if (i % 5 != 0){
        pageArray.push(item[i]);
      }
      else{
        console.log(`page : ${JSON.stringify(pageArray)}`);
        console.log(`page length: ${pageArray.length}`);
        dataArray.push(pageArray);
        pageArray = [];
      }
    }
    
    console.log(`data: ${dataArray}`)
    dataArray[1].forEach(function(item){
      $('#result').html(``);
      $('#result').append(`<p>${JSON.stringify(item)}</p>`);

    })
    console.log(dataArray);
  }
})

