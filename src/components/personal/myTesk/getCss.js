var Api = (() => {
  let getCss = function () {
    let css = '\n' +
      '.ql-align-left {\n' +
      '  text-align: left;\n' +
      '}\n' +
      '.ql-align-center {\n' +
      '  text-align: center;\n' +
      '}\n' +
      '.ql-align-right {\n' +
      '  text-align: right;\n' +
      '}\n' +
      '.ql-align-justify {\n' +
      '  text-align: justify;\n' +
      '}\n' +
      '#editPage {\n' +
      '  width: 320px;\n' +
      '  min-height: 504px;\n' +
      '  margin: 0 auto;\n' +
      '}\n' +
      '#editPage .showMain {\n' +
      '  width: 320px;\n' +
      '  min-height: 504px;\n' +
      '  margin: 0 auto;\n' +
      '  background: #ffffff;\n' +
      '  padding: 10px;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid_divs {\n' +
      '  width: 30%;\n' +
      '  height: 60px;\n' +
      '  margin-bottom: 20px;\n' +
      '  float: left;\n' +
      '  position: relative;\n' +
      '  cursor: move;\n' +
      '  border: 1px solid #666666;\n' +
      '  background-color: #fff;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid_divs:nth-child(3n - 1) {\n' +
      '  margin-left: 10px;\n' +
      '  margin-right: 10px;\n' +
      '}\n' +
      '.grid_divs .grid_clear_every {\n' +
      '  display: none;\n' +
      '  position: absolute;\n' +
      '  right: -7px;\n' +
      '  top: -8px;\n' +
      '  color: #dcdcdc;\n' +
      '  background-color: #ffffff;\n' +
      '  cursor: pointer;\n' +
      '  -webkit-border-radius: 50%;\n' +
      '  -moz-border-radius: 50%;\n' +
      '  border-radius: 50%;\n' +
      '}\n' +
      '.grid_divs .grid_clear_every:hover {\n' +
      '  color: #4574df;\n' +
      '}\n' +
      '.every_grid {\n' +
      '  padding: 10px;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid_files {\n' +
      '  display: none;\n' +
      '}\n' +
      '.grid_div_toggle {\n' +
      '  float: none;\n' +
      '  width: 100% !important;\n' +
      '  min-height: 200px;\n' +
      '  height: auto !important;\n' +
      '  margin-left: 0 !important;\n' +
      '  margin-right: 0 !important;\n' +
      '  margin-bottom: 20px;\n' +
      '  border: 1px solid #dcdcdc !important;\n' +
      '}\n' +
      '.grid_div_toggle .main_grid_div {\n' +
      '  display: block;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '/*.grid_div_toggle .main_grid_div .grid_div_p:empty:before {*/\n' +
      '/*color: #dcdcdc;*/\n' +
      '/*content: \'\';*/\n' +
      '/*}*/\n' +
      '.grid_div_toggle .grid_files {\n' +
      '  position: relative;\n' +
      '  display: block;\n' +
      '  width: 100%;\n' +
      '  min-height: 130px;\n' +
      '  margin: 0px auto;\n' +
      '  margin-bottom: 10px;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid_div_toggle .grid_files .file_empty {\n' +
      '  color: #dcdcdc;\n' +
      '  text-align: left;\n' +
      '  display: none;\n' +
      '}\n' +
      '.grid_div_toggle .text_clear_every {\n' +
      '  display: none;\n' +
      '}\n' +
      '.grid_div_toggle .grid_clear_every {\n' +
      '  display: none;\n' +
      '}\n' +
      '.grid_div_toggle .grid2_top {\n' +
      '  height: auto;\n' +
      '  min-height: 100px;\n' +
      '  border-bottom: 1px solid #dcdcdc !important;\n' +
      '}\n' +
      '.grid_div_toggle .grid2_bottom {\n' +
      '  height: auto;\n' +
      '  min-height: 100px;\n' +
      '}\n' +
      '.grid_div_toggle .grid3_left {\n' +
      '  border-right: 1px solid #dcdcdc !important;\n' +
      '  height: auto;\n' +
      '  min-height: 200px;\n' +
      '}\n' +
      '.grid_div_toggle .grid3_right {\n' +
      '  height: auto;\n' +
      '  min-height: 200px;\n' +
      '  border-left: 1px solid #dcdcdc !important;\n' +
      '  margin-left: -1px;\n' +
      '}\n' +
      '.grid_div_toggle1 {\n' +
      '  float: none;\n' +
      '  width: 100% !important;\n' +
      '  min-height: 200px;\n' +
      '  height: auto !important;\n' +
      '  margin-left: 0 !important;\n' +
      '  margin-right: 0 !important;\n' +
      '  margin-bottom: 20px;\n' +
      '  border: 1px dashed #dcdcdc !important;\n' +
      '}\n' +
      '.grid_div_toggle1 .main_grid_div {\n' +
      '  display: block;\n' +
      '  border: 1px dashed #dcdcdc !important;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid_div_toggle1 .grid_files {\n' +
      '  position: relative;\n' +
      '  display: block;\n' +
      '  border: 1px dashed #dcdcdc !important;\n' +
      '  width: 100%;\n' +
      '  min-height: 130px;\n' +
      '  margin: 0px auto;\n' +
      '  margin-bottom: 10px;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid_div_toggle1 .grid_files .file_empty {\n' +
      '  color: #dcdcdc;\n' +
      '  text-align: left;\n' +
      '}\n' +
      '.grid_div_toggle1 .text_clear_every {\n' +
      '  display: block;\n' +
      '  -webkit-border-radius: 50%;\n' +
      '  -moz-border-radius: 50%;\n' +
      '  border-radius: 50%;\n' +
      '}\n' +
      '.grid_div_toggle1 .grid_clear_every {\n' +
      '  display: block;\n' +
      '}\n' +
      '.grid_div_toggle1 .grid2_top {\n' +
      '  height: auto;\n' +
      '  min-height: 100px;\n' +
      '  border-bottom: 1px dashed #dcdcdc !important;\n' +
      '}\n' +
      '.grid_div_toggle1 .grid2_bottom {\n' +
      '  height: auto;\n' +
      '  min-height: 100px;\n' +
      '}\n' +
      '.grid_div_toggle1 .grid3_left {\n' +
      '  border-right: 1px dashed #dcdcdc !important;\n' +
      '  height: auto;\n' +
      '  min-height: 200px;\n' +
      '}\n' +
      '.grid_div_toggle1 .grid3_right {\n' +
      '  height: auto;\n' +
      '  min-height: 200px;\n' +
      '  border-left: 1px dashed #dcdcdc !important;\n' +
      '  margin-left: -1px;\n' +
      '}\n' +
      '.grid2 .grid2_top {\n' +
      '  display: inline-block;\n' +
      '  height: 50%;\n' +
      '  width: 100%;\n' +
      '  border-bottom: 1px solid #666666;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '}\n' +
      '.grid2 .grid2_bottom {\n' +
      '  display: inline-block;\n' +
      '  height: 50%;\n' +
      '  width: 100%;\n' +
      '}\n' +
      '.grid3 .grid3_left {\n' +
      '  display: inline-block;\n' +
      '  float: left;\n' +
      '  width: 50%;\n' +
      '  height: 100%;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '  border-right: 1px solid #666666;\n' +
      '}\n' +
      '.grid3 .grid3_right {\n' +
      '  display: inline-block;\n' +
      '  float: left;\n' +
      '  width: 50%;\n' +
      '  height: 100%;\n' +
      '}\n' +
      '.grid4 .every_grid {\n' +
      '  width: 50%;\n' +
      '  height: 50%;\n' +
      '  border: 1px solid #666666;\n' +
      '}\n' +
      '.main_grid_div {\n' +
      '  display: none;\n' +
      '  width: 100%;\n' +
      '  min-height: 30px;\n' +
      '  margin: 0 auto;\n' +
      '  position: relative;\n' +
      '  border: 1px solid transparent;\n' +
      '  cursor: move;\n' +
      '  margin-bottom: 10px;\n' +
      '  -webkit-touch-callout: none;\n' +
      '  /* iOS Safari */\n' +
      '\n' +
      '  -webkit-user-select: none;\n' +
      '  /* Chrome/Safari/Opera */\n' +
      '\n' +
      '  -khtml-user-select: none;\n' +
      '  /* Konqueror */\n' +
      '\n' +
      '  -moz-user-select: none;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -ms-user-select: none;\n' +
      '  /* Internet Explorer/Edge */\n' +
      '\n' +
      '  user-select: none;\n' +
      '  /* Non-prefixed version, currently\n' +
      '\n' +
      'not supported by any browser */\n' +
      '\n' +
      '  line-height: 1.42;\n' +
      '}\n' +
      '.main_grid_div .grid_div_p {\n' +
      '  width: 100%;\n' +
      '  min-height: 30px;\n' +
      '  height: inherit;\n' +
      '  outline: none;\n' +
      '  cursor: move;\n' +
      '  font-size: 14px;\n' +
      '}\n' +
      '/*.main_grid_div .grid_div_p:empty:before {*/\n' +
      '/*color: #dcdcdc;*/\n' +
      '/*content: attr(placeholder);*/\n' +
      '/*}*/\n' +
      '.text_clear_every {\n' +
      '  display: none;\n' +
      '  position: absolute;\n' +
      '  right: -7px;\n' +
      '  top: -8px;\n' +
      '  color: #dcdcdc;\n' +
      '  background-color: #ffffff;\n' +
      '  cursor: pointer;\n' +
      '}\n' +
      '.text_clear_every:hover {\n' +
      '  color: #4574df;\n' +
      '}\n' +
      '.main_t_grid_border {\n' +
      '  border: 1px dashed #dcdcdc;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '  cursor: move;\n' +
      '}\n' +
      '.main_t_grid_border .text_clear_every {\n' +
      '  display: block;\n' +
      '  -webkit-border-radius: 50%;\n' +
      '  -moz-border-radius: 50%;\n' +
      '  border-radius: 50%;\n' +
      '}\n' +
      '.demo_file {\n' +
      '  display: none;\n' +
      '  width: 100%;\n' +
      '  height: 200px;\n' +
      '  border: 1px solid gray;\n' +
      '}\n' +
      '.grid_file_equal {\n' +
      '  width: 33%;\n' +
      '  display: inline-block;\n' +
      '  text-align: center;\n' +
      '  vertical-align: middle;\n' +
      '}\n' +
      '.grid_file_equal .grid_file_li {\n' +
      '  width: 70px;\n' +
      '  height: 70px;\n' +
      '  display: inline-block;\n' +
      '  vertical-align: middle;\n' +
      '  text-align: center;\n' +
      '  background-color: #F2F3F9;\n' +
      '  margin-right: 10px;\n' +
      '  margin-bottom: 10px;\n' +
      '  position: relative;\n' +
      '}\n' +
      '.grid_file_equal .grid_file_li:hover .grid_del_file {\n' +
      '  display: block;\n' +
      '  -webkit-border-radius: 50%;\n' +
      '  -moz-border-radius: 50%;\n' +
      '  border-radius: 50%;\n' +
      '}\n' +
      '.grid_file_equal .grid_file_li .grid_del_file {\n' +
      '  display: none;\n' +
      '  position: absolute;\n' +
      '  top: 0px;\n' +
      '  right: 0px;\n' +
      '  color: #999999;\n' +
      '  background-color: #F2F3F9;\n' +
      '  cursor: pointer;\n' +
      '}\n' +
      '.grid_file_equal .grid_file_li .grid_del_file:hover {\n' +
      '  color: #4574df;\n' +
      '}\n' +
      '.grid_file_equal .grid_file_li .grid_file_img {\n' +
      '  width: 46px;\n' +
      '  height: 46px;\n' +
      '  margin: 4px;\n' +
      '}\n' +
      '.grid_file_equal .grid_file_li .grid_file_span {\n' +
      '  display: block;\n' +
      '  font-size: 12px;\n' +
      '  line-height: 1;\n' +
      '  padding: 2px;\n' +
      '  margin-top: -4px;\n' +
      '  box-sizing: border-box;\n' +
      '  -moz-box-sizing: border-box;\n' +
      '  /* Firefox */\n' +
      '\n' +
      '  -webkit-box-sizing: border-box;\n' +
      '  /* Safari */\n' +
      '\n' +
      '  overflow: hidden;\n' +
      '  text-overflow: ellipsis;\n' +
      '  white-space: nowrap;\n' +
      '}\n' +
      '.add_reserve {\n' +
      '  height: 30px;\n' +
      '  width: 100%;\n' +
      '  border: 1px dashed #4583F0;\n' +
      '}\n' +
      '\n'


    return css;
  }
  return {
    getCss: getCss,

  }
})();
module.exports = Api;
