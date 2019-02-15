
//====전역변수:각각 체크여부
	var flag = false;//null체크여부
	var flagI = false;//아이디중복체크여부
	var flagP = false;//비번확인체크여부
	var flagE = false;//email체크여부
	var flagB = false;//생년월일 체크여부
	var flagN = false;//번호 체크여부
	
//====다 체크하고 submit
	function check(){
		var id = iform.id.value;
		var name = iform.name.value;
		var pwd = iform.pwd.value;
		var pwd2 = iform.pwd2.value;
		var code = iform.code.value;
		var juso1 = iform.juso1.value;
		var juso2 = iform.juso2.value;
		var year = iform.year.value;
		var month = iform.month.value;
		var day = iform.day.value;
		var num1 = iform.num1.value;
		var num2 = iform.num2.value;
		var num3 = iform.num3.value;
		var email = iform.email.value;
		
		if (id==null||id==""){
			alert('아이디를 입력하세요');
			iform.sabun.focus();
			return;
		}
		if (name==null||name==""){
			alert('이름을 입력하세요.');
			iform.name.focus();
			return;
		}
		if (pwd==null||pwd==""){
			alert('비밀번호를 입력하세요.');
			iform.pw.focus();
			return;
		}
		if (pwd2==null||pwd2==""){
			alert('비밀번호를 재입력하세요.');
			iform.pw2.focus();
			return;
		}
		if (code==null||code==""||juso1==null||juso1==""||juso2==null||juso2==""){
			alert('주소를 입력하세요.');
			iform.code.focus();
			return;
		}
		if (year==null||year==""||month==null||month==""||day==null||day==""){
			alert('생년월일을 입력하세요.');
			iform.year.focus();
			return;
		}
		if (num1==null||num1==""||num2==null||num2==""||num3==null||num3==""){
			alert('휴대폰번호를 입력하세요.');
			iform.num1.focus();
			return;
		}
		if (email==null||email==""){
			alert('이메일을 입력하세요.');
			iform.email.focus();
			return;
		}

		//위에 해당 되는 거 없으면 널 체크 true
		flag=true;
		
		if(flagI==false){	//아이디 중복체크 안됐을때
			alert('아이디 중복체크 하세요.');
			return;
		}
		
		if(flagP==false){	//비번 확인 틀렸을때
			alert('비밀번호가 일치하지 않습니다.');
			iform.pwd2.focus();
			return;
		}
		
		if(flagN==false){	//전화번호 올바르지 않을때
			alert('전화번호를 올바르게 입력하세요.');
			iform.num1.focus();
			return;
		}
		//위에 다 통과&체크 완료 후 submit
		if(flag==true&&flagI==true&&flagP==true&&flagE==true&&flagN==true&&flagB==true){
			document.iform.submit();
		} else { return; }
	}//check end
	
	
//====아이디 체크
	function checkId(){//사번 입력체크하고 중복확인 팝업창 열어주기
		var id = iform.id.value;
		var label = document.getElementById("idlabel");
		var id_reg = /^[a-z]+[a-z0-9]{5,14}/;//첫번째영문자 부터 영문자와 숫자 6-20자
		if(id==""||id==null){
			label.innerHTML = "&nbsp;&nbsp;<font color='red'>아이디를 입력하세요.</font>";
			iform.id.focus();
			return;
		} else {
			if(id_reg.test(id)==false){
				label.innerHTML = "&nbsp;&nbsp;<font color='red'>영문과 숫자 6~15자를 입력하세요.</font>";
				iform.id.value="";
				iform.id.focus();
				return;
			}
		}
		label.innerHTML = "";
		open('openSb.jsp','oepnSb','width=400, height=150, left=100, top=200');
	}//checkSb end
	
	function flagI_t(){//아이디 플래그를 true로 바꿔주는 메소드(팝업창에서 작동)
		flagI=true;
	}
	
	//이름 확인
	function checkName() {
		var name = iform.name.value;
		var label = document.getElementById("namelabel");
		var name_reg = /^[가-힣]{2,6}$/;
		if(name=="" || name==null) {
			label.innerHTML = "&nbsp;&nbsp;<font color='red'>이름을 입력하세요.</font>";
			iform.name.focus();
			return;
		} else {
			if(name_reg.test(name)==false) {
				label.innerHTML = "&nbsp;&nbsp;<font color='red'>2~6자 한글이어야 합니다.</font>";
				iform.name.value="";
				ifrom.name.focus();
				return;
			}
		}
		label.innerHTML = "";
	}
	
	
