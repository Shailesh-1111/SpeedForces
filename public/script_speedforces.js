
// .........................................Random Problem Generator.........................//

let problemSolved=[];
    let user;
    let p_str;

$(function(){

    $("#go").on("click",function(){
        user=$("#handle").val();
        //console.log(user);
        let url="https://codeforces.com/api/user.status?handle="+user;
        //console.log(url);

        fetch(url).then(function(response){
            response.json().then(function(res){
                let strr=res.status;
                if(strr=="FAILED"){
                    alert("Invalid Handle  Name !!!!");
                }

                if(strr=="OK"){
                    $(".check").show();
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

                $("#link").val("!! Click Visit to Go to Problem !!");
                $("#link").css("color","green");
                //console.log(str);

                $("#visit").attr("href",str);
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
    $("#link").css("color","grey");
    $("#visit").css("pointer-events","none");
    let time=0;

    let distance=parseInt($("#time").val());
    distance*=60;
    let total_time=distance;
    //console.log(total_time);

    let x = setInterval(function() {
       
        let minutes = Math.floor(distance/60);
        let seconds = Math.floor(distance%60);
      
        $("#time").val(((minutes<10)?"0"+minutes:minutes)+ ":"+ ((seconds<10)?"0"+seconds:seconds));
        distance--;
      
        if (distance < 0) {
          clearInterval(x);
          $(".result").show();  
          $(".alert-heading").html("Time Over !!");
          $(".alert-heading").css("color","red");
          $("#time").css("color","#F32424");
          $("#visit").css("display","none");
          
        }

        time++;

        if(time%2===0){
            let url="https://codeforces.com/api/user.status?handle="+user+"&count=10";

            fetch(url).then(function(response){
                response.json().then(function(res){
                    let len=res.result.length;
                
                    for(let i=0;i<len;i++){
                        let str1="https://codeforces.com/problemset/problem/"+(res.result[i].problem.contestId).toString()+"/"+res.result[i].problem.index;
            
                        if(str1===p_str && res.result[i].verdict==="OK"){
                            clearInterval(x);
                            let t=total_time-distance;
                            m=parseInt(t/60);
                            s=parseInt(t%60);
                            let timeTaken=(((m<10)?"0"+m:m)+ ":"+ ((s<10)?"0"+s:s));
                            $("#visit").css("display","none");
                            $(".result").show(); 
                            $("#winner").css("color","green");
                            $("#winner").html("You Solved The Problem in "+timeTaken+" Min");
                           
                        }
                    }
                });
            });
        }

      }, 1000);

});


// .........................................Countdown Timer.................................//


