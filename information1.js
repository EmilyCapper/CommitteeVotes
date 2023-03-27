
// enables additional environmental variables from the .env file
require( "dotenv" ).config();

// fetching information about all committee report from all available
// congresses except the most current one, 104 to 118, exclusive on final
async function foo() {
    let compiled_list = [];
    for( let i = 104; i < 118; i++ ) {
        let ticker = 0;
        let current_list = [];
        // to allow for requesting of all parts
        while( true ) {
            // 'i' is a substitute for congress number
            // separate lines finish await calls
            let data = await fetch( `https://api.congress.gov/v3/committee-report/${i}/hrpt?format=json&offset=${ticker}&limit=250&api_key=${process.env.USER_TOKEN}` );
            data = await data.text();
            data = JSON.parse( data );
            current_list = current_list.concat( data.reports.reverse() );
            // it's not necessary to loop and make more requests if there are
            // equal to or less than 250 items returned, or if all items have
            // been looped through
            if( data.pagination.count <= 250 || data.pagination.count <= ticker ) break;
            else ticker += 250;
        }
        compiled_list.push( [ current_list ] );
    }
    console.log( compiled_list );
}

foo();
