var fs = require('fs');
var net = require('net')
const args = process.argv;

var ip_address = args[2]
var port = args[3]
var data_per_second = args[4]
// var data = fs.readFileSync('3d_allstr_tid_lid_item.txt', 'utf8');
var data = fs.readFileSync('4d_int_3str_id_items.txt', 'utf8');
var d = data.toString().split("\n")
var is_timestamp = 0    // timestamp 포함 여부(0 : 불포함, 1 : 포함)

try
{
  var connection = net.createConnection(port, ip_address);
  console.log("connection complete!")
  var s_index = 0;
  var Interval_num = setInterval(function()
  {
    if (s_index > d.length - 1)
    s_index = 0;
    // let str = d[s_index];

    let str = d[s_index];

    if(typeof str == "undefined") {
      console.log("final data")
      clearInterval(Interval_num)
    }
    
    // timestamp 포함
    if(is_timestamp == 1) {
      let strs = str.split('\t');
      var time = `${Math.round(Date.now()/1000)}`;
      strs.unshift(time);
      str = strs.join('\t');
    }

    console.log(s_index + " : " + str);
    connection.write(str + '\n');
    s_index ++;
  }, 1000 / data_per_second);
}
catch (e) {
  console.log(e);
}