//====비밀번호 확인
	function checkPwd(){//비밀번호 확인 체크
		var str = document.getElementById("pwdlabel");
		if(iform.pwd.value == iform.pwd2.value) {
			str.innerHTML = "비밀번호가 일치합니다.";
			flagP = true;	//비번일치플래그 true로 해줌
		} else {
			str.innerHTML = "<font color='red'>비밀번호가 일치하지 않습니다.</font>";
		}
	}
		
	
//====각각 데이터 입력 자리수제한(db오류 안나게 바이트로 처리)
	function checklen(obj, maxByte)	{	//db데이터 사이즈에 맞는 길이 체크
		var strValue = obj.value;
		var strLen = strValue.length;
		var totalByte = 0;
		var len = 0;
		var oneChar ="";
		var str2 ="";
		
		for (var i = 0; i < strLen; i++) {	//한글자씩 가져와서
			oneChar = strValue.charAt(i);
			if (escape(oneChar).length > 15)	{	//길이가 4초과=유니코드/한글이면
				totalByte += 2;	//2바이트로 넣어주고
			} else {
				totalByte++;	//아니면 1바이트로 처리
			}
			if(totalByte <= maxByte) {
				len = i+1;	//입력된 데이터의 자리수 기억해주기
			}
		}
		if (totalByte > maxByte) {
			alert(maxByte+'Byte를 초과 입력 불가');
			str2 = strValue.substr(0, len);	//아까 기억한 자리수까지만큼 잘라서 넣어주기
			obj.value = str2;
		}
	}//end

	
//====email 형식체크
	function emailcheck( ){
		  var mail=iform.email.value;
		  var mail_reg=/^([\S]{2,16})@([a-zA-Z]{2,10})\.([a-zA-Z]{2,10})$/;
		  if(mail_reg.test(mail)==false){
			 msg="<font color=red>이메일 형식 체크하세요</font>"; 
			 document.getElementById("email_ch").innerHTML=msg;
			 iform.email.value="";
			 return;
		  }else{
		  	flagE = true;
		  	document.getElementById("email_ch").innerHTML="";
		  }
	   }//end
	   
	   
//====우편번호
	function DaumPostcode() {
		new daum.Postcode({
      oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('code').value = data.zonecode; //5자리 새우편번호 사용
        document.getElementById('juso1').value = fullAddr;

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById('juso2').focus();
      }
		}).open();
	}//end
	
	
	
//====전화번호 입력확인
	function num(){
		var str1=iform.num1.value;
		var str2=iform.num2.value;
		var str3=iform.num3.value;
		var num_reg=/[(0-9)]{3,4}/;
		var label=document.getElementById("numlabel");
		var test1=num_reg.test(str1);
		var test2=num_reg.test(str2);
		var test3=num_reg.test(str3);
		if(test1==false||test2==false||test3==false){
			label.innerHTML = "&nbsp;&nbsp;숫자3~4자리 입력하세요";
		} else {
			label.innerHTML = "";
			flagN=true;
		}
	}//end
	
	// 생년월일 입력확인
	function birth(){
		var year=iform.year.value;
		var month=iform.month.value;
		var day=iform.day.value;
		var month_reg=/[(0-9)]{2}/;
		var label=document.getElementById("birthlabel");
		var today = new Date(); // 날짜 변수 선언
		var yearNow = today.getFullYear(); // 올해 년도 가져옴
		var msg = "<font color=red>생년월일 형식에 맞게 입력하세요</font>";
		
		if(month_reg.test(month)==false) {
			iform.month.value = "0" + month;
		} else if(month_reg.test(day)==false) {
			iform.day.value = "0" + day;
		}
		
		
		if(1900 > year || year > yearNow) {
			label.innerHTML = msg;
		} else if(month < 1 || month > 12) {
			label.innerHTML = msg;
		} else if(day < 1 || day > 31) {
			label.innerHTML = msg;
		} else if((month==4||month==6||month==9||month==11) && day == 31) {
			label.innerHTML = msg;
		} else if(month==2) {
			var isleap = (year%4==0 && (year % 100 != 0 || year%400==0));
			
			if(day > 29 || (day==29 && !isleap)) {
				label.innerHTML = msg;
			} else {
				label.innerHTML = "";
				flagB=true;
			}
		} else {
			label.innerHTML = "";
			flagB=true;
		}

		
	}//end
	
	
	
//====이미지 파일 미리보기
	function handleFileSelect() {
    var files = document.getElementById('file').files[0]; //파일 객체
    var reader = new FileReader();
    //파일정보 수집        
    reader.onload = (function(theFile) {
      return function(e) {
        //이미지 뷰
        var img_view = ['<img src="', e.target.result, '" name="', escape(theFile.name), '"/>'].join('');                
        document.getElementById('preview').innerHTML = img_view;
      };
    })(files);
    reader.readAsDataURL(files);    
  }//end
