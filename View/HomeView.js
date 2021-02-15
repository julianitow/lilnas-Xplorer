const pug = require('pug');
const compiledFunction = pug.compileFile(__dirname + '/HomeView.pug');

class HomeView {
    constructor(movies){
        this.movies = movies;
    }

    init(){
        console.log(this.controller.host);
    }

    async view(){
        //let movies = await this.controller.request(["/home/julianitow/MEDIA_LIBRARY/Movies"]);
        //let movies = await this.controller.request("/home/julianitow/MEDIA_LIBRARY/Movies");
        return compiledFunction({ view: "HomeView", movies: this.movies });
    };
};

module.exports = {
    HomeView: HomeView
}