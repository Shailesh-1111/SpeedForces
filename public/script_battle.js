
// .........................................Random Problem Generator.........................//

let problemSolved=[];
    let user1,user2;
    let p_str;
    let creation1=9999999999,creation2=9999999999;

$(function(){

    $("#go-1").on("click",function(){
        user1=$("#handle-1").val();
        //console.log(user1);
        let url="https://codeforces.com/api/user.status?handle="+user1;
        //console.log(url);

        fetch(url).then(function(response){
            response.json().then(function(res){
                let strr=res.status;
                if(strr=="FAILED"){
                    alert("Invalid Handle Name of User 1!!!!");
                }
                if(strr=="OK"){
                $(".check1").show();
                }
                let len=res.result.length;
                for(let i=0;i<len;i++){
                    let str="";
                    str+=(res.result[i].problem.contestId).toString();
                    str+=(res.result[i].problem.index);
                   
                    if(res.result[i].verdict=="OK") problemSolved.push(str);
                }
            })
        })
    })


    $("#go-2").on("click",function(){
        user2=$("#handle-2").val();
        //console.log(user2);
        let url="https://codeforces.com/api/user.status?handle="+user2;
        //console.log(url);

        fetch(url).then(function(response){
            response.json().then(function(res){
                let strr=res.status;
                if(strr=="FAILED"){
                    alert("Invalid Handle Name of User 2!!!!");
                }
                if(strr=="OK"){
                    $(".check2").show();
                }
               
                let len=res.result.length;
                for(let i=0;i<len;i++){
                    let str="";
                    str+=(res.result[i].problem.contestId).toString();
                    str+=(res.result[i].problem.index);
                   
                    if(res.result[i].verdict=="OK") problemSolved.push(str);
                }
            })
        })
    })


    $("#gen").on("click",function(){

        let str2="Loading.....";
        $("#link").val(str2);

        //......................timer................//
        let distance =parseInt($("#time").val());
        $("#time").prop("readonly", true);
        $("#time").val(((distance<10)?"0"+distance:distance)+ ":00");
        //......................timer................//

      let unsolved=[];

       let url= "https://codeforces.com/api/problemset.problems";
        fetch(url).then(function(response){
            response.json().then(function(res){
                let len=res.result.problems.length;
                //console.log(res.result.problems.length);
                let start=$("#start").val();
                let end=$("#end").val();

                //console.log(start+" "+end);
                //console.log(len);

                for(let i=0;i<len;i++){
                    if(res.result.problems[i].rating>=start && res.result.problems[i].rating<=end){
                        let str1=(res.result.problems[i].contestId).toString()+res.result.problems[i].index;
                        let len1=problemSolved.length;
                        let ok=true;

                      

                        for(let j=0;j<len1;j++){
                            if(problemSolved[j]===str1){
                                ok=false;
                                break;
                            }
                        }



                        if(ok===true){
                            if(unsolved.length>15) break;
    
                            let str="https://codeforces.com/problemset/problem/"+(res.result.problems[i].contestId).toString() + "/" + res.result.problems[i].index;
                            unsolved.push(str);
                           
                        }
                    }
                }

                let choose=Math.floor(Math.random()*15);
                let str=unsolved[choose];
                p_str=str;
                $("#link").val("Click Start To Show The Link!!");
                //console.log(str);
                $("#gen").prop("disabled", true);
            })
        })
    })

})

// .........................................Random Problem Generator.........................//





// .........................................Countdown Timer.................................//



$("#visit").on("click",function(){

    $("#time").css("color","#4E944F");
    $("#link").val(p_str);
    $("#visit").prop("disabled", true);
    let time=0;
    

    let distance =parseInt($("#time").val());
    distance*=60;

    let x = setInterval(function() {
       
        let minutes = Math.floor(distance/60);
        let seconds = Math.floor(distance%60);
      
        $("#time").val(((minutes<10)?"0"+minutes:minutes)+ ":"+ ((seconds<10)?"0"+seconds:seconds));
        distance--;
      
        if (distance < 0) {
          clearInterval(x);
          $("#winner").html("Time Out!!<br> NoBody Won The Duel");
          $("#winner").css("color","#FF5F00");
          $(".result").show();
          $("#time").css("color","#F32424");
          $("#visit").prop("disabled", true);
          
        }

        time++;

        if(time%3===0){
            let url1="https://codeforces.com/api/user.status?handle="+user1+"&count=10";
            let url2="https://codeforces.com/api/user.status?handle="+user2+"&count=10";

            fetch(url1).then(function(response){
                response.json().then(function(res){
                    let len=res.result.length;
                
                    for(let i=0;i<len;i++){
                        let str1="https://codeforces.com/problemset/problem/"+(res.result[i].problem.contestId).toString()+"/"+res.result[i].problem.index;
            
                        if(str1===p_str && res.result[i].verdict==="OK"){
                            let t=parseInt(res.result[i].creationTimeSeconds);
                            //console.log(t);
                            creation1=Math.min(creation1,t);
                        }
                    }
                  });
                });


                fetch(url2).then(function(response){
                    response.json().then(function(res){
                        let len=res.result.length;
                    
                        for(let i=0;i<len;i++){
                            let str1="https://codeforces.com/problemset/problem/"+(res.result[i].problem.contestId).toString()+"/"+res.result[i].problem.index;
                
                            if(str1===p_str && res.result[i].verdict==="OK"){
                                let t=parseInt(res.result[i].creationTimeSeconds);
                                //console.log(t);
                                creation2=Math.min(creation2,t);
                            }
                        }
                    });
                });

                ////console.log(creation1+" "+creation2);

                if(creation1<creation2){
                    clearInterval(x);
                    $("#winner").html(user1+" Won The Duel");
                    $("#winner").css("color","#FF5F00");
                    $(".result").show();
                    $("#time").css("color","#F32424");
                    $("#visit").prop("disabled", true);
                }
                else if(creation2<creation1){
                    clearInterval(x);
                    $("#winner").html(user2+" Won The Duel");
                    $("#winner").css("color","#FF5F00");
                    $(".result").show();
                    $("#time").css("color","#F32424");
                    $("#visit").prop("disabled", true);
                    
                }
        }

      }, 1000);

});


// .........................................Countdown Timer.................................//


