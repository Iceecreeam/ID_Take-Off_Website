
/*load values into pic of day section*/
picOfDay()
function picOfDay() {
      fetch("https://api.nasa.gov/planetary/apod?api_key=0kDrOBtIYM2fhZoVrtf80AaSIzg4Tb7PPSeJ1bfu")
         .then(response => response.json())
         .then(data => data)
         .then(function(data){
         /*modify json for use*/
         if(data["media_type"] == "video"){
            
            $("#photoDay>p.desc").append('<iframe class="col-12 pt-4 dayvid" src="" frameBorder="0"></iframe>')
            $(".dayvid").attr("src",data["url"])
         }
         else if (data["media_type"] == "image"){
            $("#photoDay>p.desc").append('<img class="col-12 px-md-5 p-3 daypic" src="" alt="photoOfDay">')
            $(".daypic").attr("src",data["url"])
         }
         else{
            $("#photoDay>p.desc").append('<br>It seems like this media type is unsupported.')
         }

         $(".imgTit>b").text(data["title"])
         $("#explain").text(data["explanation"])
         $("#photoDay>h4>#date").text(data["date"])
         
         if (data["copyright"] != null){
               var copyright = data["copyright"]
            if (data["copyright"].includes("ESO Text:")){
                  copyright =  data["copyright"].substr(0, data["copyright"].indexOf("ESO Text:"))
            }

            $("#photoDay>h4>#date").append('<b> | </b>' + '<span id="copyright">'+ copyright +'</span>' )
         }
         })

}

