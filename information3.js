
// enables additional environmental variables from the .env file
require( "dotenv" ).config();
// for writing to files
const fs = require( "fs" );

// extra utility function, no longer used

// async function rewrite() {
//     let detailed_search_results = await fs.readFileSync( "detailed_search_results.json", "utf8", ( err ) => {} );
//     detailed_search_results = JSON.parse( detailed_search_results );
//     for( let i = 0; i < detailed_search_results.length; i++ ) {
//         console.log( `Rewriting data for Congress ${ detailed_search_results[ i ][ 0 ].committeeReports[ 0 ].congress }` );
//         for( let j = 0; j < detailed_search_results[ i ].length; j++ ) {
//             detailed_search_results[ i ][ j ] = detailed_search_results[ i ][ j ].committeeReports[ 0 ];
//         }
//     }
//     fs.writeFile( "detailed_search_results.json", JSON.stringify( detailed_search_results ), "utf8", ( err ) => {} );
// }

// rewrite();

async function foo() {

}

foo();

