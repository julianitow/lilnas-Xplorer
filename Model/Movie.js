const languages = ['French', 'VFF', 'VF', 'VO', 'VFF-ENG', 'FR', 'EN', 'VFF-VFQ-VOA', 'VOST', 'VOSTFR', 'VOSTF', 'MULTI', 'MULTi', 'Multi', 'FRENCH', 'TRUEFRENCH', 'cz', 'NZ', 'onl', 'AMZN'];
const quality = ['WEBrip', 'WEBRip', 'H264', 'AVC', '1-yoyo', '265', 'AAC', '1-QTZ', '4KLight', 'WEB', 'X264', 'x264-EXTREME', 'x264-TOXIC', 'UNRATED', 'Bluray', 'x265-SN2P', 'H264-ALLDAYiN', 'GHT', 'WEB-DL', 'H','x264-Dread-Team','BDrip', 'AAC-JiHeff', 'webrip', '1080p', 'UHD', 'bdrip', '720p', 'x264', 'x265', 'BluRay', 'XviD-EXTREME', 'HDLight', 'AC3-EXTREME', 'AC3-XSHD', 'mHD'];

class Movie {
    constructor(title, year){
        this.title = title;
        year =! undefined ? this.year = year : "N/A";
    }

    click(){
        console.log("clicked", this.title);
    }

    fetchData(){
        
    }

    fromFilename(filename){
        let title = "";
        let year, data;
        if(filename.split('.').length > filename.split('_').length){
            data = filename.split('.');
        } else {
            data = filename.split('_');
        }
        for(let i = 0; i < data.length ; i++){
            if(data[i].match('^[0-9]{4}$') && data[i] != "1917"){
                year = data[i];
                continue;
            }

            if(data[i].toLocaleLowerCase().includes("hd") || data[i].toLocaleLowerCase().includes("ac3") || data[i].toLocaleLowerCase().includes("torrent") || data[i].toLocaleLowerCase().includes("264")) continue;
    
            if(languages.includes(data[i]) || quality.includes(data[i])){
                continue;
            }
    
            title += data[i] + " ";
        }
        return new Movie(title, year);
    }
}

module.exports = {
    Movie: Movie
}