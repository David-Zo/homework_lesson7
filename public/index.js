
// 引入fs模块
var fs = require('fs');

// 引入file json库
var jsonfile = require('jsonfile');

// 定义要扫描的目标文件夹
var pathString = '../../../../my_project_words/words-from-the-heart/';
// 用于存放所有心里话
var writePathString = './all_words.json';
// 用于存放格式不正确的json文件名
var errorPathString = './error_data.json';
// 调用fs的readdir函数读取所有文件
fs.readdir(pathString, function (err, files) {
    if (err) {
        console.log('读取文件失败');
        return;
    }
    //把含有"json"字符的文件名过滤出来,把所有文件保存在jsonFiles数组中
    var jsonFiles = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i].includes('.json')) {       //.includes如果file[i]
            jsonFiles.push(files[i]);
        }
    }
    //console.log(jsonFiles);
    //console.log(errorFiles);  通过测试，文件名统计到这里是没有问题的。
    //循环读取json文件的内容，并都存在jsonList数组内。读取出错的文件名存在errorFiles数组内。
    var jsonList = [];
    var errorFiles = [];
    for (var i = 0; i < jsonFiles.length; i++) {
        try {
            var content = jsonfile.readFileSync(pathString + jsonFiles[i]);
            jsonList.push(content);
        } catch (err) {
            errorFiles.push(jsonFiles[i]);
        }
    }
    //console.log(jsonList); //验证输出jsonList没有问题。
    //console.log(errorFiles); 
    /* for (var i = 0; i < jsonFiles.length; i++){
       try{
       var content = jsonfile.readFileSync(pathString + jsonFiles[i]);
       jsonList.push(content);   
       } catch(err){
           console.log(jsonFiles[i] + "文件内容写入出现错误！"); //查找错误文件，应该是误会了老师设置errorFiles的意思。
       }
     }*/
    /*
      for (var i = 0; i < jsonFiles.length; i++) {
        try {
          // 读取json文件
          var content = jsonfile.readFileSync(pathString + jsonFiles[i]);
          jsonList.push(content);
        } catch (err) {
          // 如果读取错误就把错误的文件名写入到errorFiles数组内
          console.log("文件整合出现错误！");
        }
      }
    */
    // 将收集到的数据写入到一个json文件中
    jsonfile.writeFile(writePathString, jsonList, function(err){
        if(err){
            console.log("文件写入失败！");
        }else{
            console.log("文件写入成功！");
        }
    });
    // 将收集到的错误文件写入到一个json文件中
    jsonfile.writeFile(errorPathString, errorFiles, function(err){
        if(err){
            console.log("文件写入失败！");
        }else{
            console.log("文件写入成功！");
        }
    });
    // 假如收集到的内容（json文件）格式乱怎么办？可以使用visual studio code的代码格式化插件自动调整格式，就会得出你想要的格式想过。
});