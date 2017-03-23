var fs= require('fs');
fs.readdir('.',caller);
function caller(err,files) {
    console.log(' ');
    if(!files.length)
        return console.log('\033[31m No files to show! \033[39m');
    console.log('lect the file or directory you want to see');
    var stats=[];
    function file(i) {
        var filename=files[i];
        fs.stat(__dirname+'/'+filename,function (err,stat) {
            stats[i]=stat;
            if(stat.isDirectory()){
                console.log(' '+i+' \033[33m '+filename+'\033[39m');
            }
            else
                console.log(' '+i+' \033[90m '+filename+'\033[39m');
            i++;
            if(i==files.length)
                read();
            else
                file(i);
        });
    }
    function read() {
        process.stdout.write('\n Enter your choice : ');
        process.stdin.resume();
        process.stdin.setEncoding('UTF-8');
        process.stdin.on('data',action);
    }
    function action(choice) {
        var filename = files[Number(choice)];
        if(!filename) {
            process.stdout.write(' \033[31m Enter your choice : \033[39m');
        }
        else{            process.stdin.pause();
            if(stats[Number(choice)].isDirectory()){
                fs.readdir(__dirname+'/'+filename,function (err,files) {
                    console.log('( '+files.length+' files)');
                    files.forEach(function (file) {
                        console.log(file);
                    });
                });
            }
            else
                fs.readFile(__dirname+'/'+filename,'UTF-8',function (err,temp) {
                    console.log(temp);
                });
        }
    }
    file(0);
}