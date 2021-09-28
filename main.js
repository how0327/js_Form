
let formData = new FormData();
let ta = new Array();
let html = '';


//글자수 제한 체크
function wordCheck (obj, maxByte) {
  let byte = 0;
  let leng = 0;
  let oneChar = "";
  let savedStr = ""; 
  let strValue = obj.value;

  for (let i = 0; i < strValue.length; i++) {
    oneChar = strValue.charAt(i);
    if (escape(oneChar).length > 4) {
      byte += 2;
    } else {
      byte += 1;
    }

    if(byte <= maxByte) {
      leng = i + 1;
    }
  }
  if (byte > maxByte) {
    swal({
      title: maxByte+ "자 이내로 입력해주세요!!",
      icon: "warning"
    })
    savedStr = strValue.substr(0, 200);
    obj.value = savedStr;
    leng=200;
    byte = maxByte;
  }
  document.getElementById("count").value = byte;
}

//파일 첨부하기
function onFileUpload(event) {
  event.preventDefault();
  let file = event.target.files[0];
  formData.append('files', file);

  let filehtml = '';
  filehtml += '<div class="attach-wrap" id="attachList">';
  filehtml += '<div class="attached">';
  filehtml += '<a class="ico-trash" onclick="deleteAttach(this)"></a>';
  filehtml += ''+file.name+'</div>';
  filehtml += '<div class="attach-file">';
  filehtml += '<input type="file" class="filecustom" />';
  filehtml += '<div class="bn-attach"></div>';
  filehtml += '</div>';
  filehtml += '</div>';

  $("#fileparent").append(filehtml);

for(var value of formData.values()) {
  console.log(value);
}
let beforedelete = formData.getAll('files');
  console.log(beforedelete);

} 


//등록(검사)
function table() {

  let $title = $("#inTitle").val();
  let $cost = $('input[name=cost]:checked').val();
  let $selection = $('#selecting option:selected').val();
  const $check = function() {
    let chc = $('input[name=position]:checked')
    let str = '';
    let newstr = '';
    chc.each(function() {
                    str += $(this).val()+",";
                    newstr = str.substring(0,str.length-1);                                           
    });
    return newstr;
  }

  let attachcheck = formData.getAll('files').length;
  const $attach = function() {
    if(attachcheck === 0) { //첨부파일 유무 확인 로직 
      return '';
    } else {
      return '<a class="ico-down" onclick="downloadFile()"></a> ';
    }
  }

    //필수 항목 체크 로직
    if ($title === ''|| $cost === undefined || $selection === '' || $check() === '' ) {
      swal({
        title: "등록폼을 다시 확인해주세요!",
        text: "*표시된 항목을 모두 채워주세요.",
        icon: "warning"
    })
    }
    else {  //필수항목 체크 완료시 추가
      html += '<tr>';
      html += '<td class="title">'+$title+'</td>';
      html += '<td>'+$check()+'</td>';
      html += '<td>'+$selection+'</td>';
      html += '<td>'+$cost+'</td>';
      html += '<td>'+$attach()+'</td>';
      html += '<td><a class="ico-trash" onclick="deleteLine(this)"></a></td>';
      html += '</tr>';

      document.getElementById("table-responsive").style.display="block";
      $("#dynamicTable").append(html);
      html='';
      $("#inTitle").val('');
      $("#selecting").val('');
      $('input[name=position]:checked').prop("checked",false);
      $('input[name=cost]:checked').prop("checked",false);
} //추가 후 항목 비우기
}

function downloadFile() {
    swal({
      title: "다운로드",
      text: "첨부파일을 다운로드합니다.",
      icon: "success"
  })
}

//첨부 완료된 파일 지우기
function deleteAttach(obj) {
    $(obj).closest('#attachList').remove();
    formData.delete('files');
    let afterdelete = formData.getAll('files');
    console.log(afterdelete);
}

//테이블리스트 삭제 구현
function deleteLine(obj) {
    $(obj).closest('tr').remove();
    formData.delete('files');
    let afterdelete = formData.getAll('files');
    console.log(afterdelete);
}







