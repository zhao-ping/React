/**
 * Created by zp on 16-6-27.
 */
var jsonform = {
  "formInformation": [
    {"txt": "name","inputType": 'text'}
  ],
  "status":'editStatus'
}

var AlertBox=React.createClass({
  exit:function () {
    $('#alertbox').find('input[type=text]').val();
    $('.alertContainner').hide();
  },

  addjson:function () {
    var newElement={};
    if($('#alertbox').find('input[type=text]').val()!=''){
      newElement.txt=$('#alertbox').find('input[type=text]').val();
      if($('#alertbox').find('input[type=radio]:checked')){
        newElement.inputType=$('#alertbox').find('input[type=radio]:checked').val();
      }
      else{
        alert('清选择输入框类型！');
      }
    }else {alert("请输入文本！");}
    jsonform.formInformation.push(newElement);
    $('#alertbox').find('input[type=text]').val('');
    $('.alertContainner').hide();
    ReactDOM.render(
      <Content />,
      document.getElementsByClassName('containner')[0]

    )
  },
  render:function () {
    return <div id="alertbox">
      <div className="exit" onClick={this.exit}>+</div>
      <ul><li><span>txt</span><input type="text"   /></li>
        <li><span>type</span><input type="radio"  value="text" name="inputtype" />text
          <input type="radio" value="date"  name="inputtype" />date</li></ul>
      <div className="addbox"><span className="addbutton" onClick={this.addjson}>add</span></div></div>;
  }
})

var ResetEditPage=React.createClass({



  ShowAlertbox:function () {
    $('.alertContainner').show();
    ReactDOM.render(
      <AlertBox />,
      document.getElementsByClassName('alertContainner')[0]
    )
  },

  toPreviewPage:function () {
    if(jsonform.status=='editStatus'){
      jsonform.status='previewStatus';
    }
    ReactDOM.render(
      <Content />,
      document.getElementsByClassName('containner')[0]

    )
  },

  deletjson:function(event){
    var index = $(event.currentTarget).data("item-index");
    jsonform.formInformation.splice(index,1);
    ReactDOM.render(
      <Content />,
      document.getElementsByClassName('containner')[0]
    );
  },


  render:function () {
    var self=this;
    return <div className="mian"><div className="form" id="editForm"><div className="change" onClick={this.toPreviewPage}>to previewForm</div><div className="jsonbox"><ul>
      {jsonform.formInformation.map(function (item,index) {
        if(item.inputType=='text'){
        return  <li><span>{item.txt}</span><input type="text"/><em data-item-index={index} onClick={self.deletjson}>-</em></li>}
        else{return <li><span>{item.txt}</span><input type="date"/><em data-item-index={index} onClick={self.deletjson}>-</em></li>}
      })}
    </ul><div className="add"><span className="showalertbox" onClick={this.ShowAlertbox}>+</span> </div></div></div></div>;
  }
})

var ResetPreviewPage=React.createClass({
  toEditPage:function () {
    if(jsonform.status=='previewStatus'){
      jsonform.status='editStatus';
    }
    ReactDOM.render(
      <Content />,
      document.getElementsByClassName('containner')[0]
    )
  },
  render:function () {
    return <div className="mian"><div className="form" id="editForm"><div className="change" onClick={this.toEditPage}>to previewForm</div><div className="jsonbox"><ul>
      {jsonform.formInformation.map(function (child) {
        return  <li><span>{child.txt}</span><input type="text" /></li>
      })}
    </ul></div></div></div>;
  }
})

 var Content=React.createClass({
   render:function () {
     if (jsonform.status==='editStatus'){
       return <ResetEditPage />;
     }
     else if( jsonform.status==='previewStatus'){
       return <ResetPreviewPage />;
     }
   }
 })


ReactDOM.render(
  <Content />,
  document.getElementsByClassName('containner')[0]

)
