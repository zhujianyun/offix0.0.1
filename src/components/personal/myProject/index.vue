<template>
	<div class="my_project content">
		我的项目

	</div>

</template>

<script>
export default {
  mounted() {
    function compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    }
    var json1 = [
      { name: "小明", avg: "80" },
      { name: "小红", avg: "70" },
      { name: "小绿", avg: "90" }
    ];

    var json2 = json1.sort(compare("avg"));
    console.log(json2);

    // console.log(b);
    // Object.keys(obj).sort().reverse();
    return;
    let str = "appid=0001&version=1.0&key=4951841F25AF0C695331B3F3C0369089";
    str = hex_md5(str);
    str = str.toLocaleUpperCase();
    let obj = { appid: "0001", version: "1.0", sign: str };
    this.$axios({
      method: "post",
      url: "https://server.apexgame.cn/WebService.asmx/sys_get_signature",
      data: this.$qs.stringify(obj),
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then(res => {
      console.log(999, res.data);
      return res.data;
    });
  },
  created() {}
};
</script>
