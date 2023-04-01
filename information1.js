
// enables additional environmental variables from the .env file
require( "dotenv" ).config();
// for writing to files
const fs = require( "fs" );

// fetching information about all committee report from all available
// congresses except the most current one, 104 to 118, exclusive on final
async function foo() {
    let compiled_list = [];
    for( let i = 104; i < 118; i++ ) {
        console.log( `Making request for House Committee Reports for Congress ${ i }...` );
        let ticker = 0;
        let current_list = [];
        // to allow for requesting of all parts
        while( true ) {
            console.log( `> Receiving page ${ Math.floor( ticker / 250 ) + 1 } of results...` );
            // 'i' is a substitute for congress number
            // separate lines finish await calls
            let data = await fetch( `https://api.congress.gov/v3/committee-report/${ i }/hrpt?format=json&offset=${ ticker }&limit=250&api_key=${ process.env.USER_TOKEN }` );
            data = await data.text();
            data = JSON.parse( data );
            current_list = current_list.concat( data.reports.reverse() );
            console.log( `Received.` );
            // it's not necessary to loop and make more requests if there are
            // equal to or less than 250 items returned, or if all items have
            // been looped through
            if( data.pagination.count <= 250 || data.pagination.count <= ticker ) break;
            else ticker += 250;
        }
        compiled_list.push( current_list );
    }
    console.log( `Request complete, fetched ${ sublist_item_count( compiled_list ) } results from ${ compiled_list.length } Congresses.` );
    fs.writeFile( "simple_search_results.json", JSON.stringify( compiled_list ), "utf8", ( err ) => {} );
}

function sublist_item_count( list ) {
    let n = 0;
    for( let i = 0; i < list.length; i++ ) n += list[ i ].length;
    return n;
}

foo();
