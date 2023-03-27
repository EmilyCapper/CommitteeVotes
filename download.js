
require( "dotenv" ).config();

// fetching information about all committee report from all available congresses except the most current one, 104 to 118, exclusive on final
console.log( process.env );
async function foo() {
    for( let i = 104; i < 105; i++ ) {
        // while( true ) {
            let data = await Promise.resolve( ( await Promise.resolve(
                // 'i' is a substitute for congress number
                fetch( `https://api.congress.gov/v3/committee-report/${i}/hrpt?format=json&offset=0&limit=250&api_key=${process.env.USER_TOKEN}` )
            ) ).text() );
            console.log( data );
        // }
    }
}
























// let request_ = new Request("https://url.url");
// let options_ = {
//     method: "GET",
//     headers: {
//         "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)"
//     },
//     mode: "cors"
// };

// let data = await Promise.resolve( ( await Promise.resolve( fetch( request_, options_ ) ) ).text() );

foo();
