const SSH = require('simple-ssh');
const { Movie } = require('../Model/Movie');
const { HomeView } = require('../View/HomeView');

class HomeViewController {
    constructor(host, user, password){
        this._SSH = new SSH({
            host: host,
            user: user,
            pass: password
        });
        this.titles = [];
    }

    request = async (directory) => {
        if(typeof directory === 'object'){
            for(let i = 0; i < directory.length ; i++){
                await this.ssh(directory[i], this);
            }
        } else {
            await this.ssh(directory, this);
        }
        return this.titles;
    };

    ssh = (directory, _this) => {
        return new Promise(async(resolve, reject) => {
            _this._SSH.exec('ls ' + directory, {
                out: function(stdout) {
                    console.log("[HomeViewController::ssh::exec::out]");
                    let filenames = stdout.split('\n');
                    for(let i = 0;  i < filenames.length ; i++){
                        let filename = filenames[i];
                        if(filename.length == 0 || filename == "vmlinuz" || filename == "movies" || filename.includes('initrd')){ continue; }
                        const movie = new Movie().fromFilename(filename);
                        if(_this.titles.includes(movie)){ continue; }
                        _this.titles.push(movie);
                    }
                    resolve(true);
                },
                err: function(stderr){
                    console.error(stderr);  
                    reject(stderr);          
                }
            }).start();
        });
    };

    render = async () => {
        let movies = await this.request(["/home/julianitow/MEDIA_LIBRARY/Movies", "/mnt/sdg/Movies"]);
        let homeView = new HomeView(movies);
        return homeView.view();
    };
}

module.exports = {
    HomeViewController: HomeViewController
}