/*load values into near earth objects section*/
NEO()
function NEO() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear();
      today = `${yyyy}-${mm}-${dd}`;
      var tmr = new Date();
      var dd = String(tmr.getDate()+1).padStart(2, '0');
      var mm = String(tmr.getMonth() + 1).padStart(2, '0');
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

      if (data[startDate].length<4){ 
            numTdy = data[startDate].length;
          }
      if (data[endDate].length<4){ 
         numTmr = data[endDate].length;
      }
            

      var addString = "" /*string that well add to the html code */



      /*today loop*/
      for (var i =0; i < numTdy; i++){   
            var datstr = (data[startDate][i]["close_approach_data"][0]["close_approach_date_full"] + ":00").split(/[- :]/)
            console.log(datstr)
            dayTime = new Date("1990", '1', '1', datstr[3], datstr[4], datstr[5])
            var time = dayTime.toLocaleTimeString('en-US', { hour12: false, 
                  hour: "numeric", 
                  minute: "numeric"});
            
            dayTime = time
            var link = data[startDate][i]["nasa_jpl_url"] //nasa_jpl_url
            var name = data[startDate][i]["name"].substring(data[startDate][i]["name"].indexOf("(") + 1, data[startDate][i]["name"].indexOf(")"))
            var diamin =  parseFloat(data[startDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_min"])
            var diamax =  parseFloat(data[startDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_max"])
            var dia = ((diamax+diamin)/2)
            if (dia < 1){
                  dia = dia.toFixed(2).toString().substring(1)
            }
            else if(parseFloat(dia) >= 1 && parseFloat(dia) < 10){
                  dia = parseFloat(dia).toFixed(1)
            }
            else{
                  dia = parseFloat(dia).toFixed(0)
            } 
            var vel = data[startDate][i]["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"]
            if (vel < 1){
                  vel = vel.toFixed(2).toString().substring(1)
            }
            else if(parseFloat(vel) >= 1 && parseFloat(vel) < 10){
                  vel = parseFloat(vel).toFixed(1)
            }
            else{
                  vel = parseFloat(vel).toFixed(0)
            } 
            var dis = data[startDate][i]["close_approach_data"][0]["miss_distance"]["kilometers"]/1000000
            if (dis < 1){
                  dis = dis.toFixed(2).toString().substring(1)
            }
            else if(parseFloat(dis) >= 1 && parseFloat(dis) < 10){
                  dis = parseFloat(dis).toFixed(1)
            }
            else{
                  dis = parseFloat(dis).toFixed(0)
            } 
            addString += '<div class="mb-2 px-3 d-flex justify-content-around text-left neoInfo"><div class="col-4 p-0 neoInfoLeft"><h4 class="neoDateTime">Today, ' + dayTime + ' SG</h4> <a href="'+link+'" target="_blank" class="neoName"><b>'+name+'</b></a> </div> <div class="col-7 d-flex p-0 pt-0 neoInfoRight"> <div class="col-4 p-0"> <p class="my-2">Diameter</p> <p><b>'+dia+'</b> km<p> </div> <div class="col-4 p-0"> <p class="my-2">Velocity</p> <p><b>'+ vel +'</b> km/s<p> </div> <div class="col-4 p-0"> <p class="my-2">Closest Dist</p> <p><b>'+dis+'</b> MM km<p> </div> </div> </div>'

      }

      /*tomorrow loop*/
      for (var i =0; i < numTmr; i++){   
            var datstr = (data[endDate][i]["close_approach_data"][0]["close_approach_date_full"] + ":00").split(/[- :]/)
            console.log(datstr)
            dayTime = new Date("1990", '1', '1', datstr[3], datstr[4], datstr[5])
            var time = dayTime.toLocaleTimeString('en-US', { hour12: false, 
                  hour: "numeric", 
                  minute: "numeric"});
            
            dayTime = "placeholder"
            var link = data[endDate][i]["nasa_jpl_url"] //nasa_jpl_url
            var name = data[endDate][i]["name"].substring(data[endDate][i]["name"].indexOf("(") + 1, data[endDate][i]["name"].indexOf(")"))
            var diamin =  parseFloat(data[endDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_min"])
            var diamax =  parseFloat(data[endDate][i]["estimated_diameter"]["kilometers"]["estimated_diameter_max"])
            var dia = ((diamax+diamin)/2)
            if (dia < 1){
                  dia = dia.toFixed(2).toString().substring(1)
            }
            else if(parseFloat(dia) >= 1 && parseFloat(dia) < 10){
                  dia = parseFloat(dia).toFixed(1)
            }
            else{
                  dia = parseFloat(dia).toFixed(0)
            } 
            var vel = data[endDate][i]["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"]
            if (vel < 1){
                  vel = vel.toFixed(2).toString().substring(1)
            }
            else if(parseFloat(vel) >= 1 && parseFloat(vel) < 10){
                  vel = parseFloat(vel).toFixed(1)
            }
            else{
                  vel = parseFloat(vel).toFixed(0)
            } 
            var dis = data[endDate][i]["close_approach_data"][0]["miss_distance"]["kilometers"]/1000000
            if (dis < 1){
                  dis = dis.toFixed(2).toString().substring(1)
            }
            else if(parseFloat(dis) >= 1 && parseFloat(dis) < 10){
                  dis = parseFloat(dis).toFixed(1)
            }
            else{
                  dis = parseFloat(dis).toFixed(0)
            } 
            addString += '<div class="mb-2 px-3 d-flex justify-content-around text-left neoInfo"><div class="col-4 p-0 neoInfoLeft"><h4 class="neoDateTime">Tmrrw, ' + dayTime + ' SG</h4> <a href="'+link+'" target="_blank" class="neoName"><b>'+name+'</b></a> </div> <div class="col-7 d-flex p-0 pt-0 neoInfoRight"> <div class="col-4 p-0"> <p class="my-2">Diameter</p> <p><b>'+dia+'</b> km<p> </div> <div class="col-4 p-0"> <p class="my-2">Velocity</p> <p><b>'+ vel +'</b> km/s<p> </div> <div class="col-4 p-0"> <p class="my-2">Closest Dist</p> <p><b>'+dis+'</b> MM km<p> </div> </div> </div>'
}
      $("#cometLoad").remove()

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
            var channel = data.querySelectorAll("channel")[0]
            var items = channel.querySelectorAll("item")
            $("#newsLoad").css("display", "none")
            $("#cors").css("display", "none")
            for (var i = 0; i<22; i++){
                  var link = items[i].querySelectorAll("guid")[0].innerHTML
                  var shortDesc = items[i].querySelectorAll("description")[0].innerHTML.replaceAll('"', "'");
                  var timePos = items[i].querySelectorAll("pubDate")[0].innerHTML
                  
                  var timePos1 = timePos.split(",")
                  var newDate = new Date(timePos1[1])
                  var currentDate = new Date()
                  
                  
                  var diff = Math.abs(newDate - currentDate)
                  if (diff <= 3600000){
                        timePos = "Just Now"
                  }
                  else if(diff > 3600000 && diff < 86400000){
                        var hours = (diff / (1000 * 60 * 60)).toFixed(0);
                        if (hours == 1){
                              timePos = `${hours} hours ago`
                        }
                        else{
                              timePos = `${hours} hours ago`
                        }
                  }

                  else if(diff >= 86400000 && diff < 604800000 ){
                        var days = (diff / (1000 * 60 * 60 * 24)).toFixed(0);
                        if (hours == 1){
                              timePos = `${days} day ago`
                        }
                        else{
                              timePos = `${days} days ago`
                        }
                        
                  }
                  else if(diff >= 604800000 ){
                        var days = (diff / (1000 * 60 * 60 * 24)).toFixed(0);
                        var weeks = Math.floor(days / 7)
                        if (weeks == 1){
                              `${weeks} week ago`
                        }
                        else{
                              `${weeks} weeks ago`
                        }
                  }
                  else{
                        timePos = "ERROR"
                  }
                  var tit = items[i].querySelectorAll("title")[0].innerHTML
                  var imag = items[i].querySelectorAll("enclosure")[0].getAttribute('url')
                  $("#news>p.desc").append(` <button onclick="window.open('`+link+`','_blank');" data-toggle="popover" data-placement="bottom" data-content="`+shortDesc+`" type="button" class="col-11 mx-auto btn p-0 mt-4 d-flex flex-nowrap justify-content-between border-0 rounded text-left bg-transparent art"> <span class="col-8 p-0 pl-3 headline"> <span class="col-12 d-block ml-4 mb-2 artim"> <b> `+timePos+` </b></span> <span class="col-12 p-0 tit">`+tit+`</span> </span> <span class="col-4 d-flex p-0 justify-content-center"><img src="`+imag+`" alt="photo"></span> </button>`) 
            }
            $("#news>p.desc").append(`<p class="mt-3 UpD">Last updated <b>| <span>`+channel.querySelectorAll("pubDate")[0].innerHTML+`</span></b></p>`)
       })
}

/*something cool*/
function sthCool() {
      $(".card-img-top").html(`<lottie-player class="d-inline w-75" src="https://assets5.lottiefiles.com/packages/lf20_XWP6mV.json" mode="bounce" background="transparent"  speed="5.8"  loop  autoplay></lottie-player>`)
      $(".card-title").text("The planetary soup is stirring")
      $(".card-text").text("What shall bubble to the surface?")
      var keyword =$(".coolKey")[0].value
      if(keyword == "" || !keyword.replace(/\s/g, '').length){
            alert("Please enter a keyword!")
            return
      }
      var type = $(".dropdown-toggle").text()
      fetch("https://images-api.nasa.gov/search?q=" + keyword)
      .then(response => response.json())
      .then(data => data["collection"]["items"])
      .then(function(data){
            var items = []
            data.forEach(i => {
                  var item = i["data"][0]
                  item["href"] = i["href"]
                  if(type == "image" || type == "audio"){
                        if (item["media_type"] == type){
                              items.push(item)
                        }
                  }
                  else{
                        if (item["media_type"] == "image" || item["media_type"] == "audio"){
                              items.push(item)
                        }
                  }

            })

            if(items.length <= 0 || data.length == 0){
                  $(".card-img-top").html(`<lottie-player src="https://assets10.lottiefiles.com/temp/lf20_dzWAyu.json"  background="transparent"  speed="0.5"  style="width: 100%"  loop  autoplay></lottie-player>`)                
                  $(".card-title").text("You have angered the cosmos")
                  $(".card-text").text("It demands a query clearer than its brightest star, and broader than itself")
            }
            else{
                  enNo = Math.floor(Math.random() * items.length)
                  var item = items[enNo]
                  var tit = item["title"]
                  var cap = item["description"]
                  $(".card-title").text(tit)
                  $(".card-text").text(cap)

                  var href = item["href"]
                  fetch(href)
                  .then(response => response.json())
                  .then(data => data)
                  .then(function(data){
                        for (var i = 0; i < data.length; i++){
                              
                              if(data[i].substr(data[i].length - 3) == "jpg" || data[i].substr(data[i].length - 3) == "png"){
                                    href = data[i]
                                    $(".card-img-top").html(`<img class="d-inline p-0 w-100" src="`+href+`" alt="Card image cap">`)
                                    break;
                              }
                              
                              if(data[i].substr(data[i].length - 3) == "mp3" ||data[i].substr(data[i].length - 3) == "m4a" || data[i].substr(data[i].length - 3) == "wav"){
                                    href = data[i]
                                    $(".card-img-top").html(`<audio class="col-12 p-0 mt-1" controls><source src="`+href+`" type="audio/mpeg">Your browser does not support the audio element.</audio>`)
                                    break;
                              }
                        }
                  })

            }


      })
}

/*change innerhtml of drowpdown button to selection*/
$(document).on("click", ".dropMed" , function() {
      ($(this).parent().siblings("button")).text($(this).text())
      sthCool()
      
})

/*move rocket*/
rockMove()
function rockMove() {
      var pos = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (pos == 350) {
          clearInterval(id);
        } else {            
              $(".path").css("padding-top",         parseFloat($(".path").css("padding-top").substr(0, $(".path").css("padding-top").length-2))     -3)
        }
      }
}


/*if user clicks on rocket*/
$(document).on("click", "#rockLoad" , function(){
   $(".path").html(`<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_MVp95j.json"  background="transparent"  speed="1"  style="width:100%;height: 180px;" autoplay></lottie-player>`)
})





/*Modify popover settings*/
$(document).on("mouseenter", ".art", function() {
$('[data-toggle="popover"]').popover({
      placement : 'top',
      });
      $(this).popover('show');
});
$(document).on("mouseleave", ".art", function() {
$(this).popover('hide');
});


/*remove focus on article after clicked*/
$(document).on("click", ".art",  function(){
      $(".art").blur()
})

