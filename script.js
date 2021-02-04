
/*load values into pic of day section*/
picOfDay()
function picOfDay() {
      fetch("https://api.nasa.gov/planetary/apod?api_key=0kDrOBtIYM2fhZoVrtf80AaSIzg4Tb7PPSeJ1bfu")
         .then(response => response.json())
         .then(data => data)
         .then(function(data){

         /*modify json for use*/
         console.log(data)
         if(data["media_type"] == "video"){
            
            $("#photoDay>p.desc").append('<iframe class="col-12 pt-2 dayvid" src="" frameBorder="0"></iframe>')
            $(".dayvid").attr("src",data["url"])
         }
         else if (data["media_type"] == "image"){
            $("#photoDay>p.desc").append('<img class="col-12 daypic" src="" alt="photoOfDay">')
            $(".daypic").attr("src",data["url"])
         }
         else{
            $("#photoDay>p.desc").append('It seems like this media type is unsupported.')
         }
         $(".imgTit>b").text(data["title"])
         $("#explain").text(data["explanation"])
         if (data["copyright"] != null){
            $("#photoDay>h4>#date").append('<b> | </b>' + '<span id="copyright">'+ data["copyright"] +'</span>' )
         }
         })

}




/*load values into near earth objects section*/
NEO()
function NEO() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = `${yyyy}-${mm}-${dd}`;
      var tmr = new Date();
      var dd = String(tmr.getDate()+1).padStart(2, '0');
      var mm = String(tmr.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = tmr.getFullYear();
      tmr = `${yyyy}-${mm}-${dd}`;
      
      var startDate = today /*get todays date*/
      var endDate = tmr /*get tomorrow's date*/


      fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=0kDrOBtIYM2fhZoVrtf80AaSIzg4Tb7PPSeJ1bfu")
      .then(response => response.json())
      .then(data => data["near_earth_objects"])
      .then(function(data){

      $(".neoInfo").remove() /*removes placeholder code */

      var numTdy = 4
      var numTmr = 4

      console.log(data) /*shows json data */

      if (data[startDate].length<4){ 
            numTdy = data[startDate].length;
          }
      if (data[endDate].length<4){ 
         numTmr = data[endDate].length;
      }
            

      var addString = "" /*string that well add to the html code */



      /*today loop*/
      for (var i =0; i < numTdy; i++){   
            var dayTime = '12:04' //Change variable time in this format. CONVERT FROM UTC TO SGT!!!!!!
            var link = data[startDate][i]["nasa_jpl_url"] //nasa_jpl_url
            var name = data[startDate][i]["name"] //name. search for brackets in the value of the name key (could appear as 'eros (1995 CR) or (1995 CR). ONLY PUT THE STUFF IN THE BRACKETS.')
            var diamin =  parseFloat(data[startDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_min"])
            var diamax =  parseFloat(data[startDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_max"])
            var dia = ((diamax+diamin)/2)
            if (dia < 1){
                  dia = dia.toFixed(2).toString().substring(1)
            }
            if(parseFloat(dia) >= 1){
                  dia = parseFloat(dia).toFixed(0)
            }
            var vel1 = Math.round(data[startDate][i]["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"],0)
            var vel = vel1 //relative_velocity. get km/s reading. 0 d.p.
            var discal = data[startDate][i]["close_approach_data"][0]["miss_distance"]["kilometers"]/1000000
            var dis = Math.round(discal,2) //miss_distance. get km reading. divide by 1 million and make it 0 d.p.
            addString += '<div class="mb-2 px-3 d-flex justify-content-around text-left neoInfo"><div class="col-4 p-0 neoInfoLeft"><h4 class="neoDateTime">Today, ' + dayTime + ' SG</h4> <a href="'+link+'" target="_blank" class="neoName"><b>'+name+'</b></a> </div> <div class="col-7 d-flex p-0 pt-0 neoInfoRight"> <div class="col-4 p-0"> <p class="my-2">Diameter</p> <p><b>'+dia+'</b> km<p> </div> <div class="col-4 p-0"> <p class="my-2">Velocity</p> <p><b>'+ vel +'</b> km/s<p> </div> <div class="col-4 p-0"> <p class="my-2">Closest Dist</p> <p><b>'+dis+'</b> MM km<p> </div> </div> </div>'

      }

      /*tomorrow loop*/
      for (var i =0; i < numTmr; i++){   
            var dayTime = '12:04' //Change variable time in this format  CONVERT FROM UTC TO SGT!!!!!!
            var link = data[startDate][i]["nasa_jpl_url"] //nasa_jpl_url
            var name = data[startDate][i]["name"] //name. search for brackets in the value of the name key (could appear as 'eros (1995 CR) or (1995 CR). ONLY PUT THE STUFF IN THE BRACKETS.')
            var diamin =  parseFloat(data[startDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_min"])
            var diamax =  parseFloat(data[startDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_max"])
            var dia = ((diamax+diamin)/2)
            if (dia < 1){
                  dia = dia.toFixed(2).toString().substring(1)
            }
            if(parseFloat(dia) >= 1){
                  dia = parseFloat(dia).toFixed(0)
            }
            var vel1 = Math.round(data[startDate][i]["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"],0)
            var vel = vel1 //relative_velocity. get km/s reading. 0 d.p.
            var discal = data[startDate][i]["close_approach_data"][0]["miss_distance"]["kilometers"]/1000000
            var dis = Math.round(discal,2) //miss_distance. get km reading. divide by 1 million and make it 0 d.p.
            addString += '<div class="mb-2 px-3 d-flex justify-content-around text-left neoInfo"><div class="col-4 p-0 neoInfoLeft"><h4 class="neoDateTime">Today, ' + dayTime + ' SG</h4> <a href="'+link+'" target="_blank" class="neoName"><b>'+name+'</b></a> </div> <div class="col-7 d-flex p-0 pt-0 neoInfoRight"> <div class="col-4 p-0"> <p class="my-2">Diameter</p> <p><b>'+dia+'</b> km<p> </div> <div class="col-4 p-0"> <p class="my-2">Velocity</p> <p><b>'+ vel +'</b> km/s<p> </div> <div class="col-4 p-0"> <p class="my-2">Closest Dist</p> <p><b>'+dis+'</b> MM km<p> </div> </div> </div>'
}

      $("#neo>p").append(addString)
      })
}

/*load values into spacey news section*/
spaceyNews()
function spaceyNews() {
         const proxyUrl = "https://cors-anywhere.herokuapp.com/"
         const url = `${proxyUrl}https://www.space.com/feeds/all`;
         const request = new Request(url);
         
         /*fetch news*/
         fetch(request)
         .then(response => response.text())
         .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
         .then(function(data){   
               
            console.log(data)
            
         

      })
}


/*change innerhtml of drowpdown button to selection*/
$(document).on("click", ".dropMed" , function() {
      ($(this).parent().siblings("button")).text($(this).text())
   })

/*Modify popover settings*/
$(document).ready(function(){
      $('[data-toggle="popover"]').popover({
          placement : 'top',
          trigger : 'hover'
      });
});















