
/*load values into pic of day section*/
picOfDay()
function picOfDay() {
      fetch("https://api.nasa.gov/planetary/apod?api_key=0kDrOBtIYM2fhZoVrtf80AaSIzg4Tb7PPSeJ1bfu")
         .then(response => response.json())
         .then(data => data)
         .then(function(data){

         /*modify json for use*/
         console.log(data)
         $("#photoDay>img").attr("src",data["url"])
         })
}




/*load values into near earth objects section*/
NEO()
function NEO() {
      var startDate = "2021-02-01" /*get todays date*/
      var endDate = "2021-02-02" /*get tomorrow's date*/


      fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=0kDrOBtIYM2fhZoVrtf80AaSIzg4Tb7PPSeJ1bfu")
      .then(response => response.json())
      .then(data => data["near_earth_objects"])
      .then(function(data){

      $(".neoInfo").remove() /*removes placeholder code */

      var numTdy = 4
      var numTmr = 4

      console.log(data) /*shows json data */

      /*check if JSON key with today's date has more than 4 children (youll get it when you see the console).
      if it has less than 4, change numTdy to the number of children*/

      /*check if JSON key with tomorrow's date has more than 4 children (youll get it when you see the console).
      if it has less than 4, change numTmr to the number of children*/

      var addString = "" /*string that well add to the html code */




      
      /*there are 2 for loops, one for today, one for tomorrow. the max number is numTdy and numTmr respectively
      each loop will append a string to the addString variable. they way youd get info is sth like
      
      if you want id

      data['2021-02-01'][i]['id']
      */


      /*today loop*/
      for (var i =0; i < numTdy; i++){   
            var dayTime = 'Today, 12:04' //change variable to either Today or Tmrrw, time based each entry
            var link = 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3005973' //nasa_jpl_url
            var name = '1995 CR' //name. search for brackets in the value of the name key (could appear as 'eros (1995 CR) or (1995 CR). ONLY PUT THE STUFF IN THE BRACKETS.')
            var dia = '0.2' //Get reading in kilometers (average between min and max). 1 d.p. if less than 10. 0 d.p if more than 10
            var vel = '45' //relative_velocity. get km/s reading. 0 d.p.
            var dis = '68' //miss_distance. get km reading. divide by 1 million and make it 0 d.p.
            addString += '<div class="mb-2 px-4 d-flex justify-content-around text-left neoInfo"><div class="col-4 p-0 neoInfoLeft"><h4 class="neoDateTime">' + dayTime + ' UT</h4> <a href="'+link+'" target="_blank" class="neoName"><b>'+name+'</b></a> </div> <div class="col-7 d-flex p-0 pt-0 neoInfoRight"> <div class="col-4 p-0"> <p class="my-2">Diameter</p> <p><b>'+dia+'</b> km<p> </div> <div class="col-4 p-0"> <p class="my-2">Velocity</p> <p><b>'+ vel +'</b> km/s<p> </div> <div class="col-4 p-0"> <p class="my-2">Closest Dist</p> <p><b>68</b> MM km<p> </div> </div> </div>'
      }

      /*tomorrow loop*/
      for (var i =0; i < numTmr; i++){   
            var dayTime = 'Today, 12:04' //change variable to either Today or Tmrrw, time based each entry
            addString += '<div class="mb-2 px-4 d-flex justify-content-around text-left neoInfo"><div class="col-4 p-0 neoInfoLeft"><h4 class="neoDateTime">' + dayTime + ' UT</h4> <a href="http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3005973" target="_blank" class="neoName"><b>1995 CR</b></a> </div> <div class="col-7 d-flex p-0 pt-0 neoInfoRight"> <div class="col-4 p-0"> <p class="my-2">Diameter</p> <p><b>0.2</b> km<p> </div> <div class="col-4 p-0"> <p class="my-2">Velocity</p> <p><b>45</b> km/s<p> </div> <div class="col-4 p-0"> <p class="my-2">Closest Dist</p> <p><b>68</b> MM km<p> </div> </div> </div>'
      }


      $("#neo>p").append(addString)
      })
}