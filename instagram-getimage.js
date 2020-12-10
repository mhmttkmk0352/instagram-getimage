const fs = require("fs");
const request = require("request");

const imageToBase64 = require('image-to-base64');

const resim_yolu = "";



let output = {
    resimKaydet: async function( resim_url, ad ) {
        let pr = new  Promise((resolve, reject) => {
            (async() => {
               imageToBase64(resim_url) // Image URL
               .then(
                   (response) => {
                       fs.writeFileSync(resim_yolu + ad, Buffer.from(response, 'base64'), 'binary' );
                       resolve( ad ); // "iVBORw0KGgoAAAANSwCAIA..."
                   }
               )
               .catch(
                   (error) => {
                       resolve("");
                   }
               )
            })()
        });
        return pr;
    },
    get: async function(){
            let pr = new  Promise((resolve, reject) => {
                (async() => {
                 

                    request("https://www.instagram.com/misshaturkiye", (error,response, html) => {
                        if ( !error && response.statusCode == 200 ){
                            let p = new RegExp("window._sharedData = (.*);</script>");
                            let f = p.exec( html );

                            if ( f && f[1] && JSON.parse( f[1] ) && JSON.parse( f[1] ).entry_data && JSON.parse( f[1] ).entry_data.ProfilePage && JSON.parse( f[1] ).entry_data.ProfilePage[0] ){
                                let dizi = JSON.parse( f[1] ).entry_data.ProfilePage[0]["graphql"].user.edge_owner_to_timeline_media.edges;
                                dizi = dizi.reverse();

                                console.log( dizi );
                                for ( item in dizi ) {
                                    let node = dizi[item].node;
                                    this.resimKaydet( node.display_url, node.id+".png" ).then(url => {


                                        console.log( {url} );
                                    });
                                }
                            }
   
                        }
                    });

                 
    
                    resolve(1);                    
                })()
    
            });    
            
            return pr;            
   
    }
}



                            

let start = async() =>{



        let set = {
            tip:0,//tip 0 instagram, tip 1 youtube, vb.
            fotograf: (await output.resimKaydet( "" ) ),//.split("+").join("").split("/").join(""),
            icerik:"test",
            yayin_zamani:"2131",
            video:""
        };
        console.log( set );


           let db = await mongoObj.connect();
            let collection = db.collection("SosyalMedya");
            collection.updateOne(
                {id:5},
                {$set:set},
                {upsert:true}
            );

}



output.get().then();


/*
output.resimKaydet( "https://instagram.fesb3-2.fna.fbcdn.net/v/t51.2885-15/e35/129720876_369575724341743_6092790822024109032_n.jpg?_nc_ht=instagram.fesb3-2.fna.fbcdn.net&_nc_cat=107&_nc_ohc=VfjgT1TzOJ4AX-zT6ZD&tp=1&oh=be1e6905c8339ef2dac092c5ed45f56c&oe=5FD1E42A", "302.png" )
.then(r=>{
    console.log( {r} );
});
*/

//start().then();



/*

setInterval(() => {
    output.get().then();
}, config.bots.instagram.instagram_paylasim_izleyici.sorgu_suresi);
*/
//output.get().then();
//output.resimKaydet( "https://instagram.fist7-2.fna.fbcdn.net/v/t51.2885-15/e35/127283741_207828804122157_7293024034193479923_n.jpg?_nc_ht=instagram.fist7-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=IXZNY1rfNrYAX_KvkOS&tp=1&oh=41dbfbb1d80e52ecaaa02bc3fddc1f17&oe=5FC2F7F1", "xx" ).then();

/*





output.get().then();
setInterval(() => {
    output.get().then();
}, config.bots.instagram.instagram_paylasim_izleyici.sorgu_suresi);


*/



/*

Youtube API:
AIzaSyA1RL7Bzi3pIWn2cTud0_6sNGl5aobZVKE

*/