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



                            



output.get().then();


